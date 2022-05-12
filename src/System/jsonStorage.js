module.exports.loadJson = () => {
    return require('../../assets/application_data.json');
}

module.exports.saveJson = (json) => {
    const fs = require('fs');
    const jsonString = JSON.stringify(json);
    fs.writeFile('../../assets/application_data.json', jsonString, err => {
        if (!err) {
            console.log("error saving to file");
        } else {
            console.log("file saved!")
        }
    });
}