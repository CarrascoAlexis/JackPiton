const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

const { sendPermissionError } = require('../functions/messageUtilities')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rulessender')
		.setDescription('Send rules in specific channel')
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
			.setTitle('Bienvenue sur le discord de la famille Piton !')
			.setDescription('Vous vous trouvez ici sur le discord officiel de la famille Piton. Utile pour discuter, et organiser des scènes RP \n \n Nous vous invitons à lire le réglement ci-dessous. Toute sanction sera prise en se basant sur celui-ci')
			.setThumbnail("https://i.imgur.com/NWuj36u.png");

		const textualEmbed = new EmbedBuilder()
		.setColor(0xE0CE00)
		.setTitle("✏️  1・RÈGLEMENT TEXTUEL :")
		
		.addFields(
			{ name: "1.1・Le spam, le flood et toute utilisation abusive de majuscules sont interdits est interdit.", value:" " },
			{ name: "1.2・Le respect est la maître mot. Il faut donc adopter un langage et un comportement correct envers les autres membres du discord." , value:" " },
			{ name: "1.3・Être respectueux et traiter tout le monde avec un respect qu’il sois staff ou non.", value:" " },
			{ name: "1.4・Merci de ne pas troller et d’avoir une attitude déplorable.", value:" "  },
			{ name: "1.5・Ne pas se faire passer pour une personne que l’on est pas." , value:" " },
			{ name: "1.6・Les pseudos et photos profils ne doivent pas contenir de contenu discriminatoire, incitant à la violence, provocant ou choquant." , value:" " },
			{ name: "1.7・Ne pas demander des choses personnelles, si la personne n’en a pas envie.", value:" "  },
			{ name: "1.8・Si le staff vous fait une remarque, merci de respecter.", value:" "  },
			{ name: "1.9・Se serveur n’est pas un site un rencontre et de drague.", value:" "  },
			{ name: "1.10・Les sujets / contenus pédophile, pornographique, homophobe, religieux, raciste sont strictement interdit." , value:" " },
			{ name: "1.11・La diffusion d’information personnelles d’une personne ne sont pas toléré.", value:" "  },
			{ name: "1.12・Les doubles compte sont strictement interdit ( sauf sous l’accord du staff )" , value:" " },
			{ name: "1.13・La publicité en MP n’est pas autorisé ainsi que dans le serveur discord.", value:" "  },
			{ name: "1.14・Les thèmes des salons doivent être respectés.", value:" "  },
			{ name: "1.15・Le \"ghost ping\" est interdit.", value: " " }
		)

		const vocalEmbed = new EmbedBuilder()
		.setColor(0xE0CE00)
		.setTitle("🔊  2・RÈGLEMENT VOCAL :")

		.addFields(
			{ name: "2.1・Le mieux pour tous se comprendre est de ne pas se couper la parole dans les salons vocaux.", value:" "},
			{ name: "2.2・Les sonbboards sont tolérés, tant que leur utilisation reste raisonnable.", value:" "},
			{ name: "2.3・La création de bruits potentiellement gênants, comme crier dans son micro, mâcher bruyamment ou faire saturer son micro est interdite.", value:" "},
			{ name: "2.4・Quitter ou rejoindre un salon vocal de façon répétitive sans raison VALABLE est interdit.", value:" "},
			{ name: "2.5・Il est interdit d'enregistrer toute conversation.", value:" "}
		)

		const importantEmbed = new EmbedBuilder()
		.setColor(0xE0CE00)
		.setTitle("❗️ 3・POINTS IMPORTANTS :")
		
		.addFields(
			{ name: "3.1・Le harcèlement, quel qu'il soit, est strictement interdit. Si du harcèlement est avéré, toute action prise en justice contre le harceleur sera soutenue par l'entièreté du staff de ce serveur.", value:" "},
			{ name: "3.2・La diffusion d'images ou de vidéos privées est strictement interdite. Comme pour le harcèlement, en cas de poursuite en justice, le staff donnera son soutient.", value:" "}
		)

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('rulesAccepted')
					.setLabel('Valider le réglement')
					.setStyle(ButtonStyle.Success)
			);
        
        target.send({embeds: [mainEmbed, textualEmbed, vocalEmbed, importantEmbed], components: [row]})
        await interaction.reply({content : `Règlement envoyée dans le salon <#${target.id}>`, ephemeral: true});
	},
};