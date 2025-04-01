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
    try {
      const mensaje = interaction.options.getString('mensaje'); // Obtenemos el mensaje

      // Enviar 10 mensajes en el canal
      for (let i = 0; i < 10; i++) {
        await interaction.channel.send(mensaje); // Enviamos el mensaje en el canal
      }

      // Responder al usuario rápidamente para evitar la expiración de la interacción
      await interaction.reply({
        content: 'He enviado los 10 mensajes solicitados!',
        flags: 64, // Establecemos el flag para que sea solo visible para el usuario
      });
    } catch (error) {
      console.error('Error al manejar la interacción:', error);
      if (interaction.deferred) {
        // Si ya hemos diferido la respuesta, respondemos con un error
        await interaction.editReply('Hubo un error al intentar enviar los mensajes.');
      } else {
        // Si no hemos diferido la respuesta, respondemos normalmente
        await interaction.reply('Hubo un error al intentar enviar los mensajes.');
      }
    }
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
