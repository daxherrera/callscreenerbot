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

		  var server = 727072362750804048;
		  var query = `SELECT data FROM call_lists WHERE guild = ${server} LIMIT 1`;
		  console.log(query);
		  var call_list = '';
		  client.query(query, (err, result) => {
		    if (err) {
		      return console.error('Error executing query', err.stack)
		    }
		    call_list = result.rows[0];
		    console.log(call_list)
		    var new_call = {user: "test", message:"message"};
		    console.log(new_call);
		    if(!call_list)
		    	call_list = new Array(new_call);
		    else
		    	call_list.push(new_call);

		  })
		  
		  console.log(call_list)

		  client.query('INSERT INTO call_lists(guild, data) VALUES($1, $2)', [ 1234, 'asdfasdf' ] );
		  release()

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


	}
	// other commands...

})
client.login(process.env.BOT_TOKEN);
