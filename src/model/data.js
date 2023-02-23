const page_titles = ['Ustawienia', 'HTML', 'Galerie', 'Podstrony', 'Języki', 'Dodatkowe'];
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

const texts = [
    {
        id: '1',
        description: '1-szy tekst',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, at deserunt doloribus dolorum et' +
            ' exercitationem expedita facere illo illum impedit labore molestias natus non optio' +
            ' possimus quos sequi ullam unde'
    },
    {
        id: '2',
        description: 'Drugi tekst',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, at deserunt doloribus dolorum et' +
            ' exercitationem expedita facere illo illum impedit labore molestias natus non optio' +
            ' possimus quos sequi ullam unde'
    },
    {
        id: '3',
        description: 'Tekst 3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, at deserunt doloribus dolorum et' +
            ' exercitationem expedita facere illo illum impedit labore molestias natus non optio' +
            ' possimus quos sequi ullam unde'
    },

];

const htmls = [
    {
        id: '1',
        description: 'fragment HTML',
        html: '<p>Hello world!</p>'
    },
    {
        id: '2',
        description: 'drugi fragment HTML',
        html: '<p>Lorem ipsum</p>'
    },
    {
        id: '3',
        description: '3 frag. HTML',
        html:
            `<div>
                <ul>
                    <li>el.listy 1</li>
                    <li>el.listy 2</li>
                    <li>el.listy 3</li>
                    <li>el.listy 4</li>
                </ul>
            </div>`
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
    texts,
    htmls,
    selectedPageId: 'ustawienia',
    document_title,
    user: {
        name: 'admin',
        id: '234567899'
    }
};
