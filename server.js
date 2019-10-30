const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//the three amigos
function dateLogger(req,res,next){
  console.log(new Date().toISOString());
  next();

}

function requestURL(req, res, next) {
  console.log(req.originalURL);
  console.log(req.baseURL);
  console.log(req.path);
  next();
}
server.use(helmet()); //middleware
server.use(express.json()); //built-in
server.use(dateLogger); //custom middleware
server.use(requestURL);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
