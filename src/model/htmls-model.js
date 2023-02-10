const data = require("./data");

function saveHTML(html) {
    console.log(html);
    console.log('saving HTML');
}

function addNewHTML(html) {
    console.log(html);
    console.log('adding new html');
}

function getHTML(idHTML) {
    const html = data.htmls.find((elem) => {
        return (idHTML === elem.id);
    })
    return html;
}

function getAll() {
    return data.htmls;
}

module.exports = {
    saveHTML,
    getHTML,
    getAll,
    addNewHTML
}