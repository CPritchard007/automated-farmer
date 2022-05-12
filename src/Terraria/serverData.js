module.exports.updateServerData = (message) => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;

    client.channels.fetch(json.terrariaServerStatusChat.id).then(channel => channel.messages.fetch(json.terrariaServerStatusChat.message).then(message => message.edit({embeds: [{
        color: json.embed.color,
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

module.exports.createServerData = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;

    client.channels.fetch(json.terrariaServerStatusChat.id).then(channel => 
        channel.send({embeds: [{
          color: json.embed.color,
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