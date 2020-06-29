const Discord = require("discord.js")
const client = new Discord.Client()


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT * FROM call_lists', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})


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
	if (command === 'maddox') {
		msg.channel.send('Lost');
	} else if(command === 'call'){


		pool.connect((err, client, release) => {
		  if (err) {
		    return console.error('Error acquiring client', err.stack)
		  }
		  var query = 'SELECT * FROM call_lists WHERE guild= ' + server+' LIMIT 1';
		  console.log(query);
		  client.query(query, (err, result) => {
		    release()
		    if (err) {
		      return console.error('Error executing query', err.stack)
		    }
		    console.log(result.rows)
		  })
		})

	}
	// other commands...

})
client.login(process.env.BOT_TOKEN);
