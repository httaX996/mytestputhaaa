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
      
      let urlObj;
      try {
        urlObj = new URL(finalUrl);
      } catch (e) {
        return res.status(400).send("Invalid URL");
      }

      const domain = urlObj.host;
      const origin = `${urlObj.protocol}//${domain}`;

      const response = await axios({
        method: "get",
        url: finalUrl,
        responseType: "stream",
        timeout: 20000,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
          "Icy-MetaData": "1"
        },
        validateStatus: () => true,
      });

      if (response.status >= 400) {
        console.error(`Proxy Error: ${response.status} for ${finalUrl}`);
        // If 404, maybe the URL is slightly different or needs a different protocol
        res.status(response.status).send(`Source returned ${response.status}`);
        return;
      }

      // Forward headers
      const contentType = response.headers["content-type"];
      if (contentType) res.set("Content-Type", contentType);
      
      if (finalUrl.includes(".m3u8") && (!contentType || !contentType.includes("mpegurl"))) {
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
          // Comprehensive rewriting for m3u8
          // 1. Absolute URLs
          let rewritten = content.replace(/(https?:\/\/[^\s"']+)/g, (match) => {
            return `/proxy/${match.replace(/^https?:\/\//, "")}`;
          });

          // 2. Absolute paths (starting with /)
          // We need to be careful not to match // or tags
          rewritten = rewritten.split("\n").map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
              return `/proxy/${domain}${trimmed}`;
            }
            return line;
          }).join("\n");

          res.send(rewritten);
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
