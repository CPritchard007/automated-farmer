module.exports = (message) => {
    const ServerCodes = require("./serverData");
    ServerCodes.updateServerData(message);
}