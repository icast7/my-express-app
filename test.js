const app = require('express')();

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

app.get((req, res, next) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        req.body = body ? JSON.parse(body) : null;
        next();
    })
});

// app.use((req, res, next) => {
// 	if (req.method === 'GET' && req.url === '/') {
// 		res.send('hello world');
// 	} else {
// 		next();
//     }
// });
//
// app.use((req, res, next) => {
// 	res.send('finally something other than GET /')
// });

const port = 8082;
app.listen(port, () => console.log('running on port', port));