const getOHLCV = require('../indicators/ohlcv.js')
const detachSource = require('../indicators/source.js')
const indicators = require('technicalindicators')
const get = require('./C_token')
const { Send_Telegram } = require('../alerts/telegram/index.js')
 


const data = async (ticker) => {
    let ex = 'binance';
    let interval = '5m';
    let isFuture = true;
    try {
        let ohlcv = await getOHLCV(ex, ticker, interval, isFuture)
        let g = ohlcv[ohlcv.length - 1]; let sn = g[4]; console.log(ticker + " sn : " + sn);
        return sn
    } catch (err) {
        throw err
    }
}
const stochasticrsi = async (
    k,
    d,
    rsiLength,
    stochasticrsiLength,
    sourceType,
    ex,
    ticker,
    interval,
    isFuture = false
) => {
    try {
        let ohlcv = await getOHLCV(ex, ticker, interval, isFuture)
        let source = detachSource(ohlcv)
        let stochasticrsiInput = {
            values: source[sourceType],
            kPeriod: k,
            dPeriod: d,
            stochasticPeriod: stochasticrsiLength,
            rsiPeriod: rsiLength,
        }
        return await indicators.StochasticRSI.calculate(stochasticrsiInput)
    } catch (err) {
        console.error("Ticker not supported: ", ticker);
    }
}

/** 
*                    @Testler @Bitmeden @Kar @Kontrolu @Yapma
*/

let dizi = [];
const StochRsi_Bot = async (symbol) => {
    dizi = await stochasticrsi(3, 3, 14, 14, 'close', 'binance', symbol, '5m', false)
    let k = dizi.map((data) => data.k);
    let d = dizi.map((data) => data.d);

    let k_Count_1 = k[k.length - 1];
    let d_Count_1 = d[d.length - 1];
    /*     console.log("K : " + k_Count_1 + " D : " + d_Count_1 + " Count : " + (k_Count_1 + d_Count_1) / 2 + " Symbol : " + symbol); */
    isBuy(k_Count_1, d_Count_1, symbol);
    isSell(k_Count_1, d_Count_1, symbol);
   


}

const controler = (s) => {
    try {
        let key = Object.keys(get).find(k => k === s);
        if (key) {
            let time = get[key].tp;
            let currentTime = new Date();
            let diff = currentTime - time;
            if (diff >= 480000) { 
                return true;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}


const New_Date = async (s, index = 0) => {
    try {
        if (index === Object.keys(get).length) {
            return false;
        }
        let key = Object.keys(get)[index];
        if (key === s) {
            get[key].tp = new Date();
            return true
        } 
        return await New_Date(s, index + 1);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const serv = async (a, s) => {
    try {
        let b = await data(s);
        if (a === "buy") {
            const d = b + (b * 0.002); d_tf = d.toFixed(9);
            const c = b - (b * 0.007); c_tf = c.toFixed(9);
            Send_Telegram(`<-----> 🟩BUY ${s} 🟩 <----->     
        \nTAKE PROFIT : ${d_tf} 
        \nSTOP LOSS   : ${c_tf}
        `)
            return true
        }
        if (a === "sell") {
            const d = b - (b * 0.002); let d_tf = d.toFixed(9);
            const c = b + (b * 0.007); let c_tf = c.toFixed(9);

            Send_Telegram(`<-----> 🟥SELL ${s} 🟥 <----->
        \nTAKE PROFIT : ${d_tf} .
        \nSTOP LOSS   : ${c_tf}
        `)
            return true
        }
        return false
    } catch (error) {

    }
}

const isBuy = async (k, d, s) => {
    let snc = await controler(s);
    /* let rsid = await rsi(s); */
    try {
        if (20 >= (k + d) / 2) {
            if (8 <= (k + d) / 2) {
                if (d < k) {
                    if (k > d * 1.05) {
                        if (snc === true) {

                            return /* console.log('\u001b[' + 32 + 'm' + "Buy Date : " + new Date() + '\u001b[0m' + " : " + s + " K : " + k + " D : " + d + "Count : " + (k + d) / 2), */  serv(a = "buy", s),  New_Date(s);

                        }
                    }
                }
            }
        }
    } catch (error) {
        return error
    }
}


const isSell = async (k, d, s) => {
    let snc = await controler(s);
    /* let rsid = await rsi(s); */
    try {
        if (80 <= (k + d) / 2) {
            if (94 >= (k + d) / 2) {
                if (k < d) {
                    if (k < d * 0.95) {
                        if (snc === true) {
                            return /* console.log('\u001b[' + 31 + 'm' + "Sell Date : " + new Date() + '\u001b[0m' + " : " + s + " K : " + k + " D : " + d + "Count : " + (k + d) / 2), */   serv(a = "sell", s),   New_Date(s);
                        }
                    }
                }
            }
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    StochRsi_Bot,
}
