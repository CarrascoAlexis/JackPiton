const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const row = new ActionRowBuilder()
.addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('helpselector')
        .setPlaceholder('Nothing selected')
        .addOptions(
            {
                label: '💬・Chat',
                description: 'Show help about inchat commands',
                value: 'show_chat',
            },
            {
                label: '🎶・Music',
                description: 'Show help about voice channel musics commands',
                value: 'show_music',
            },
            {
                label: '📅・Planning',
                description: 'Show help about planning options',
                value: 'show_planning'
            }
        ),
);

const mainHelpEmbed = new EmbedBuilder()
    .setColor(0xE0CE00)
    .setTitle("Aide")
    .setDescription("Choisissez la catégorie pour laquelle vous avez besoin d'aide")
    .addFields(
        { name: "💬・Chat", value: "Show help about inchat commands", inline: true },
        { name: "🎶・Music", value: "Show help about voice channel musics commands", inline: true },
        { name: "📅・Planning", value: "Show help about planning options", inline: true }
    )

const ChatHelpEmbed = new EmbedBuilder()
    .setColor(0xE0CE00)
    .setTitle("💬・Aide Chat")
    .setDescription("Liste des commandes de chat")

const MusicHelpEmbed = new EmbedBuilder()
    .setColor(0xE0CE00)
    .setTitle("🎶・Aide music")
    .setDescription("Liste des commandes musicales")

const PlanningHelpEmbed = new EmbedBuilder()
    .setColor(0xE0CE00)
    .setTitle("📅・Aide Planning")
    .setDescription("Liste des options de planning")

const showGlobalHelp = (interaction) =>
{
    interaction.reply({embeds: [mainHelpEmbed], components:[row], ephemeral: true})
}

const showChatHelp = (interaction) =>
{
    interaction.reply({embeds: [ChatHelpEmbed], components:[row], ephemeral: true})
}

const showMusicHelp = (interaction) =>
{
    interaction.reply({embeds: [MusicHelpEmbed], components:[row], ephemeral: true})
}

const showPlanningHelp = (interaction) =>
{
    interaction.reply({embeds: [PlanningHelpEmbed], components:[row], ephemeral: true})
}


module.exports.showChatHelp = showChatHelp
module.exports.showGlobalHelp = showGlobalHelp
module.exports.showMusicHelp = showMusicHelp
module.exports.showPlanningHelp = showPlanningHelp