const page_titles = ['Ustawienia', 'HTML', 'Galerie', 'Podstrony', 'Języki', 'Dodatkowe'];
const pages = [
    {
        id: 'ustawienia',
        link: 'settings',
        menuTitle: 'Ustawienia',
        pageTitle: 'Administrator - ustawnienia',
        subTitle: 'Dodatkowe ustawienia aplikacji',
        description: 'Inne ustawienia aplikacji, które możesz zmieniać'
    },
    {
        id: 'pageSections',
        link: 'page-sections/list',
        menuTitle: 'Sekcje strony głównej',
        pageTitle: 'Administrator - sekcje strony głównej',
        description: 'Lista wszystkich sekcji strony głównej',
        subTitle: 'Sekcje strony głównej'
    },
    {
        id: 'html',
        link: 'html/list',
        menuTitle: 'HTML',
        pageTitle: 'Administrator - html',
        subTitle: 'Fragmenty kodu HTML',
        description: 'Fragmenty kodu HTML. który możesz wykorzystać w swojej aplikacji',

    },
    {
        id: 'texts',
        link: 'texts/list',
        menuTitle: 'Teksty',
        pageTitle: 'Administrator - teksty',
        subTitle: 'Zawartość tekstowa',
        description: 'Zawartość tekstowa, którą możesz wypełnić swoją stronę.',
    },
    {
        id: 'galleries',
        link: 'galleries/list',
        menuTitle: 'Galerie',
        pageTitle: 'Administrator - galerie',
        subTitle: 'Galerie obrazów',
        description: 'Galerie obrazów do wykorzystania na stronie'
    },
    {
        id: 'additional',
        link: 'additional-settings',
        menuTitle: 'Dodatkowe',
        pageTitle: 'Administrator - dodatkowe tablice',
        subTitle: 'Dodatkowe tabele używane w aplikacji',
        description: 'Tutaj inne tabele, z których korzysta aplikacja'
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
    pages,
    contentTypes,
    languages,
    selectedPageId: 'ustawienia',
    document_title,
    user: {
        name: 'admin',
        id: '234567899'
    }
};
