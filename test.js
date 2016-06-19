const app = require('express')();

const bodyParser = function(req, res, next) {
    let body ='';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        req.body = body ? JSON.parse(body) : null;
        next();
    });
};

function checkAuth(req, res, next) {
    if (req.query.token && req.query.token === 'sekrit') {
        next();
    }
    else {
        res.status(401).send('Not Authorized');
    }
}

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

app.get('/', checkAuth, (req, res) => {
    res.send('hello world');
});

app.get('/open', (req, res) => {
    res.send('hello world');
});


app.post('/echo', checkAuth, bodyParser, (req, res, next) => {
   res.send(req.body);
});

const port = 8082;
app.listen(port, () => console.log('running on port', port));