module.exports.router = (message) => {
  let json = require("../../runnable").json;

  let channel = message.channel;
  let currentMessage = message.content;

  switch(channel.id) {
    case json.GuiltyGear.roomCode.id:
        require("../GuiltyGear/base")(message);
      break;
    case json.Terraria.serverStatus.id:
        require("../Terraria/base")(message);
      break;
  }
}