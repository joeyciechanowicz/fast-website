const express = require('express');
const app = express();

// app.use(function (req, res, next) {
// 	console.log(`${req.method} ${req.path}`);
// 	next();
// });

app.use('/', express.static('dist'));
app.use('/styles', express.static('styles'));

app.listen(3000, () => console.log('Listening to 30000'));