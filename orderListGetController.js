const {getOrders,countNextLink,countPrevLink} = require('./storage');

const BASE = 'http://localhost:8080/orders';

const getOrderList = (req, res) => {
    const {originalUrl} = req;
    const url = originalUrl.split('?');
    const links = [
        {ref: 'base', href: BASE},
        {ref: 'self', href: `http://localhost:8080${originalUrl}`}
    ];
    if (url.length == 1) { // no params provide whole list
        const orders = getOrders();
        const result = {

            results:orders,
            size: orders.length,
            _links: links

        };
        res.setHeader('Content-type', 'application/json');
        res.statusCode =200;
       return res.end(JSON.stringify(result));

    } else {
        const queryParams = url[1].split('&').map((el) => {
            const parts = el.split('=');
            const pair = {};
            pair[parts[0]] = parts[1];
            return pair;
        }).reduce((acc, el) => Object.assign(acc, el), {});
        const {limit,offset} = queryParams;
        const limitFinal = limit && parseInt(limit) || -1;
        const offsetFinal = offset && parseInt(offset) || 0;
        if((limitFinal < -1) || (limitFinal == 0) || offsetFinal < 0){
            res.setHeader('Content-type', 'application/json');
            res.statusCode =400;
            return res.end(JSON.stringify({error: 'bad_request',message: 'Invalid query parameters value'}));
        }
        const pickedOrders = getOrders(limitFinal, offsetFinal);
        if(pickedOrders.length == 0){
            res.setHeader('Content-type', 'application/json');
            res.statusCode =400;
            return res.end(JSON.stringify({error: 'bad_request',message: 'Query out of bounds'}));
        }
        const response = {
            results: pickedOrders,
            size: pickedOrders.length
        };
        if(limit){
          response['limit'] = limitFinal;
        }
        if(offset){
            response['offset'] = offsetFinal;
        }
        const nextLink = countNextLink(limitFinal,offsetFinal);
        const prevLink = countPrevLink(limitFinal,offsetFinal);
        if(nextLink){
            links.push({ref:'next', href:nextLink});
        }
        if(prevLink){
            links.push({ref:'prev',href:prevLink})
        }
        response['_links'] = links;
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 200;
        return res.end(JSON.stringify(response));
    }

};
module.exports = getOrderList;