module.exports = (message) => {
    const RoomCode = require("./roomCode");
    RoomCode.updateCode(message);
}