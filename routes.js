const { Router } = require('express');
const Asterisk =  require('./src/asterisk');

const routes = Router();

routes.get('/', (req, res) => {
  console.log(req.body);
  return res.json( {message: 'Api para Ler Dados Asterisk 13. Chame o metodo GET /call'} );
});

// routes.get('/ami', Nami.namiA);
routes.get('/calls', Asterisk.calls);


module.exports = routes;
