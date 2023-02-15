const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get informations about user')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('User to get informations')
            .setRequired(false)),
    async execute(interaction) {
        target = interaction.options.getUser('target')
        if(target === null) target = interaction.user
        const targetUser = interaction.options.getUser('target') == null?
        interaction.guild.members.cache.get(interaction.user.id) : interaction.guild.members.cache.get(target.id)
        const avatarUrl = "https://cdn.discordapp.com/avatars/"+target.id+"/"+target.avatar+".jpeg"
        const accentColor = target.accentColor === undefined ? 0xE0CE00 : target.accentColor

        const userEmbed = new EmbedBuilder()
            .setColor(accentColor)
            .setTitle(`${target.username}#${target.discriminator}`)
            .setDescription("User informations")
            .addFields(
                { name: "A rejoint", value: new Date(targetUser.joinedTimestamp).toLocaleDateString(), inline: true },
                { name: "Compte crée", value: new Date(target.createdAt).toLocaleDateString(), inline: true}
            )
        
        interaction.reply({embeds:[userEmbed]})
        console.log(targetUser.user.createdAt)
        console.log(new Date(targetUser.user.id).toLocaleDateString())
    }
}