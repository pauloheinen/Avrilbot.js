const { Client, Intents, ThreadChannel} = require('discord.js');
const bot = new Client();
const Token = 'ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw';
const ytdl = require('ytdl-core');
const disclibrary = require ('discord.js');

// playlist do youtube: https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_
// token ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw


var http = require('http');
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);

bot.on('ready', () => {
    console.log('Bot Alive!')
    let activities = 'Playing Avril Lavigne song, as always!'
    setInterval(() => bot.user.setActivity(`Avril Lavigne`, {
        type: "LISTENING",
        url: "https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_"
    }), 5000)
})


// messages
bot.on('message', async msg => {
    const m = msg.content.toLowerCase();
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    if (m === '!avril')
        return msg.channel.send('Hey Hey You You');
    else if (m === '!botfdp')
        return msg.reply("fdp é teu pai, aquele corno")
    else if (m === '!gata')
        return msg.channel.send('gata gorda 🙀')
    else if (m === 'k'){
        // FINALKMENTE CONSIGO SETTAR O BOT EM UM CANAL
        var idvoice = msg.member.voiceChannel;
        idvoice.join();
        // GUARDAR O CÓDIGO COMO SE FOSSE A VIRGINDADE
        console.log(idvoice);
        return msg.channel.send("foda");

    }
    else if (m === 'j') {

    }

});


bot.login(Token);
