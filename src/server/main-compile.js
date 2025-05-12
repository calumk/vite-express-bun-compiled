// THIS ONLY WORKS FOR COMPILED PROJECTS,
// First: 
// 1. Compile the project using bun run build
// 2. Once built, run : bunx make-vfs --dir ./dist --content-format string --outfile ./src/client-bundle-vfs.js

// First we need to 
import staticRoutes from "../../bundle/client-bundle-vfs.js";


import { lookup } from "es-mime-types"
import express from "express";
// import ViteExpress from "vite-express";
import routes from "./routes.js";




const app = express();
// Use the routes from the routes.js file
app.use(routes);
// Serve the static files from the staticRoutes
app.use((req, res, next) => {
  // Check if the request is for a static file
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  // If the request is for a static file, serve it
  // Normalize the path by removing trailing slashes
  // remove the leading slash
  const normalizedPath = path.replace(/^\//, "").replace(/\/$/, "");
  console.log("Request for static file:", path);

  // log true/false if the path exists in staticRoutes
  console.log("Path exists in staticRoutes:", staticRoutes[normalizedPath] !== undefined);

  if (staticRoutes[normalizedPath]) {
    // Serve the static file using Bun.file
    let mimeType = lookup(normalizedPath);
    let decodedFile = Buffer.from(staticRoutes[normalizedPath], 'base64')
    console.log("returning file", normalizedPath, "with mime type", mimeType);
    return res.status(200).type(mimeType).send(decodedFile);
  }
  next();
});

// Fallback to assist vue-router
app.use((req, res) => {

  let index = staticRoutes["index.html"];
  // this is base64 encoded, so we need to decode it
  let decodedIndex = Buffer.from(index, 'base64')
  return res.status(200).type("text/html").send(decodedIndex);
});
  

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
