const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

const { sendPermissionError } = require('../functions/messageUtilities')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infossender')
		.setDescription('Send informations in specific channel')
        .addChannelOption(option =>
            option
            .setName("target")
            .setDescription("channel where the message should be send")
            .setRequired(true)),
	async execute(interaction) {
		if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
		{
			sendPermissionError(interaction)
			return;
		}
        const target = interaction.options.getChannel("target")
        const mainEmbed = new EmbedBuilder()
			.setColor(0xE0CE00)
			.setTitle('Bienvenue sur le discord de la famille Piton ')
			.setDescription("Vous vous trouvez ici sur le discord officiel de la famille Piton. Utile pour discuter, et organiser des scènes RP \n\nIci tu trouvera toutes les informations utiles.")
		
		
		const familyInfosEmbed = new EmbedBuilder()
			.setColor(0xE0CE00)
			.setTitle('💬・FAMILLE :')
			.setDescription("La famille Piton est une famille repectueuse, active, et qui maintiens une bonne ambiance.\nLa famille à été crée par ses deux \"chefs\", Vincent et Clara Piton.\nNous n'attaquons pas forcement le temps que vous cherchez pas la guerre\nOn est très actifs surtout les soirs , weekend et vacances\nNous recrutons actuellement donc si tu remplis les critères de recrutement	, tu peux tenter de faire ta candidature ici : <#1070425369980702720> (on sait jamais)")

		const discordInfosEmbed = new EmbedBuilder()
			.setColor(0xE0CE00)
			.setTitle('💬・DISCORD :')
			.setDescription("Ce discord est le discord officiel de la famille Piton.\nIci, tu trouvera tout ce donc tu as besoin. Tu pourra parler avec la famille Piton, mais aussi avec d'autres familles\nTu pourra prendre part à des actions organisées, ou même organiser les tiennes.\nLis le <#1070424828600930398> afin d'en savoir plus sur les règles de ce serveur, et d'accéder à la totalité du contenu.\nBon, maintenant je te laisse découvrir notre discord et notre famille !")


		target.send({embeds: [mainEmbed, familyInfosEmbed, discordInfosEmbed]})
		await interaction.reply({content : `Informations envoyées dans le salon <#${target.id}>`, ephemeral: true});
	},
};