const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', message => {
    console.log(message.content);
})

client.login(process.env.BOT_TOKEN)