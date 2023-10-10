const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

// Discord Botのトークン
const TOKEN = 'YOUR_DISCORD_BOT_TOKEN';

// Minecraftサーバーログファイルのパス
const LOG_FILE_PATH = '/path/to/your/logs/latest.log';

client.once('ready', () => {
    console.log('Bot is ready!');
    watchMinecraftLog();
});

client.login(TOKEN);

function watchMinecraftLog() {
    let logStream = fs.createReadStream(LOG_FILE_PATH, {encoding: 'utf8', start: fs.statSync(LOG_FILE_PATH).size});

    logStream.on('data', (chunk) => {
        // Minecraftサーバーのログからログイン情報を見つける
        let matches = chunk.match(/: (.+?) joined the game/);
        if (matches) {
            let playerName = matches[1];
            sendMessageToDiscord(playerName);
        }
    });
}

function sendMessageToDiscord(playerName) {
    // Discordサーバー内のチャンネルID
    let channelId = 'YOUR_DISCORD_CHANNEL_ID';

    let channel = client.channels.cache.get(channelId);
    if (channel) {
        channel.send(`${playerName} has joined the Minecraft server!`);
    } else {
        console.error('Channel not found!');
    }
}
