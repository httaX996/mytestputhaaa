import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Viewer tracking
  const channelViewers: Record<string, number> = {};

  io.on("connection", (socket) => {
    let currentChannel: string | null = null;

    socket.on("join-channel", (channelId: string) => {
      // Leave previous channel if any
      if (currentChannel) {
        channelViewers[currentChannel] = Math.max(0, (channelViewers[currentChannel] || 1) - 1);
        io.to(currentChannel).emit("viewer-count", channelViewers[currentChannel]);
        socket.leave(currentChannel);
      }

      currentChannel = channelId;
      socket.join(channelId);
      
      channelViewers[channelId] = (channelViewers[channelId] || 0) + 1;
      io.to(channelId).emit("viewer-count", channelViewers[channelId]);
    });

    socket.on("disconnect", () => {
      if (currentChannel) {
        channelViewers[currentChannel] = Math.max(0, (channelViewers[currentChannel] || 1) - 1);
        io.to(currentChannel).emit("viewer-count", channelViewers[currentChannel]);
      }
    });
  });

  // Proxy route to handle Mixed Content (HTTP on HTTPS)
  app.get("/proxy/*", async (req, res) => {
    try {
      const targetUrl = req.params[0];
      if (!targetUrl) return res.status(400).send("No URL provided");

      // Reconstruct the full URL (it might have query params)
      const fullUrl = targetUrl + (req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "");
      
      // Ensure it starts with http
      const finalUrl = fullUrl.startsWith("http") ? fullUrl : `http://${fullUrl}`;

      const response = await axios({
        method: "get",
        url: finalUrl,
        responseType: "stream",
        timeout: 10000,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Origin": "http://103.175.73.12:8080",
          "Referer": "http://103.175.73.12:8080/",
          "Icy-MetaData": "1"
        },
        validateStatus: () => true, // Don't throw on 4xx/5xx
      });

      // Forward headers
      const contentType = response.headers["content-type"];
      if (contentType) res.set("Content-Type", contentType);
      
      // Force content type for m3u8 if missing or generic
      if (finalUrl.includes(".m3u8") && (!contentType || contentType.includes("text/plain") || contentType.includes("application/octet-stream"))) {
        res.set("Content-Type", "application/vnd.apple.mpegurl");
      }

      res.set("Access-Control-Allow-Origin", "*");
      res.set("Cache-Control", "no-cache");
      
      if (finalUrl.includes(".m3u8")) {
        let content = "";
        response.data.on("data", (chunk: any) => {
          content += chunk.toString();
        });
        response.data.on("end", () => {
          // Rewrite absolute URLs to go through our proxy
          // This handles cases where the m3u8 points to other domains
          const baseUrl = finalUrl.substring(0, finalUrl.lastIndexOf("/") + 1);
          
          let rewrittenContent = content.replace(/^(https?:\/\/[^\s]+)$/gm, (match) => {
            return `/proxy/${match.replace(/^https?:\/\//, "")}`;
          });

          // Also handle relative paths if they don't start with /
          // (Though browsers usually handle these relative to the m3u8 URL, 
          // but since we are at /proxy/..., they might get confused)
          // Actually, if we leave relative paths alone, the browser will fetch them relative to /proxy/domain/path/
          // which is exactly what we want.

          res.send(rewrittenContent);
        });
      } else {
        response.data.pipe(res);
      }

      response.data.on("error", (err: any) => {
        console.error("Stream pipe error:", err.message);
        if (!res.headersSent) res.status(500).send("Stream error");
      });

    } catch (error: any) {
      console.error("Proxy error:", error.message);
      if (!res.headersSent) res.status(500).send("Proxy error: " + error.message);
    }
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
