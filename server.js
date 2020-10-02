const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./server/routes/api');
const port = 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'dist/shopping-cart')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname , 'dist/shopping-cart/index.html'));
});
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.disable('etag');
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "GET,POST,DEL,HEAD,OPTIONS,PUT,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});
app.listen(port, () => {
  console.log("server running on port " + port)
})
