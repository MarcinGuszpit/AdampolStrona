const data = require("./data");
const {getDataBase} = require('./../utils/database')

function saveText(text) {
    console.log(text);
    console.log('saving text');
    getDataBase().then((res) => {
        console.log(res);
    }).catch((error) => {
            console.log(error)
        }
    )
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