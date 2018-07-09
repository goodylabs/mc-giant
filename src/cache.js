const cache = require('memory-cache');
const conf = require('../conf/conf');
const api = require('./api');

const init =  async() => {
  const { rootNodes } = conf;
  await Promise.all(rootNodes.map(async ({nodeId, depth}) => (await initializeNode(nodeId, 0, depth))));
  console.log('Cache is: ', toString());
}

const initializeNode =  async (nodeId, depth, maxDepth, parent) => {
  console.log(`initializing subnodes for:  ${parent}/${nodeId}`);
  try {
    const subnodes = await api.fetchNode({user: process.env.GIANT_USER, pwd: process.env.GIANT_PWD}, nodeId);
    await Promise.all(subnodes.map(async ({id, name, parentid,}) => {
      cache.put(id, {id, name, parentid});
      if (depth + 1 < maxDepth) {
        await initializeNode(id, depth + 1, maxDepth, parentid);
      }
    }));
  } catch (e) {
    console.log('Error initializing: ', e.message);
  }
}

const getMeta = (sku) => {
  return cache.get(sku);
}

const toString = () => cache.exportJson();

module.exports = { init, getMeta };