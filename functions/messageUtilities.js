const { EmbedBuilder } = require('discord.js');

const sendPermissionError = (interaction) =>
{
    const permissionErrorEmbed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setTitle("Permisison error")
    .setDescription("you d'ont have permission to perform this action")

    interaction.reply({embeds:[permissionErrorEmbed], ephemeral: true})
}

module.exports.sendPermissionError = sendPermissionError