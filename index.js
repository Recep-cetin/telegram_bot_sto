module.exports = {
  ...require('./alerts/index.js'),
}


const Binance = require('node-binance-api');
const { StochRsi_Bot } = require('./strategies/stochRsi.js');

var sayac = [
  'GALAUSDT', 'BTCUSDT',
  'ATOMUSDT', 'ETHUSDT',
  'WAVESUSDT', 'PEOPLEUSDT',
  'ARPAUSDT', 'LTCUSDT',
  'KAVAUSDT', 'APEUSDT',
  'SOLUSDT', 'XRPUSDT',
  'ADAUSDT', 'DOGEUSDT',
]
let index = 0;
setInterval(() => {
  if (index === sayac.length) { index = 0; }
  StochRsi_Bot(sayac[index])
  /* StochRsi_Bot('BTCUSDT'); */
  index++;
}, 15000);

module.exports = {
  sayac,
}
 
