const { REST, Routes, Options } = require("discord.js");
require("dotenv").config();

const commands = [
  {
    name: "ask",
    description: "Replies with any question With the LLM model",
    options: [
      {
        name: "message",
        description: "Your message",
        type: 3, // string input type
        required: true,
      }
    ]
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
