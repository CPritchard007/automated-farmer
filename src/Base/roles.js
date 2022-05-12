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

function addRoles (user, reaction) {
    const client = require("../../runnable").client
    const json = require("../../runnable").json

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

function removeRoles (user, reaction) {
    const client = require("../../runnable").client
    const json = require("../../runnable").json

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

function updateRolesChat () {
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

module.exports = { 
    addRoles,removeRoles,updateRolesChat
}