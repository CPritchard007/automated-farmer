module.exports = (message) => {
    const ServerCodes = require("./serverData");
    ServerCodes.updateServerData(message);
    ServerCodes.getChangesFromMessage(message)
}