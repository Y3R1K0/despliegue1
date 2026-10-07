require('dotenv').config()

const http = require('http')
const fs = require('fs')
const path = require('path')

function requestController(req, res) {
    let filePath

    if (req.url === '/style.css') {
        filePath = path.join(__dirname, 'public', 'style.css')
        res.writeHead(200, { 'Content-Type': 'text/css' })
    } else {
        filePath = path.join(__dirname, 'public', 'index.html')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500)
            res.end('Error interno del servidor')
            return
        }

        res.end(content)
    })
}

const server = http.createServer(requestController)

const PORT = process.env.PORT || 4000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Aplicacion corriendo en: ${PORT}`)
})