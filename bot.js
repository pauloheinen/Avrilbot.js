/* APIS */
const {Client} = require('discord.js');
const bot = new Client();
const http = require('http');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBNkXUzDkHvYSW5lKZE_vXqMY2ifcj22TU');

/* LIBS */
const fs = require('fs');
const downloader = require("@discord-player/downloader").Downloader;

/* BOT CONSTANTS */
const LOCAL = './Music/'; // where to save files
const playlists = ['https://www.youtube.com/playlist?list=PLED03B2E1FC47994B',
    'https://www.youtube.com/playlist?list=PLOfcxmVI3iUASS5tHevLxLfGq3lZJYrNh',
    'https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_']
const random = Math.floor(Math.random() * playlists.length); // to get a random playlist
let radioON = false; // if the radio is ON
let avrilcount = 0; // quantity of listeners

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

    if (msg.author.bot) return 0;  // if the message is from another bot
    else if (msg.channel.type !== 'text') return 0; // if isn a text message
    if (m === '!Avril')
        return msg.channel.send('Hey Hey You You');
    if (m === '!botfdp')
        return msg.reply('fdp é teu pai, aquele corno');
    else if (m === '!gata')
        return msg.channel.send('gata gorda 🙀');
    else if (m === '!justdoit' || m === '!jdi' || m === '!justvitao' || m === 't'){
        if (msg.member.voiceChannel != null) { // if is in a voice channel
            if (radioON === false)
                return msg.channel.send("Let's do it!").then(playmusic(msg.member.voiceChannel));
            else
                return msg.channel.send("I'm already playing something!");
        }
        else
            return msg.channel.send("Não ta no canal de voz né pô, faz certo, faz direito!");
    }
    else if (m === '!sk'){
        if (radioON === true)
            return playmusic(msg.member.voiceChannel); // call again cause it should be a non-stop radio
        else
            return msg.channel.send("Im not even playing right now!");
    }
    else if (m === '!comandos')
        return msg.channel.send('!Avril\n!botfdp\n!gata\n!justvitao\n!jdi or !justdoit\n!sk\n!comandos\n😘😘😜😎😎\n');

});



/* Voice State event */
bot.on("voiceStateUpdate", (oldMember, newMember) => {

    if (newMember.user.id !== '883118424610439189') { // if wasnt the bot that got in
        if (newMember.voiceChannelID === '883096070857556009') { // if some member enters in voice channel with that id


            avrilcount = avrilcount + 1;
            if (avrilcount === 1) {
                console.log(newMember.user.username + " Entrou no canal Avril 24/7");
                return playmusic(newMember.voiceChannel);
            }
        }

    }
    if (oldMember.voiceChannelID === '883096070857556009') { // if some member leave that same voice channel
        console.log(oldMember.user.username + " Saiu do canal Avril 24/7");
        if (avrilcount-1 < 0)
            avrilcount = 0;
        else
            avrilcount = avrilcount - 1;
    }
    console.log("Listening: " + avrilcount);
})


/* Music bot */
function playmusic(idvoice){
    if (!radioON)
        idvoice.join().then( () =>{
            youtube.getPlaylist(playlists[random]).then(playlist =>{
                    playlist.getVideos().then(videos => {
                            beta(videos, idvoice, videos.length - videos.length);
                        });
                });
        });
}


async function beta(videos, idvoice, index){
    if (index !== videos.length) { // if isnt the end of playlist
        fs.readdir(LOCAL, (async (err, files) => { // where to search for
            if (files.includes(videos[index].title + ".mp3") === true) { // search in a folder for the file
                console.log('Now playing: ' + videos[index].title);
                radioON = true;
                let dispatcher = await idvoice.connection.playFile(LOCAL + videos[index].title + ".mp3"); // play the music
                if (index + 1 !== videos.length) { // if theres more in the playlist
                    console.log("Downloading: " + videos[index + 1].title + ".mp3");
                    const stream = downloader.download(videos[index + 1].url); // it downloads the next file while already streams one
                    stream.pipe(fs.createWriteStream(LOCAL + videos[index + 1].title + ".mp3"));
                }
                await dispatcher.on('end', () => {
                    radioON = false;
                    dispatcher = undefined;
                    beta(videos, idvoice, index += 1); // recursive call to next music
                })
            } else { // if the actual file for some reason didnt downloaded
                console.log("Downloading: " + videos[index].title + ".mp3");
                const stream = downloader.download(videos[index + 1].url);
                stream.pipe(fs.createWriteStream(LOCAL + videos[index].title + ".mp3"));
                await new Promise(r => setTimeout(r, 4500));
                await beta(videos, idvoice, index); // download the file and recursive call to play again
            }
        }));
    }
    else
        playmusic(idvoice);
}

function verifystorage(videos){
    fs.readdir(LOCAL, (async (err, files) => { // where to search for
        for (let i = 0; i < videos.length; i++) { // array of youtube files
            for (let j = 0; j < files.length; j++) { // array of local files
                if (videos[i].title + ".mp3" === files[j]) {
                    console.log("Already has: " + videos[i].title + ".mp3");
                    break;
                }
                else if (j === files.length - 1) {
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
