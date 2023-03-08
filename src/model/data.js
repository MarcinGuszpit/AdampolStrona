const pages = [
    {
        id: 'pageSections',
        link: 'page-sections/list',
        menuTitle: 'Sekcje strony głównej',
        pageTitle: 'Administrator - sekcje strony głównej',
    },
    {
        id: 'html',
        link: 'html/list',
        menuTitle: 'HTML',
        pageTitle: 'Administrator - html',
    },
    {
        id: 'admin',
        link: 'admin/list',
        menuTitle: 'Administrator',
        pageTitle: 'Administrator - dane administratora',
    },
    {
        id: 'texts',
        link: 'texts/list',
        menuTitle: 'Teksty',
        pageTitle: 'Administrator - teksty',
    },
    {
        id: 'galleries',
        link: 'galleries/list',
        menuTitle: 'Galerie',
        pageTitle: 'Administrator - galerie',
    },
    {
        id: 'additional',
        link: 'additional-settings',
        menuTitle: 'Dodatkowe',
        pageTitle: 'Administrator - dodatkowe tablice',
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

module.exports = {
    pages,
    contentTypes,
    languages
};
