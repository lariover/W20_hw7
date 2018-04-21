const orders = [
    {id: 0, name: "order1", items: []},
    {id: 1, name: "order2", items: ['item1']},
    {id: 2, name: "order3", items: []},
    {id: 3, name: "order4", items: ['item1','item2']},
    {id: 4, name: "order5", items: []},
    {id: 5, name: "order6", items: []},
    {id: 6, name: "order7", items: []},
    {id: 7, name: "order8", items: []},
    {id: 8, name: "order9", items: []},
    {id: 9, name: "order10", items: []},
    {id: 10, name: "order11", items: []},
    {id: 11, name: "order12", items: []},
    {id: 12, name: "order13", items: ['nokia']},
    {id: 13, name: "order14", items: []},
    {id: 14, name: "order15", items: []},
    {id: 15, name: "order16", items: ['samsung']},
    {id: 16, name: "order17", items: []},
    {id: 17, name: "order18", items: []},
    {id: 18, name: "order19", items: ['someitems']},
    {id: 19, name: "order20", items: []},
    {id: 20, name: "order21", items: ['items']},
    {id: 21, name: "order22", items: []},
    {id: 22, name: "order23", items: []},
    {id: 23, name: "order24", items: ['vodafon']},
    {id: 24, name: "order25", items: []},

];

/**
 * The function returns the orders based on the limit and start options.
 * I limit is set to -1 -> then there was no limit supplied and the whole list is returned
 * @param limit
 * @param start
 * @returns {*[]}
 */
const getOrders = (limit = -1, start = 0) => {
    if(limit == -1){
        return orders.slice(start);
    }else{
        const end = ((start + limit) > orders.length)? orders.length : (start + limit);
        return orders.slice(start,end)
    }


};

const countNextLink = (limit = -1,offset = 0) => {
    if(limit == -1){ //we already gave whole list , no next available
        return ;
    }
    const nextOfset = offset + limit;
    if(nextOfset > (orders.length -1)){
        return; // next offset is out of bonds
    }
    return `http://localhost:8080/orders?limit=${limit}&offset=${nextOfset}`;
};
const countPrevLink = (limit = -1,offset = 0)=> {
    if(offset == 0){
        return; //no previous records were even available
    }
    let prevOffset = 0;
    let finalLimit = 0;
    if(limit > 0) {
        prevOffset = (offset - limit) >= 0? offset - limit : 0;
        finalLimit = (offset - limit) >= 0? limit : offset;
    }else{//in case we have all items untill the end as previous we give all items before
        prevOffset = 0;
        finalLimit = offset;
    }
    return `http://localhost:8080/orders?limit=${finalLimit}&offset=${prevOffset}`
};


module.exports = {getOrders, countNextLink,countPrevLink};