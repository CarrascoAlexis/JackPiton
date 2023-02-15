const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

const { sendPermissionError } = require('../functions/messageUtilities')

const log = require ('../utilities').log

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear specific amount message in a channel')
        .addNumberOption(option => 
            option.setName("amount")
            .setDescription("Amount of deleted messages")
            .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("target")    
            .setDescription("channel where the messages should be deleted")
            .setRequired(false)
        ),
	async execute(interaction) {
		if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
		{
			sendPermissionError(interaction)
			return;
		}
        target = interaction.options.getChannel("target")
        if(target == null)
        {
            target = interaction.channel
        }
        const amount = interaction.options.getNumber("amount")
        await target.bulkDelete(amount, true);
        interaction.reply({content: `Suppressiond de ${amount} messages dans le salon ${target.name}`, ephemeral: true})
        return;
	},
};