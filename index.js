const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  console.log(message);
  if (message.author.bot) {
    return;
  }
  message.reply({
    content: "Hi there",
  });
});

client.on("interactionCreate", async (interaction) => {
  //   console.log(interaction);
  if (interaction.commandName === "ask") {
    // API call to gemini using sdk
    const query = interaction.options.getString("message");
    // console.log(query);

    // prompt
    const prompt = `
        SYSTEM PROMPT: 
        You are a Chat Bot who helps others with their question's answer. You are very friendly. Your Name is Siya.
        Give Responses in well-mannered sentences with new lines and proper escape characters for a beautiful look.

        USER PROMPT:
        ${query}
        `;

    const result = await model.generateContent(prompt);

    // sending a defer reply to the user to send reponse after 3 seconds
    await interaction.deferReply();

    const response = result.response.text();
    // console.log(response);
    await interaction.editReply(response);
  }
});

client.login(process.env.BOT_TOKEN);
