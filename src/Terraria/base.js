module.exports = (message) => {
    const ServerCodes = require("./serverData");
    ServerCodes.getChangesFromMessage( message );
}