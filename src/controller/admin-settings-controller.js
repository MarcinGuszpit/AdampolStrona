const {getAdminData, saveAdminData, getBasicAdminData} = require("../model/admin-model");
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
    getBasicAdminData().then((results) => {
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

function render(req, res, next, appState, titles, saveMethod) {
    const {_id} = {...req.params};
    getBasicAdminData().then((result) => {
        if (req.method === 'GET') {
           res.render('admin-settings/admin-edit.ejs',{

           });
        }
        if (req.method === 'POST') {

        }
    });
}

module.exports = {
    showAdminSettings,
    editAdminSettings
}