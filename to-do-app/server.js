const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3030;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(ROOT, urlPath);
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found: ' + urlPath);
            return;
        }
        res.writeHead(200, {
            'Content-Type': mime,
            'Cache-Control': 'no-cache',
        });
        res.end(data);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log('TaskFlow rodando em: http://localhost:' + PORT);
    console.log('Pressione Ctrl+C para parar.');
});
