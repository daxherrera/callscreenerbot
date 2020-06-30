const Discord = require("discord.js")
const client = new Discord.Client()


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.on("ready", () => {
  console.log('ne');
  console.log(`Logged in as ${client.user.tag}!`);

})



client.on("message", msg => {
	if (!msg.content.startsWith("!") || msg.author.bot) return;

	const args = msg.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();

	var server = msg.guild.id;
	if (command === 'maddox') {
		msg.channel.send('Lost');
	} else if(command === 'call'){

		var reason = args.join(" ");

		pool.connect((err, client, release) => {
		  if (err) {
		    return console.error('Error acquiring client', err.stack)
		  }

		  var query = `SELECT data FROM call_lists WHERE guild = ${server} LIMIT 1`;
		  var call_list = '';
		  client.query(query, (err, result) => {
		    if (err) {
		      return console.error('Error executing query', err.stack)
		    }
		    var new_call = {user_name: msg.author.username, user_id: msg.author.id, user_message : reason};
		    console.log(new_call);
		    if(!result.rows[0]){
		    	console.log('none found');
		    	call_list = [];
		    	call_list.push(new_call);
		    	console.log(call_list);
				const insertText = 'INSERT INTO call_lists(guild, data) VALUES($1, $2)';
				client.query(insertText, [ server, JSON.stringify(call_list)]);

		    }
		    else{
			    call_list = result.rows[0].data;
		    	console.log('found it');
		    	call_list.push(new_call);
				console.log(call_list)  

				const insertText = 'UPDATE call_lists SET data = $2 WHERE guild=$1';
				client.query(insertText, [ server, JSON.stringify(call_list)]);

		    }


		  }) 
		  
		  release() 

		}) 

	}
	// other commands...

})
client.login(process.env.BOT_TOKEN);
