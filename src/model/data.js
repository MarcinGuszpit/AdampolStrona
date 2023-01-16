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
        pageTitle: 'Administrator - ustawnienia',
        description: 'Dodatkowe ustawienia',
        contentType: 'text'
    },
    {
        id: 'txt',
        link: 'tekst',
        menuTitle: 'Teksty',
        pageTitle: 'Administrator - teksty',
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
        id: 'dodatkowe',
        link: 'dodatkowe',
        menuTitle: 'Dodatkowe',
        description: 'Różne, pozostałe ustawienia'
    },

]

const languages = [
    {
        id: 'pl',
        description: 'polski',
        caption: 'polski',
        flagImg: '/flags/pl_small.png'
    },
    {
        id: 'en',
        description: 'angielski',
        caption: 'english',
        flagImg: '/flags/uk_small.png'
    },
    {
        id: 'de',
        caption: 'deutch',
        description: 'niemiecki',
        flagImg: '/flags/de_small.png'
    },
    {
        id: 'ru',
        caption: 'русский',
        description: 'rosyjski',
        flagImg: '/flags/ru_small.png'
    },
];

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

const contentTypes = [
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
    contentTypes,
    languages,
    selectedPageId: 'ustawienia',
    document_title,
    user: {
        name: 'admin',
        id: '234567899'
    }
};
