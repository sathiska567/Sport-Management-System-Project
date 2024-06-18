const app = require("./index");
const http = require("http");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000; // Define a default port if PORT is not set in .env

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
