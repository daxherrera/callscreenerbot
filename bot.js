const Discord = require("discord.js")
const client = new Discord.Client()

import time from time;

class Caller:
  def __init__(self, name, topic):
    self.name = name
    self.topic = age
    self.time = time.time()


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
  if (msg.content === "maddox") {
    msg.reply("Lost!")
  }
  if (msg.content === "!call ") {
    print time.time()
    
  }

})
client.login(process.env.BOT_TOKEN);
