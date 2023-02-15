const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const showGlobalHelp = require('../functions/helpDrawer').showGlobalHelp

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows help menu'),
	async execute(interaction) {
        showGlobalHelp(interaction)
	},
};