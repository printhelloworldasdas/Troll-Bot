const { Client, GatewayIntentBits, InteractionType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
require('dotenv').config();

// Crear el cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Escucha cuando el cliente está listo
client.once('ready', () => {
    console.log(`✅ Aplicación lista como ${client.user.tag}`);
});

// Manejar la interacción del comando Slash y los botones
client.on('interactionCreate', async interaction => {
    // Comando Slash
    if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.commandName === 'troll') {
            const message = interaction.options.getString('mensaje');
            
            // Crear el botón
            const button = new ButtonBuilder()
                .setCustomId('troll_button')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);
            
            // Responde con el mensaje y el botón
            await interaction.reply({ content: "Pss... click this button :D", components: [row] });
            interaction.channel.trollMessage = message;
        }
    } 
    // Responder al clic del botón
    else if (interaction.isButton() && interaction.customId === 'troll_button') {
        if (!interaction.channel.trollMessage) {
            await interaction.reply({ content: "Error: No hay un mensaje guardado!", ephemeral: true });
            return;
        }
        // Enviar el mensaje 10 veces
        for (let i = 0; i < 10; i++) {
            await interaction.channel.send(interaction.channel.trollMessage);
        }
    }
});

// Inicia sesión con el token de la aplicación (si es un bot)
client.login(process.env.TOKEN);
