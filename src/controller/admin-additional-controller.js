const {findInArray} = require("../utils/utils");
const data = require("../model/data");
const pagesAdditionalText = {
    subTitle: 'Dane administratora',
    description: 'Dane logowania dla administratora strony',
}

const page = findInArray('additional', 'id', data.pages);


function renderAdditionalSettings(req, res, next) {
    res.render('additional-settings.ejs', {
        page,
        subTitle: pagesAdditionalText.subTitle,
        description: pagesAdditionalText.description,
        pages: data.pages,
        user: data.user,
        contentTypes: data.contentTypes
    });
}

module.exports = {
    renderAdditionalSettings
}