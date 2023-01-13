const page_titles = ['Ustawienia', 'HTML', 'Galerie', 'Podstrony', 'Języki', 'Dodatkowe'];
const pageSections = [
    {
        id: 'ustawienia',
        link: 'ustawienia',
        menuTitle: 'Ustawienia',
        pageTitle: 'Administrator - ustawnienia',
        description: 'Dodatkowe ustawienia',
        contentType: 'text'
    },
    {
        id: 'html',
        link: 'html',
        menuTitle: 'HTML',
        menuTitle: 'Ustawienia',
        pageTitle: 'Administrator - ustawnienia',
        description: 'Dodatkowe ustawienia',
        contentType: 'text'
    },
    {
        id: 'galerie',
        link: 'galerie',
        menuTitle: 'Galerie',
        description: 'Galerie obrazów'
    },
    {
        id: 'jezyki',
        link: 'jezyki',
        menuTitle: 'Języki',
        description: 'Lista języków'
    },
    {
        id: 'dodatkowe',
        link: 'dodatkowe',
        menuTitle: 'Dodatkowe',
        description: 'Różne, pozostałe ustawienia'
    },

]

const mainPageSections = [
    {
        id: 'onas',
        linkHref: 'onas',
        menuTitle: 'O nas',
        pageTitle: 'Opis',
        contentType: 'text',
        contentId: 'xx22rryytt'
    },
]

const contentType = [
    {
        id: "text",
        name: 'tekst',
        description: "zawartość tekstowa"
    },
    {
        id: "gallery",
        name: "galeria obrazów",
        description: "galeria obrazów"
    },
    {
        id: "html-fragment",
        name: 'html',
        description: "kod HTML"
    }
]



const document_title = 'To jest testowa strona';

module.exports = {
    page_titles,
    pageSections,
    contentType,
    selectedPageId: 'ustawienia',
    document_title,
    user: {
        name: 'admin',
        id: '234567899'
    }
};
