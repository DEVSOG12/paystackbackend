require('dotenv').config();
const cors =require('cors');
const bodyParser = require('body-parser');
const pay = require('paystack-api');
var app = require('express')();
var crypto = require('crypto');
var secret = process.env.SECRET_KEY ??'';
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  app.post('/', (req, res) => {
    // res.send({"Hi": "Yo"})
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {

    console.log(req.body);
    }
  })
  app.get('/', (req, res) => {
    res.send({"Hi": "Yo"})
  })
  const serverp = app.listen(process.env.PORT || 8080, () => {
    console.log("listening on port %s...", serverp.address());
  });

  