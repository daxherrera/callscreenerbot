const Discord = require("discord.js")
const client = new Discord.Client()


var pg = require('pg');
var pool = new pg.Pool()

pool.connect(function(err, client, done) {
   client.query('SELECT * FROM your_table', function(err, result) {
      done();
      if(err) return console.error(err);
      console.log(result.rows);
   });
})

pool.end()


client.on("ready", () => {
  console.log('ne');
  console.log(`Logged in as ${client.user.tag}!`);

})



client.on("message", msg => {
	if (!msg.content.startsWith("!") || msg.author.bot) return;

	const args = msg.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();

	var server = msg.guild.id;
	console.log(server);
	if (command === 'ping') {
		msg.channel.send('Pong.');
	} else if (command === 'beep') {
		msg.channel.send('Boop.');
	} else if(command === 'call'){
	}
	// other commands...

})
client.login(process.env.BOT_TOKEN);
