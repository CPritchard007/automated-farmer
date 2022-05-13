module.exports.updateCode = (message) => {
    let json = require("../../runnable").json;
    let jsonStorage = require("../System/jsonStorage");
    let roomCode = message.content.match(/\b(\w[a-zA-Z0-9]{3})\b|\n/);
    if (roomCode == null) return;
    
    json.GuiltyGear.roomCode.messageData = roomCode[0];

    message.channel.messages.fetch(json.GuiltyGear.roomCode.message).then (
        message => message.edit({embeds : [{
          color: 0x0099ff,
          title: "Current Room Code",
          description: "enter the code into the chat to automatically set the code below",
        
          fields: [{
              "name": "\u200b",
              "value": "current code:\u2001" + "` " + json.GuiltyGear.roomCode.messageData + " `",
              "inline": false
            }]
        }
    ]}))
   

    message.delete();
    jsonStorage.saveJson(json);
}

module.exports.createRoomCode = () => {
    const client = require("../../runnable").client
    const json = require("../../runnable").json;

    client.channels.fetch(json.GuiltyGear.roomCode.id).then(channel => channel.send({embeds : [{
        color: json.embed.color,
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