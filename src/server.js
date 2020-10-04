const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// controllers
const routesProxy = require('./routes/proxy');

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// routes
app.use('/proxy', routesProxy);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});