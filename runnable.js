require("dotenv").config();
const json = require("./assets/application_data.json");

const Roles = require("./src/Base/roles");
const Icons = require("./src/Config").Icons;

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

const { Client, Intents, Channel } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES]});



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
  updteCurrentRoleChat();
  updateTerrariaServerMessage()
  setInterval(function () {
    console.log("server status has been updated")
  }, 15 * MINUTE)
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id != json.rolesChat.message) return;
  Roles.addRoles (reaction, user)
})

client.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id != json.rolesChat.message) return;
  Roles.removeRoles (reaction, user)
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
      message.react(Icons.fortnite)
      message.react(Icons.warzone)
      message.react(Icons.guiltyGear)
      message.react(Icons.minecraft)
      message.react(Icons.dragonball)
      message.react(Icons.towerUnite)
      message.react(Icons.overwatch)
      message.react(Icons.apex)
      message.react(Icons.terminal)
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
      message.react(Icons.fortnite)
      message.react(Icons.warzone)
      message.react(Icons.guiltyGear)
      message.react(Icons.minecraft)
      message.react(Icons.dragonball)
      message.react(Icons.towerUnite)
      message.react(Icons.overwatch)
      message.react(Icons.apex)
      message.react(Icons.terminal)
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
