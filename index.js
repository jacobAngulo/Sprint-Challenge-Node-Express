// play this: https://www.youtube.com/watch?v=d-diB65scQU
require("dotenv").config;

const server = require("./server");
// code away!
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
