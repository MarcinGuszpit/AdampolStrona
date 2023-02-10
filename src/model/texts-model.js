const data = require("./data");

function saveText(text) {
    console.log(text);
    console.log('saving text');
}

function addNewText(text) {
    console.log(text);
    console.log('adding new text');
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
    getAllTexts,
    addNewText
}