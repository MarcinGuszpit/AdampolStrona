const data = require("../model/data");

function saveText(text) {
    console.log(text);
    console.log('saving text');
}

function getText(idText) {
    const text = data.texts.find((text) => {
        return (idText === text.id);
    })
    return text;
}

function getAllTexts() {
    return data.texts;
}

module.exports = {
    saveText,
    getText,
    getAllTexts
}