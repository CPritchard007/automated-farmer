module.exports.router = (message) => {
  let json = require("../../runnable").json;

  let channel = message.channel;
  let currentMessage = message.content;

  switch(channel.id) {
    case json.guiltygearRoomCodeChat.id:
        require("../GuiltyGear/base")(message);

      break;
    case json.terrariaServerStatusChat.id:
        require("../Terraria/base")(message);

      break;
  }
}