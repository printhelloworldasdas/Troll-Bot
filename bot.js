// Importamos las dependencias necesarias
const { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
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

    // Crear un botón
    const button = new ButtonBuilder()
      .setCustomId('troll_button')
      .setLabel('Haz clic para recibir los mensajes')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    // Respondemos con un mensaje y el botón, ambos solo visibles para el usuario
    await interaction.reply({
      content: 'Pss... click this button :D',
      components: [row],
      ephemeral: true, // El mensaje y el botón serán solo visibles para el usuario
    });

    // Guardamos el mensaje en el estado de la interacción para usarlo más tarde
    interaction.message = {
      content: mensaje
    };
  }

  // Manejamos la acción cuando se presiona el botón
  if (interaction.customId === 'troll_button') {
    const mensaje = interaction.message.content; // Usamos el mensaje guardado en la interacción

    // Enviar 10 mensajes
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

// Iniciamos el bot con el token
client.login(process.env.TOKEN);
