module.exports.addRoles = (reaction, user) => {
    let client = require("../../runnable").client;
    let json = require("../../runnable").json;

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
}

module.exports.removeRoles = (reaction, user) => {
    let client = require("../../runnable").client;
    let json = require("../../runnable").json;

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
        reaction.remove();
        break;
    }   
}

module.exports.updateRolesChat = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;
    const Icons = require("../Config").Icons;

    client.channels.fetch(json.rolesChat.id).then(channel => channel.messages.fetch(json.rolesChat.message).then(message => {
    message.edit({embeds : [{
        color: json.embed.color,
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


module.exports.createRoles = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;
    const Icons = require("../Config").Icons;
    
    client.channels.fetch(json.rolesChat.id).then(channel => {
        const message = channel.send({embeds : [{
          color: json.embed.color,
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