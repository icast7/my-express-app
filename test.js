const app = require('express')();

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

app.use((req, res, next) => {
    console.log(req.param('test'));
    var query = req.param('test');
    var body = '';
    req.on('req.query', chunk => {
        query += chunk;
    });
    req.on('end', () => {
        req.body = query ? JSON.parse(query) : null;
        next();
    })
});

// app.get('/', ()) {
//
// }


const port = 8082;
app.listen(port, () => console.log('running on port', port));