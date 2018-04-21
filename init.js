const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');

const getOrdersList = require('./orderListGetController');

const server = http.createServer(function(req, res) {
    const router = initRouter();
    router(req, res, finalhandler(req, res));
});

server.listen(8080);



const initRouter = () => {
    const router = Router();
    router.get('/orders',getOrdersList);
    return router;

};