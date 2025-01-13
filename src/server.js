const http = require("http");
const { connectDB } = require("./config");
const router = require("./router");

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  // Handle the GET request for the root route
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("API is running");
  }

  // Parse the request body for POST, PUT, PATCH requests
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }

      // Call the router for further handling
      router(req, res);
    });
  } else {
    // Call the router directly for GET, DELETE requests
    router(req, res);
  }
});

// Start the server and connect to the database
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
  connectDB();
});
