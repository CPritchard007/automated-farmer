require("dotenv").config();
const json = require('./src/System/jsonStorage').loadJson();

const Rules = require("./src/Base/rules");
const Roles = require("./src/Base/roles");
const Terraria = require("./src/Terraria/serverData");
const Messages = require("./src/Base/messages");
const Welcome = require("./src/Base/welcome");
const Icons = require("./src/Config").Icons;

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

const { Client, Intents, Channel, Sticker } = require('discord.js');
const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MEMBERS
]});


String.prototype.override = function(){
  return this
  .replace("[fortnite]", Icons.fortnite)
  .replace("[warzone]", Icons.warzone)
  .replace("[guiltygear]", Icons.guiltyGear)
  .replace("[terminal]", Icons.terminal)
  .replace("[minecraft]", Icons.minecraft)
  .replace("[terraria]", Icons.terraria)
  .replace("[dbfz]", Icons.dragonball)
  .replace("[towerunite]", Icons.towerUnite)
  .replace("[apex]", Icons.apex)
  .replace("[overwatch]", Icons.overwatch)
}


module.exports.client = client;
module.exports.json = json;

client.on('ready', () => {
  Roles.updateRolesChat();
  Terraria.updateServerData();
  Rules.updateRulesMessage();


  setInterval(function () {
    console.log("server status has been updated")
  }, 15 * MINUTE)
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id != json.rolesChat.message) return;
  Roles.addRoles(reaction, user)
})

client.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id != json.rolesChat.message) return;
  Roles.removeRoles(reaction, user)
})

client.on("messageCreate", function(message){
  Messages.router(message);
});

client.on("guildMemberAdd", (user) => {
  console.log("new user " + user.displayName)
  Welcome.sendMessage(user)
})

client.login(process.env.DISCORD_TOKEN);
