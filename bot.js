const {Client} = require('discord.js');
const bot = new Client();
const Token = 'ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw';
const ytdl = require('ytdl-core');
const youtube = require('simple-youtube-api');
const disclibrary = require ('discord.js');
const filamusica = [];
// playlist do youtube: https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_
// token ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw


var http = require('http');
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(80);

bot.on('ready', () => { // when the bot is on
    console.log('Bot Alive!')
    let activities = 'Playing Avril Lavigne song, as always!'
    setInterval(() => bot.user.setActivity(`Avril Lavigne`, {
        type: "LISTENING",
        url: "https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_"
    }), 5000)
})

/* Start of message events */
bot.on('message', msg => {
    const m = msg.content.toLowerCase(); // m = message content in lower case
    if (msg.author.bot) return; // if the message is from another bot
    if (msg.channel.type === 'dm') return; // if is a DirectMessage
    if (m === '!avril')
        return msg.channel.send('Hey Hey You You');
    if (m === '!botfdp')
        return msg.reply('fdp é teu pai, aquele corno');
    if (m === '!gata')
        return msg.channel.send('gata gorda 🙀');
    if (m === '!justdoit' || m === '!jdi') {
        var idvoice = msg.member.voiceChannel; // idvoice = the info about channel that the msg sender is
        console.log(idvoice); // print out on console
        if (idvoice != null){ // if is in a voice channel
            idvoice.join(); // bot join
            console.log("Bot joined at:" + idvoice);
            return msg.channel.send("Let's do it!");
        }
        else {
            return msg.channel.send("Não ta no canal de voz né pô, faz certo, faz direito!");
        }
    }
    if (m === '!comandos')
        return msg.channel.send('!avril\n!botfdp\n!gata\n!justdoit or !jdi\n😘😘😜');
});
/* end of message events */


/* start of voice state event */
bot.on("voiceStateUpdate", (oldMember, newMember) => {
    if (newMember.voiceChannelID === '883096070857556009') { // if some member enters in voice channel with that id
        var loginvoice = newMember.voiceChannel.join();
        console.log(newMember.user.username+" Entrou no canal Avril 24/7");
        bot.voiceConnections.get(loginvoice);
    }
    if (oldMember.voiceChannelID === '883096070857556009') // if some member leave that same voice channel
        console.log(oldMember.user.username+" Saiu do canal Avril 24/7");
})
/* end of voice state event */



bot.login(Token);
