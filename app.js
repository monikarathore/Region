var filename = __filename;
var dirname = __dirname;
var express = require('express');
var app = express();
app.use(express.static('/src'));
var liveServer = require("live-server");
//console.log( __dirname );


var params = {
    port: 3001, // Set the server port. Defaults to 8080.
    host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "src", // Set root directory that's being server. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    //ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    //file: "", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 10, // Waits for all changes, before reloading. Defaults to 0 sec.
    //mount: [['index.html', 'dist']], // Mount a directory to a route.
    logLevel: 0 // 0 = errors only, 1 = some, 2 = lots
};
liveServer.start(params);

// app.listen(3000, function(params) {
//     console.log('node app running', 'http://localhost:3000');
// })

app.get('/', function(req, res) {
    console.log('route');
    res.status(200).send(filename);
})