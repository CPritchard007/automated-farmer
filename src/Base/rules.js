module.exports.createRulesMessage = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;

    client.channels.fetch(json.rulesChat.id).then(channel => {
        channel.send({embeds: [{
            color: json.embed.color,
            title: "Server Rules",
            description: "1. do not bully or harass others\n2. do not share personal information (phone numbers, passwords, address, etc.)\n3. do not spam\n4. no blank nicknames\n5. no offensive nicknames\n7. no sexually explicit images",
        }]})
    })
}

module.exports.updateRulesMessage = () => {
    const client = require("../../runnable").client;
    const json = require("../../runnable").json;

    client.channels.fetch(json.rulesChat.id).then(channel => channel.messages.fetch(json.rulesChat.message).then(message => {
        message.edit({embeds: [{
            color: json.embed.color,
            title: "Server Rules",
            description: "1. do not bully or harass others\n2. do not share personal information (phone numbers, passwords, address, etc.)\n3. do not spam\n4. no blank nicknames\n5. no offensive nicknames\n7. no sexually explicit images",
        }]})
    }))
}