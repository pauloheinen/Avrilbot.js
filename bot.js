/* Tokens */
const Token = 'ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw';
const Ytoken = 'AIzaSyBNkXUzDkHvYSW5lKZE_vXqMY2ifcj22TU';
/* ***************************************************** */


const {Client} = require('discord.js');
const bot = new Client();
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBNkXUzDkHvYSW5lKZE_vXqMY2ifcj22TU');

//https://developers.google.com/youtube/v3/getting-started

// playlist do youtube: https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_
// token ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw
/* for playing music */
var filamusica = []; // a queue of musics
const stream = require("stream"); // to streaming in voice channel


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
    let idvoice = msg.member.voiceChannel; // idvoice = the info about channel that the msg sender is

    if (msg.author.bot) return; // if the message is from another bot
    if (msg.channel.type === 'dm') return; // if is a DirectMessage
    if (m === '!avril')
        return msg.channel.send('Hey Hey You You');
    if (m === '!botfdp')
        return msg.reply('fdp é teu pai, aquele corno');
    if (m === '!gata')
        return msg.channel.send('gata gorda 🙀');
    if (m === '!justdoit' || m === '!jdi') {
        if (idvoice != null){ // if is in a voice channel
            idvoice.join().then(connection =>{
                const stream = ytdl('https://www.youtube.com/watch?v=LOcKckBLouM&list=PLOfcxmVI3iUASS5tHevLxLfGq3lZJYrNh&ab_channel=AvrilLavigneVEVO');
                connection.playStream(stream);
            }); // bot join
            console.log("Bot joined at: "+idvoice.name+" in: "+idvoice.guild.name);
            msg.channel.send("Let's do it!");
        }
        else {
            return msg.channel.send("Não ta no canal de voz né pô, faz certo, faz direito!");
        }
    }
    if (m === '!justvitao'){
        if (idvoice != null){
            idvoice.join().then(connection =>{
                const stream = ytdl('https://www.youtube.com/watch?v=5NPBIwQyPWE&list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_&index=1&ab_channel=AvrilLavigneVEVO');
                idvoice.join();
                connection.playArbitraryInput(stream);
            })
        }
    }
    if (m === 't'){
        if (idvoice != null){
            idvoice.join()
                .then(connection =>{
                youtube.getPlaylist('https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_')
                    .then(playlist =>{
                     playlist.getVideos()
                         .then(videos =>{
                             for (let i = 0; i < videos.length; i++) {
                                 console.log(videos[i].url);

                             }
                         })
                    })
                    .catch(console.log);
            })
        }

    }
    if (m === '!comandos')
        return msg.channel.send('!avril\n!botfdp\n!gata\n!justdoit or !jdi\n!justvitao\n😘😘😜\n');
});
/* end of message events */


/* start of voice state event */
bot.on("voiceStateUpdate", (oldMember, newMember) => {
    if (newMember.voiceChannelID === '883096070857556009') { // if some member enters in voice channel with that id
        newMember.voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=LOcKckBLouM&list=PLOfcxmVI3iUASS5tHevLxLfGq3lZJYrNh&ab_channel=AvrilLavigneVEVO');
            connection.playArbitraryInput(stream);
        });
        console.log(newMember.user.username+" Entrou no canal Avril 24/7");
    }
    if (oldMember.voiceChannelID === '883096070857556009') // if some member leave that same voice channel
        console.log(oldMember.user.username+" Saiu do canal Avril 24/7");
})
/* end of voice state event */



bot.login(Token);
