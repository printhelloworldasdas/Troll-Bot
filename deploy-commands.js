const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder()
        .setName('troll')
        .setDescription('Envía un mensaje trolleador con un botón.')
        .addStringOption(option =>
            option.setName('mensaje')
            .setDescription('Mensaje que se enviará 10 veces')
            .setRequired(true)
        )
        .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('⏳ Registrando comandos globales...');
        await rest.put(
            Routes.applicationCommands(process.env.APPLICATION_ID), // Usa tu Client ID aquí
            { body: commands }
        );
        console.log('✅ Comandos registrados correctamente.');
    } catch (error) {
        console.error(error);
    }
})();
