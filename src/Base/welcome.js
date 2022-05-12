module.exports.sendMessage = (user) => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;
    const Icons = require("../Config").Icons;

    client.channels.fetch(json.welcomeChat.id).then(channel => channel.send({content: json.welcomeChat.serverMessage.replace("[user]", "<@" + user.id + ">")}))
}