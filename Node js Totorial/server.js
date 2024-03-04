const http = require('http');
//const path = require('path');
const url = require('url')
const fs = require('fs')
const { default: slugify } = require('slugify');

const dataObj = fs.readFileSync(`${__dirname}/model/data.json`,'utf-8')
const data = JSON.parse(dataObj)
console.log(data)

const server = http.createServer((req,res) => {
    const pathName = req.url;
    if(pathName === '/'){
        res.end('home page')
    }else if(pathName=== '/about'){
        res.end('about page')
    }else if(pathName === '/api'){
        console.log('api')
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(dataObj)
    }else{
        res.writeHead(400,{'Content-type':'text/html'})
        res.end('<h1>Page Not Found</h1>')
    }
})
server.listen(8000,() => {
    console.log('server started')
})