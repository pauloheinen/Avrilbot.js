/* APIS */
const {Client} = require('discord.js');
const bot = new Client();
const http = require('http');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBNkXUzDkHvYSW5lKZE_vXqMY2ifcj22TU');

/* LIBS */
const ytdl = require('ytdl-core');
const fs = require('fs');
const downloader = require("@discord-player/downloader").Downloader;

/* BOT CONSTANTS */
const LOCAL = './Music/';
const playlists = ['https://www.youtube.com/playlist?list=PLED03B2E1FC47994B',
    'https://www.youtube.com/playlist?list=PLOfcxmVI3iUASS5tHevLxLfGq3lZJYrNh',
    'https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_']
const random = Math.floor(Math.random() * playlists.length);
let radioON = false;

/* Connection */
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8000);

/* Bot startup */
bot.on('ready', () => { // when the bot is on
    console.log('Bot Alive!')
    setInterval(() => bot.user.setActivity(`Avril Lavigne`, {
        type: "LISTENING"
    }), 5000)
})

/* Message event */
bot.on('message', msg => {
    let m = msg.content.toLowerCase(); // m = message content in lower case
    let idvoice = msg.member.voiceChannel; // idvoice = the info about channel that the msg sender is

    if (msg.author.bot) return 0;  // if the message is from another bot
    else if (msg.channel.type !== 'text') return 0; // if isn a text message
    if (m === '!Avril')
        return msg.channel.send('Hey Hey You You');
    if (m === '!botfdp')
        return msg.reply('fdp é teu pai, aquele corno');
    else if (m === '!gata')
        return msg.channel.send('gata gorda 🙀');
    else if (m === '!justdoit' || m === '!jdi' || m === '!justvitao' || m === 't'){
        if (idvoice != null) { // if is in a voice channel
            if (radioON === false){
                return msg.channel.send("Let's do it!").then(playmusic(idvoice));
            }
            else
                return msg.channel.send("I'm already playing something!");
        }
        else
            return msg.channel.send("Não ta no canal de voz né pô, faz certo, faz direito!");
    }
    else if (m === '!comandos')
        return msg.channel.send('!Avril\n!botfdp\n!gata\n!justvitao\n!jdi or !justdoit\n!comandos\n😘😘😜😎😎\n');

});



/* Voice State event */
bot.on("voiceStateUpdate", (oldMember, newMember) => {
    if (newMember.voiceChannelID === '883096070857556009') { // if some member enters in voice channel with that id
        playmusic(newMember.voiceChannel);
        return console.log(newMember.user.username+" Entrou no canal Avril 24/7")

    }
    if (oldMember.voiceChannelID === '883096070857556009') // if some member leave that same voice channel
        console.log(oldMember.user.username+" Saiu do canal Avril 24/7");

    if (newMember.nickname === 'AvrilRadio'){
        newMember.voiceChannel.connection.on('error', e =>{
            console.error(e);
        })

    }
})


/* Music bot */
function playmusic(idvoice){
    idvoice.join()
        .then(connection =>{
            youtube.getPlaylist(playlists[random])
                .then(playlist =>{
                    playlist.getVideos()
                        .then(videos => {
                            beta(videos, connection, videos.length-videos.length);
                            //verifystorage(videos);
                            //stream(connection, videos, videos.length - videos.length);
                        })
                })
        })
}


function beta(videos, connection, index){
    fs.readdir(LOCAL, (async (err, files) => { // where to search for
        if (files.includes(videos[index].title + ".mp3") === true){
            console.log("Already has: " + videos[index].title + ".mp3");
            console.log('Now playing: ' + videos[index].title);
            radioON = true;
            let dispatcher = await connection.playFile(LOCAL+videos[index].title+".mp3");
            await dispatcher.on('end', () => {
                radioON = false;
                dispatcher = undefined;
                beta(videos, connection, index += 1);
            })
        }
        else{
            console.log("Downloading: " + videos[index].title + ".mp3");
            const stream = downloader.download(videos[index].url);
            await new Promise(r => setTimeout(r, 5000));
            stream.pipe(fs.createWriteStream(LOCAL + videos[index].title + ".mp3"));
            beta(videos, connection, index);
        }
    }));
}

function verifystorage(videos){
    fs.readdir(LOCAL, (async (err, files) => { // where to search for
        for (let i = 0; i < videos.length; i++) { // array of youtube files
            for (let j = 0; j < files.length; j++) { // array of local files
                if (videos[i].title + ".mp3" === files[j]) {
                    console.log("Already has: " + videos[i].title + ".mp3");
                    break;
                } else if (j === files.length - 1) {
                    console.log("Downloading: " + videos[i].title + ".mp3");
                    const stream = downloader.download(videos[i].url);
                    await new Promise(r => setTimeout(r, 4000));
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
            console.log('Now playing: ' + videos[index].title);
            stream(connection, videos, index += 1);
        })
    }
}

bot.login('ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.DqR4UNGr3_trt3chvRTahznheCw');
