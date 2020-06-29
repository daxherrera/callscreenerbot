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
		    console.log(result.rows);
		    console.log(call_list)
		    var new_call = {user: "test", message:"message"};
		    console.log(new_call);
		    if(!call_list){
		    	console.log('none found');
		    	call_list = [];
		    	call_list.push(new_call);
		    	console.log(call_list);

		    }
		    else{
		    	console.log('found it');
		    	console.log(call_list.data);
		    	call_list.push(new_call);
		    }

			console.log(call_list)  

			const insertText = 'INSERT INTO call_lists(guild, data) VALUES($1, $2)';
			client.query(insertText, [ server, JSON.stringify(call_list)]);

		  }) 
		  
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
