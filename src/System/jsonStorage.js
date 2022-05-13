module.exports.loadJson = () => {
    return require('../../assets/application_data.json');
}

module.exports.saveJson = (json) => {
    const fs = require('fs');
    const jsonString = JSON.stringify(json);
    fs.writeFile('assets/application_data.json', jsonString, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}