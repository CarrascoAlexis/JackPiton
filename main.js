const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./bot-data.json');
const fs = require('node:fs');
const path = require('node:path');

const log = require('./utilities').log
const logError = require('./utilities').logError

const { showChatHelp, showMusicHelp, showPlanningHelp } = require('./functions/helpDrawer')

const { startEventOrg } = require('./functions/eventsFunctions')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	log(`Logged in as '${c.user.tag}'`)
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		logError(`The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'button') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'I think you should,', components: [row] });
	}
    
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		logError(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		logError(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isButton()) return;
	if(interaction.customId == "rulesAccepted")
	{
		const checkedRole = interaction.guild.roles.cache.get("1074028595686686822");
		const member = interaction.member
		if(member._roles.includes(checkedRole.id))
		{
			log("User " + member.user.username + "#" + member.user.discriminator + " Reclick on rules checker button")
			interaction.reply({content: "Vous avez déjà validé le réglement", ephemeral: true})
		}
		else
		{
			log("User " + member.user.username + "#" + member.user.discriminator + " Has validated the rules checker")
			interaction.reply({content: "Vous avez validé le réglement", ephemeral: true})
			member.roles.add(checkedRole).catch(console.error);
		}
		
	}
	if(interaction.customId == "eventOrganizer")
	{
		startEventOrg(interaction)
		console.log()
	}
	//console.log(interaction);
});

client.on(Events.InteractionCreate, interaction => {
	if(!interaction.isStringSelectMenu()) return;

	if(interaction.customId == "helpselector")
	{
		if(interaction.values.includes("show_chat"))
		{
			showChatHelp(interaction)
			return;
		}
		if(interaction.values.includes("show_music"))
		{
			showMusicHelp(interaction)
			return;
		}
		if(interaction.values.includes("show_planning"))
		{
			showPlanningHelp(interaction)
			return;
		}
		return;
	}
})

// Log in to Discord with your client's token
client.login(token);