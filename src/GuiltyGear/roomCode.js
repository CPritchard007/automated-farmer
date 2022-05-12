module.exports.updateCode = (message) => {
    let json = require("../../runnable").json;
    let roomCode = message.content.match(/\b(\w[a-zA-Z0-9]{3})\b|\n/);

    message.channel.messages.fetch(json.guiltygearRoomCodeChat.message).then (
        message => message.edit({embeds : [{
          color: 0x0099ff,
          title: "Current Room Code",
          description: "enter the code into the chat to automatically set the code below",
        
          fields: [{
              "name": "\u200b",
              "value": "current code:\u2001" + "` " + roomCode[0] + " `",
              "inline": false
            }]
        }
    ]}))

    message.delete();
}

module.exports.createRoomCode = () => {
    const client = require("../../runnable").client
    const json = require("../../runnable").json;

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