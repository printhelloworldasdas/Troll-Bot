const { Client, GatewayIntentBits, InteractionType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js'); require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => { console.log(✅ Aplicación lista como ${client.user.tag}); });

client.on('interactionCreate', async interaction => { if (interaction.type === InteractionType.ApplicationCommand) { if (interaction.commandName === 'troll') { const message = interaction.options.getString('mensaje'); const button = new ButtonBuilder() .setCustomId('troll_button') .setLabel('Click me!') .setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(button);
        await interaction.reply({ content: "Pss... click this button :D", components: [row] });
        interaction.channel.trollMessage = message;
    }
} else if (interaction.isButton() && interaction.customId === 'troll_button') {
    if (!interaction.channel.trollMessage) {
        await interaction.reply({ content: "Error: No hay un mensaje guardado!", ephemeral: true });
        return;
    }
    for (let i = 0; i < 10; i++) {
        await interaction.channel.send(interaction.channel.trollMessage);
    }
}

});

client.login(process.env.TOKEN);

