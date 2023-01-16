// Requests and responses to handled by local server
const fs = require('fs');
 
const  requestHandlers = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.setHeader('Content-Type', text/html)
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/users'){
        res.write('<html>');
        res.write('<head><title>User List</title></head>');
        res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li><ul></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const username = parsedBody.split('=')[1];
            console.log(username);
            res.statusCode = 302  // code for redirection
            res.setHeader('Location', '/users');
            return res.end();  
        }); 
    }
    
    res.write('<html>');
    res.write('<head><title>My Page</title></head>');
    res.write('<body><h1>Welcome to my webpage</h1></body>');
    res.write('</html>');
    return res.end();
};

exports.handler = requestHandlers;

