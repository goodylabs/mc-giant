
const _ = require('lodash');
const numeral = require('numeral');

const api = require('./api');

numeral.register('locale', 'pl', {
  delimiters: {
      thousands: '.',
      decimal: ','
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  ordinal : function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
      symbol: 'PLN'
  }
});
numeral.locale('pl');

const formatResult = (result, debug = false) => {
  
  const res = _.pick(result, "id", "name", "price");
  res.available = !!(result.itmStock || "").match(/class=\"avail\"/);
  res.retailPrice = numeral(result.itmPrice).value();
  if (debug) {
    res.debug = result;
  }
  return res;
}
const getAvailability = async (ctx, next) => {
;
  const category = await api.fetchNode(ctx.auth, ctx.productMeta.parentid);
  const result = _.find(category, ({id}) => id === ctx.params.sku);
  ctx.body = {result : "ok", meta: ctx.productMeta, result: formatResult(result, ctx.query.debug)};
  await next();
};

module.exports = { getAvailability };