// Import required dependencies
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

// Create a Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Register slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('troll')
    .setDescription('Envía 10 mensajes en el canal')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('El mensaje que quieres enviar')
        .setRequired(true)
    )
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`✅ Bot ready as ${client.user.tag}`);
  
  try {
    // Register commands
    await client.application.commands.set(commands);
    console.log('Commands registered successfully');
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
});

// Handle slash command interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Handle /troll command
  if (interaction.commandName === 'troll') {
    try {
      // Defer the reply first to avoid interaction timeout
      await interaction.deferReply({ ephemeral: true });
      
      const message = interaction.options.getString('mensaje');
      
      // Send 10 messages to the channel
      for (let i = 0; i < 10; i++) {
        await interaction.channel.send(message);
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Edit the deferred reply
      await interaction.editReply('He enviado los 10 mensajes solicitados!');
    } catch (error) {
      console.error('Error handling interaction:', error);
      await interaction.editReply('Hubo un error al intentar enviar los mensajes.');
    }
  }
});

// Start the bot
client.login(process.env.TOKEN)
  .catch(error => console.error('Failed to login:', error));
