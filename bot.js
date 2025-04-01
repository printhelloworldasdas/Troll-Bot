// Importamos las dependencias necesarias
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Creamos un cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,                // Necesario para trabajar con servidores
    GatewayIntentBits.GuildMessages,         // Necesario para leer los mensajes
    GatewayIntentBits.MessageContent         // Necesario para acceder al contenido de los mensajes
  ],
});

client.once('ready', () => {
  console.log(`✅ Aplicación lista como ${client.user.tag}`);
});

// Maneja las interacciones (comandos slash)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return; // Si no es un comando, ignoramos

  // Comando /troll
  if (interaction.commandName === 'troll') {
    const mensaje = interaction.options.getString('mensaje'); // Obtenemos el mensaje

    // Enviar 10 mensajes en el canal
    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(mensaje); // Enviamos el mensaje en el canal
    }

    // Respondemos al usuario con un mensaje de confirmación, solo visible para él
    await interaction.reply({
      content: 'He enviado los 10 mensajes solicitados!',
      ephemeral: true, // El mensaje será solo visible para el usuario que interactuó
    });
  }
});

// Registra los comandos de barra (slash) en el servidor de Discord
const { SlashCommandBuilder } = require('@discordjs/builders');

const commands = [
  new SlashCommandBuilder()
    .setName('troll')
    .setDescription('Envía 10 mensajes en el canal')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('El mensaje que quieres enviar')
        .setRequired(true)
    )
];

client.on('ready', () => {
  client.application.commands.set(commands)
    .then(() => console.log('Comandos registrados correctamente'))
    .catch(console.error);
});

// Iniciamos el bot con el token
client.login(process.env.TOKEN);
