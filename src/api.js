const request = require('request-promise-native');
const moment = require('moment');


const authHeader = (auth) => 
  `Basic ${new Buffer(auth.user + ':' + auth.pwd).toString('base64')}`



const fetchNode = async (auth, nodeId) => {
  const options = {
    method: 'GET',
    url: `https://dealers.giant-bicycles.net/_layouts/ep/handler/AxHandler.ashx`,
    headers: {
      'Authorization' : authHeader(auth),
    },
    qs: {
      classname: 'EPProductGroupMenuHandler',
      method: 'wsGetSubNodes',
      parentnodeid: nodeId,
      level: 4,
      _: moment.valueOf(),
    },
  }
  const res = await request(options);

  return JSON.parse(res).subnodes;

}

module.exports = { fetchNode }; 