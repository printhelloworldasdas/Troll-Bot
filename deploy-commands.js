const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

// Crea el comando `/troll`
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

// Establece la autenticación con tu token
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('⏳ Registrando comandos globales...');
        // Registra el comando en todos los servidores
        await rest.put(
            Routes.applicationCommands(process.env.APPLICATION_ID), // Usamos el Client ID de tu aplicación
            { body: commands }
        );
        console.log('✅ Comandos registrados globalmente.');
    } catch (error) {
        console.error(error);
    }
})();
