const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const { sendPermissionError } = require('../functions/messageUtilities')
const { execute } = require('./user')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eventsender')
        .setDescription('Send event creator panel in specific channel')
        .addChannelOption(option => 
            option
            .setName("target")
            .setDescription("channel where the emssage should be send")
            .setRequired(true)),
    async execute(interaction) {
		if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
		{
			sendPermissionError(interaction)
			return;
		}
        const target = interaction.options.getChannel("target")
        const eventEmbed = new EmbedBuilder()
            .setColor(0xE0CE00)
            .setTitle('Organiser un événement')
            .setDescription('Appuyez sur le bouton ci dessous pour lancer l\'organisation d\'un événement')
            .setThumbnail("https://i.imgur.com/NWuj36u.png");
        
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('eventOrganizer')
					.setLabel('Commencer')
					.setStyle(ButtonStyle.Primary)
			);
        
        target.send({embeds:[eventEmbed], components:[row]})
        await interaction.reply({content : `Organisateur d'événements envoyée dans le salon <#${target.id}>`, ephemeral: true});
    }
}