module.exports.updateServerData = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;

    client.channels.fetch(json.Terraria.serverStatus.id).then(channel => channel.messages.fetch(json.Terraria.serverStatus.message).then(message => message.edit({embeds: [{
        color: json.embed.color,
        title: json.Terraria.serverStatus.dialog.header,
        author: {
          name: 'impatientcow915',
          icon_url: 'https://i.imgur.com/OmwglG9.png',
          url: 'https://github.com/CPritchard007',
        },
        
        fields: [
          {
            name: "\u200b",
            value: "Server IP: `" + json.Terraria.serverStatus.dialog.ip + "`" + 
            "\nPort: `" + json.Terraria.serverStatus.dialog.port + "`" +
            "\nPassword: `" + json.Terraria.serverStatus.dialog.password + "`",
            inline: false
          },{
            name: "\u200b",
            value: json.Terraria.serverStatus.dialog.comment,
            inline: false
          },
        ],
        timestamp: "05/11/22",
    }]})))
}

module.exports.createServerData = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;

    client.channels.fetch(json.Terraria.serverStatus.id).then(channel => 
        channel.send({embeds: [{
          color: json.embed.color,
          title: json.Terraria.serverStatus.dialog.header,
          author: {
            name: 'impatientcow915',
            icon_url: 'https://i.imgur.com/OmwglG9.png',
            url: 'https://github.com/CPritchard007',
          },
          
          fields: [
            {
              name: "\u200b",
              value: "Server IP: ` " + json.Terraria.serverStatus.dialog.ip + " `" + 
              "\nPort: ` " + json.Terraria.serverStatus.dialog.port + " `" +
              "\nPassword: ` " + json.Terraria.serverStatus.dialog.password + " `",
              inline: false
            },{
              name: "\u200b",
              value: json.Terraria.serverStatus.dialog.comment,
              inline: false
            },
          ],
          timestamp: json.Terraria.serverStatus.dialog.updated,   
    }]}))
}

module.exports.getChangesFromMessage = (message) => {
  const client = require("../../runnable").client;
  const json = require("../../runnable").json;
  const jsonStorage = require("../System/jsonStorage");

  if (message.author.id !== process.env.AUTHOR_ID) {
    console.log(message.author.id + "\n" + process.env.AUTHOR_ID);
    console.log("not the author");
    message.delete();
    return;
  };
  const content = message.content.split(" ");
  const leading = content[0];
  const value = content[1];
  const date = new Date();
  console.log(leading, value)

  switch (leading) {
    case "ip":
    case "url":
      console.log("updating IP")
      json.Terraria.serverStatus.dialog.ip = value;
      json.Terraria.serverStatus.dialog.updated = date.toString();
    break;
    case "port":
    case ":":
      console.log("updating port")
      json.Terraria.serverStatus.dialog.port = value;
      json.Terraria.serverStatus.dialog.updated = date.toString();
    break;
    case "password":
    case "pass":
    case "p":
      console.log("updating password")
      json.Terraria.serverStatus.dialog.password = value;
      json.Terraria.serverStatus.dialog.updated = date.toString();
    break;
    case "comment":
      json.Terraria.serverStatus.dialog.comment = value;
      json.Terraria.serverStatus.dialog.updated = date.toString();
    default:
      break;
  }

  client.channels.fetch(json.Terraria.serverStatus.id).then(channel => channel.messages.fetch(json.Terraria.serverStatus.message).then(message => {
    message.edit({embeds: [{
      color: json.embed.color,
      title: json.Terraria.serverStatus.dialog.header,
      author: {
        name: 'impatientcow915',
        icon_url: 'https://i.imgur.com/OmwglG9.png',
        url: 'https://github.com/CPritchard007',
      },
      
      fields: [
        {
          name: "\u200b",
          value: "Server IP: ` " + json.Terraria.serverStatus.dialog.ip + " `" + 
          "\nPort: ` " + json.Terraria.serverStatus.dialog.port + " `" +
          "\nPassword: ` " + json.Terraria.serverStatus.dialog.password + " `",
          inline: false
        },{
          name: "\u200b",
          value: json.Terraria.serverStatus.dialog.comment,
          inline: false
        },
      ],
      timestamp: json.Terraria.serverStatus.dialog.updated,   
  }]})}))

  jsonStorage.saveJson(json);
  message.delete();
}