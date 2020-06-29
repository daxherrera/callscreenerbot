const Discord = require("discord.js")
const client = new Discord.Client()


const { Pool } = require('pg');
var pg = require('pg');
console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

	    try {
			pool.connect(process.env.DATABASE_URL, function(err, client, done) {
			  client.query('SELECT * FROM call_lists', function(err, result) {
			    done();
			    if(err) return console.error(err);
			    console.log(result.rows);
			  });
			});
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
	    try {
			pool.connect(process.env.DATABASE_URL, function(err, client, done) {
			  client.query('SELECT * FROM call_lists', function(err, result) {
			    done();
			    if(err) return console.error(err);
			    console.log(result.rows);
			  });
			});
	    } catch (err) {
	      console.error(err);
	    }

	}
	// other commands...

})
client.login(process.env.BOT_TOKEN);
