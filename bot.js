const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const Token = 'ODgzMTE4NDI0NjEwNDM5MTg5.YTFSHw.2TDbPxgUgUCJePsynlHWDmsreOI';
const ytdl = require('ytdl-core');
//const queue = new map();


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

/*
bot.on('ready', () => {
    console.log('Your Bot is now Online.')
    let activities = ['Playing Avril Lavigne song, as always!']
    setInterval(() => bot.user.setActivity(`${activities}`, {
        type: "CUSTOM",
        url: "https://www.youtube.com/playlist?list=PLH69otCpA08EF1LACrijzjkEu9NzCvEr_"
    }), 5000)
})
 */

// messages
bot.on('message', async msg => {
    if (msg.content.toLowerCase() === '!avril')
    return msg.reply('Hey Hey You You');
    else if (msg.content.toLowerCase() === '!botfdp')
        msg.reply("fdp é teu pai, aquele corno")
    else if (msg.content.toLowerCase() === '!gata')
        msg.reply('gata gorda 🙀')
});

/* -------------------------------------------- */

// songs
/*
async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send("Vai pro canal de musica, cabeção!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("Falta permissão p eu loga nesse canal ai");
    }
}

const songInfo = await ytdl.getInfo(args[1]);
const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
};

if (!serverQueue) {

}else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return message.channel.send(`${song.title} has been added to the queue!`);
}

// Creating the contract for our queue
const queueContruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
};
// Setting the queue using our contract
queue.set(message.guild.id, queueContruct);
// Pushing the song to our songs array
queueContruct.songs.push(song);

try {
    // Here we try to join the voicechat and save our connection into our object.
    var connection = await voiceChannel.join();
    queueContruct.connection = connection;
    // Calling the play function to start a song
    play(message.guild, queueContruct.songs[0]);
} catch (err) {
    // Printing the error message if the bot fails to join the voicechat
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
    }
}

const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
serverQueue.textChannel.send(`Start playing: **${song.title}**`);


*/




bot.login(Token);
