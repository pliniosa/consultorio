const express = require('express'); // Controle de rotas
const bodyParser = require('body-parser'); // para poder receber parametros JSON
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var porta = process.env.PORT || 8080;

/*Liberando problema com o cors*/
app.use(cors())
 /*
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
*/
require('./app/controler/index')(app);


app.listen(porta);