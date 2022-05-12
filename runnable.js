require("dotenv").config();
const json = require("./assets/application_data.json");

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

const { Client, Intents, Channel } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES]});

const fortnite = "<:fortnite:972361977089380392>";
const warzone = "<:warzone:972361976858681365>";
const guiltyGear = "<:guiltygear:972361978809053205>";
const terminal = "<:terminal:972361976623804418>";
const minecraft = "<:minecraft:972378490609487912>";
const terraria = "<:terraria:972361979383664700>";
const dragonball = "<:dragonball:973345410959695914>";
const towerUnite = "<:towerunite:973358803993133088>";
const overwatch = "<:overwatch:973357545852895283>";
const apex = "<:apex:973358821886021642>";

String.prototype.override = function(){
  return this
  .replace("[fortnite]", fortnite)
  .replace("[warzone]", warzone)
  .replace("[guiltygear]", guiltyGear)
  .replace("[terminal]", terminal)
  .replace("[minecraft]", minecraft)
  .replace("[terraria]", terraria)
  .replace("[dbfz]", dragonball)
  .replace("[towerunite]", towerUnite)
  .replace("[apex]", apex)
  .replace("[overwatch]", overwatch)
}

client.on('ready', () => {
  updteCurrentRoleChat();
  updateTerrariaServerMessage()
  setInterval(function () {
    console.log("server status has been updated")
  }, 15 * MINUTE)
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id != json.rolesChat.message) return;
  let guild = client.guilds.cache.get(json.guild.id);
  let member = guild.members.cache.get(user.id);

  switch (reaction.emoji.name) {
    case "fortnite":
      member.roles.add(guild.roles.cache.find(role => role.name === "Fortnite"));
      break;
    case "warzone":
      member.roles.add(guild.roles.cache.find(role => role.name === "Warzone"));
      break;
    case "guiltygear":
      member.roles.add(guild.roles.cache.find(role => role.name === "Guilty Gear"));
      break;
    case "minecraft":
      member.roles.add(guild.roles.cache.find(role => role.name === "Minecraft"));
      break;
    case "terminal":
      member.roles.add(guild.roles.cache.find(role => role.name === "Developers"));
      break;
    case "dragonball":
      member.roles.add(guild.roles.cache.find(role => role.name === "DBFZ"));
      break;
    case "towerunite":
      member.roles.add(guild.roles.cache.find(role => role.name === "Tower Unite"));
      break;
    case "overwatch":
      member.roles.add(guild.roles.cache.find(role => role.name === "Overwatch"));
      break;
    case "apex":
      member.roles.add(guild.roles.cache.find(role => role.name === "Apex Legends"));
      break;
    default:
      reaction.remove();
      break;
  }
})

client.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id != json.rolesChat.message) return;
  let guild = client.guilds.cache.get(json.guild.id);
  let member = guild.members.cache.get(user.id);
  
  switch (reaction.emoji.name) {
    case "fortnite":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Fortnite"));
      break;
    case "warzone":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Warzone"));
      break;
    case "guiltygear":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Guilty Gear"));
      break;
    case "minecraft":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Minecraft"));
      break;
    case "terminal":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Developers"));
      break;
    case "dragonball":
      member.roles.remove(guild.roles.cache.find(role => role.name === "DBFZ"));
      break;
    case "towerunite":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Tower Unite"));
      break;
    case "overwatch":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Overwatch"));
      break;
    case "apex":
      member.roles.remove(guild.roles.cache.find(role => role.name === "Apex Legends"));
      break;
    default:
      break;
  }
})

client.on("messageCreate", function(message){
  let channel = message.channel;
  let currentMessage = message.content;

  switch(channel.id) {
    case json.guiltygearRoomCodeChat.id:
      let roomCode = currentMessage.match(/\b(\w[a-zA-Z0-9]{3})\b|\n/);
      channel.messages.fetch(json.guiltygearRoomCodeChat.message).then(
        message => message.edit({embeds : [{
          color: 0x0099ff,
          title: "Current Room Code",
          description: "enter the code into the chat to automatically set the code below",
      
          fields: [
            {
              "name": "\u200b",
              "value": "current code:\u2001" + "` " + roomCode[0] + " `",
              "inline": false
            }
          ],
        }]}))

      message.delete();
      break;
    case json.terrariaServerStatusChat.id:
      channel.messages.fetch(json.terrariaServerStatusChat.message).then(serverStatusMessage => {
        
      })
      
      break;
  }
});


function addInitialRoleChat () {
  client.channels.fetch(json.rolesChat.id).then(channel => {
    const message = channel.send({embeds : [{
      color: 0x0099ff,
      title: json.embed.title,
      description: json.embed.description,
      thumbnail: {
        url: json.embed.thumbnail,
      },
      fields: json.embed.fields.map(field => {
        return {
          name: field.name.override(),
          value: field.value.override(),
          inline: field.inline
        }
      }),
    }]})
      message.react(fortnite)
      message.react(warzone)
      message.react(guiltyGear)
      message.react(minecraft)
      message.react(dragonball)
      message.react(towerUnite)
      message.react(overwatch)
      message.react(apex)
      message.react(terminal)
 });
}

function updteCurrentRoleChat () {
  client.channels.fetch(json.rolesChat.id)
  .then(channel => channel.messages.fetch(json.rolesChat.message).then(message => {
    message.edit({embeds : [{
        color: 0x0099ff,
        title: json.embed.title,
        description: json.embed.description,
        thumbnail: {
          url: json.embed.thumbnail,
        },
        fields: json.embed.fields.map(field => {
          return {
            name: field.name.override(),
            value: field.value.override(),
            inline: field.inline
          }
        }),
      }]});
      message.react(fortnite)
      message.react(warzone)
      message.react(guiltyGear)
      message.react(minecraft)
      message.react(dragonball)
      message.react(towerUnite)
      message.react(overwatch)
      message.react(apex)
      message.react(terminal)
  }));
}

function createRoomCodeMessage () {
  client.channels.fetch(json.guiltygearRoomCodeChat.id).then(channel => channel.send({embeds : [{
    color: 0x0099ff,
    title: "Current Room Code",
    description: "enter the code into the chat to automatically set the code below",

    fields: [
      {
        "name": "\u200b",
        "value": "current code:\u2001" + "`N/A`",
        "inline": false
      }
    ],
  }]}))
}

function createTerrariaServerMessage () {
  client.channels.fetch(json.terrariaServerStatusChat.id).then(channel => 
    channel.send({embeds: [{
      color: 0x0099ff,
      title: json.terrariaServerDialog.header,
      author: {
        name: 'impatientcow915',
        icon_url: 'https://i.imgur.com/OmwglG9.png',
        url: 'https://github.com/CPritchard007',
      },
      
      fields: [
        {
          name: "\u200b",
          value: "Server IP: `" + json.terrariaServerDialog.ip + "`" + 
          "\nPort: `" + json.terrariaServerDialog.port + "`" +
          "\nPassword: `" + json.terrariaServerDialog.password + "`",
          inline: false
        },{
          name: "\u200b",
          value: json.terrariaServerDialog.comment,
          inline: false
        },
      ],
      timestamp: "05/11/22",

      
    }]}))
  
}

function updateTerrariaServerMessage () {
  client.channels.fetch(json.terrariaServerStatusChat.id).then(channel => channel.messages.fetch(json.terrariaServerStatusChat.message).then(message => message.edit({embeds: [{
      color: 0x0099ff,
      title: json.terrariaServerDialog.header,
      author: {
        name: 'impatientcow915',
        icon_url: 'https://i.imgur.com/OmwglG9.png',
        url: 'https://github.com/CPritchard007',
      },
      
      fields: [
        {
          name: "\u200b",
          value: "Server IP: `" + json.terrariaServerDialog.ip + "`" + 
          "\nPort: `" + json.terrariaServerDialog.port + "`" +
          "\nPassword: `" + json.terrariaServerDialog.password + "`",
          inline: false
        },{
          name: "\u200b",
          value: json.terrariaServerDialog.comment,
          inline: false
        },
      ],
      timestamp: "05/11/22",

    }]})))
}


client.login(process.env.DISCORD_TOKEN);
