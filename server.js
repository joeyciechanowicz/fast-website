const express = require('express');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');

const app = express();


app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.use('/', expressStaticGzip(path.join(__dirname, 'dist'), {
	enableBrotli: true,
	orderPreference: ['br']
}));


app.use('/', express.static('dist'));
app.use('/styles', express.static('styles'));


app.listen(3000, () => console.log('Listening to 30000'));