 const axios = require('axios');

const getOHLCV = async (ticker, interval) => {
  try {
    const response = await axios.get(`https://api.binance.com/api/v1/klines?interval=${interval}&symbol=${ticker}`);
    
    return response.data/* ,console.log(response.data) */;
  } catch (err) {
    throw 'Error fetching OHLCV data';
  }
}

//console.log(getOHLCV("binance", "BTC/USDT", "15m", true))
module.exports = getOHLCV
