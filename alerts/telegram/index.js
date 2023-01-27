const { default: axios } = require("axios");

/* const { Telegraf } = require("telegraf")
const BOT_TOKEN = '5834691392:AAFuuhQTdsBrd5hECo8hLaflhdlX8dJt4xQ'
const bot = new Telegraf(BOT_TOKEN);
let Chat_api = '#-827728456';
let Chat_api_2 = 'https://t.me/c/1865550586';

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('👍'));

const Send_Telegram = (d) => {
    bot.on('message', async (ctx) => {
        // Explicit usage
        await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello  friends Welocome MY PAge`);
       await ctx.telegram.sendMessage(ctx.message.chat.id, d);
    });
};Send_Telegram("merhaba dunya")

bot.launch();
 */


let apiToken = "5834691392:AAFuuhQTdsBrd5hECo8hLaflhdlX8dJt4xQ";
let oldchatId = "1459509523";
let chatId = "@binancecurrencys";
let text = "BOT is Working!";



// Do what you want with response
const Send_Telegram = (d) => {
    const axios = require('axios');
    axios.get(`https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${d}`).then(response => { console.log(response.data); }).catch(error => { console.log(error); });
}; 


module.exports = {
    Send_Telegram,
}