// require your server and launch it
const server = require("./api/server");

server.listen(1234, () => {
  console.log(`\n * Server is Running on http://localhost:1234 *\n`);
});
