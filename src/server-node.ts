import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Get the correct dist path
const distPath = join(__dirname, "../dist/client");
const indexPath = join(distPath, "index.html");

// Serve static files with cache busting for assets
app.use(
  express.static(distPath, {
    maxAge: "1y",
    etag: false,
    // Serve hashed files with long cache
    setHeaders: (res, path) => {
      if (path.match(/\.[a-f0-9]{8}\.(js|css)$/)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

// SPA fallback - serve index.html for all non-file routes
app.get("*", (req, res) => {
  if (!req.path.includes(".")) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not Found");
  }
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

