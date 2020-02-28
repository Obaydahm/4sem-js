/*
3) Simple WEB/REST-server using functionality from 1+2
Create a new file nodeServer.js and add the following code to the file.
Start the server, and verify that you can access the root page via localhost:3000
*/
const deviceInfo = require('../ex1/ex1');
const DosDetectorClass = require("../ex2/dosDetector");
const DosDetector = new DosDetectorClass.DosDectector(2000)
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/api/os-info') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(deviceInfo.deviceInfo()));
    return res.end();
  }
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h2>Simple node HTTP server demo</h2>
      <p>Exposes this endpoint <code>/api/os-info</code></p>
    `);
    return res.end();
  }
});
server.on('connection', (sock) => {
  // You can get the client-IP in here, using sock.remoteAddress)
  console.log(sock.remoteAddress)
  DosDetector.addUrl(sock.remoteAddress)
});
server.listen(3000);
console.log('listening on 3000');
DosDetector.on("DosDetected", arg => {
  console.log("Dos attack detected:", arg)
})
