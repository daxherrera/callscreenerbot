const Discord = require("discord.js")
const client = new Discord.Client()


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

    try {
      console.log(pool);
      const client = pool.connect();
      console.log(client);
      const result = client.query('SELECT * FROM call_lists');
      const results = { 'results': (result) ? result.rows : null};
      client.release();
    } catch (err) {
      console.error(err);
    }


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
