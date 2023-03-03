const {getAdminData, saveAdminData} = require("../model/admin-model");
const {getAllTexts} = require("../model/texts-model");
const data = require("../model/data");
const {findPage} = require("../utils/utils");

const objFields = ['_id', 'name', 'email', 'password'];

const pagesAdditionalText = {
    LIST: {
        subTitle: 'Dane administratora',
        description: 'Dane logowania dla administratora strony',
    },
    EDIT: {
        subTitle: 'Edytuj dane administratora',
        description: 'Edycja danych logowania',
    }
}

const page = findPage('admin');

function showAdminSettings(req, res, next) {
    getAdminData().then((results) => {
        res.render('admin-settings/admin-list.ejs', {
            page,
            subTitle: pagesAdditionalText.LIST.subTitle,
            description: pagesAdditionalText.LIST.description,
            pages: data.pages,
            user: data.user,
            data: results
        });
    }).catch(() => {
        res.render('error-custom-msg.ejs', {
            error: null,
            title: 'Nie udało się pobrać listy elementów!',
            info: 'Wystąpił błąd dostępu do bazy danych!'
        });
    });
}

function editAdminSettings(req, res, next) {
    res.send('Edycja admin');
}

module.exports = {
    showAdminSettings,
    editAdminSettings
}