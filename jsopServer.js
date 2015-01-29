var http = require('http');
var url = require('url');
var count = 0;

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'application/x-javascript' });

    if (count / 2 > parseInt(count / 2)) {

        setTimeout(function () {

            res.end('Hello other\n');
            count += 1;

        }, 1000);

    } else {
        res.end('Hello World\n');
        count += 1;
    }
     
    

}).listen(8777, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8777/');