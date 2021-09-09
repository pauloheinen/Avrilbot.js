const {Client} = require('discord.js');
const bot = new Client();
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBNkXUzDkHvYSW5lKZE_vXqMY2ifcj22TU');
const ytdl = require('ytdl-core');
const fs = require('fs');
const spnk = require('spnk-core').youtube;
const downloader = require("@discord-player/downloader").Downloader;
let radioON = false;
const LOCAL = './Music/';

/*
https://www.npmjs.com/package/discord-music-app
https://www.npmjs.com/package/youtu-playlist-downloader
https://www.npmjs.com/package/youtube-playlist-dl
https://www.npmjs.com/package/@twometer/blaze
 */


const http = require('http');

http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8000);

bot.on('ready', () => { // when the bot is on
    console.log('Bot Alive!')
    setInterval(() => bot.user.setActivity(`Avril Lavigne`, {
        type: "LISTENING",
        url: "https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_"
    }), 5000)
})

/* Start of message events */
bot.on('message', msg => {
    const m = msg.content.toLowerCase(); // m = message content in lower case
    let idvoice = msg.member.voiceChannel; // idvoice = the info about channel that the msg sender is

    if (msg.author.bot) return 0;  // if the message is from another bot
    else if (msg.channel.type !== 'text') return 0; // if isn a text message
    else if (m === '!avril')
        return msg.channel.send('Hey Hey You You');
    else if (m === '!botfdp')
        return msg.reply('fdp é teu pai, aquele corno');
    else if (m === '!gata')
        return msg.channel.send('gata gorda 🙀');
    else if (m === '!justdoit' || m === '!jdi' || m === '!justvitao' || m === 't'){
        if (idvoice != null) { // if is in a voice channel
            if (radioON === false){
                radioON = true;
                return msg.channel.send("Let's do it!").then(playmusic(idvoice));
            }
        }
        else
            return msg.channel.send("Não ta no canal de voz né pô, faz certo, faz direito!");
    }
    else if (m === '!comandos')
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

    if (newMember.nickname === 'AvrilRadio'){
        newMember.voiceChannel.connection.on('error', e =>{
            console.error(e);
        })

    }
})
/* end of voice state event */


function playmusic(idvoice){
    idvoice.join()
        .then(connection =>{
            youtube.getPlaylist('https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_')
                .then(playlist =>{
                    playlist.getVideos()
                        .then(videos => {
                            verifystorage(videos);
                            stream(connection, videos, videos.length - videos.length);
                        })
                })
        })
}

function verifystorage(videos){
    fs.readdir(LOCAL, ((err, files) => { // where to search for
        for (let i = 0; i < videos.length; i++) { // array of youtube files
            for (let j = 0; j < files.length; j++) { // array of local files
                if (videos[i].title+".mp3" === files[j]) {
                    console.log("Already has: " + videos[i].title + ".mp3");
                    break;
                }
                else if (j === files.length-1){
                    console.log("Downloading: "+videos[i].title+".mp3");
                    const stream = downloader.download(videos[i].url);
                    stream.pipe(fs.createWriteStream(LOCAL + videos[i].title + ".mp3"));
                }
            }
        }
    }));
}

async function stream(connection, videos, index){
    if (index < videos.length) {
        let dispatcher = await connection.playStream(LOCAL + videos[index].title + ".mp3");
        await dispatcher.on('error', e => {
            console.log(e);
        });
        await dispatcher.on('end', () => {
            dispatcher = undefined;
            console.log('Now playing:' + videos[index].title);
            stream(connection, videos, index += 1);
        })
    }
}

bot.login('ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw');
