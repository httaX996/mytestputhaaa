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
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Referer": "http://103.175.73.12:8080/",
        },
      });

      // Forward headers
      res.set("Content-Type", response.headers["content-type"]);
      res.set("Access-Control-Allow-Origin", "*");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("Proxy error:", error.message);
      res.status(500).send("Proxy error: " + error.message);
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
