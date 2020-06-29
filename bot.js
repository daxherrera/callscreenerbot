const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  console.log(bot.guilds);
})

client.on("message", msg => {
	if (!msg.content.startsWith("!") || msg.author.bot) return;

	const args = msg.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		msg.channel.send('Pong.');
	} else if (command === 'beep') {
		msg.channel.send('Boop.');
	}
	// other commands...

})
client.login(process.env.BOT_TOKEN);
