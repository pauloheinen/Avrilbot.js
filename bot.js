const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
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
bot.on('messageCreate', async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    if (msg.content.toLowerCase() === '!avril')
        return msg.reply('Hey Hey You You');
    else if (msg.content.toLowerCase() === '!botfdp')
        return msg.reply("fdp é teu pai, aquele corno")
    else if (msg.content.toLowerCase() === '!gata')
        return msg.reply('gata gorda 🙀')
    else if (msg.content.toLowerCase() === 'k'){
        console.log("K pressed!");
            bot.channels.cache.map(value => '883848352930865156').join();
            //bot.channels.fetch('883848352930865156');

    }
});

bot.on('voiceStateUpdate', voice =>{
    voice.channel.
})




bot.login(Token);
