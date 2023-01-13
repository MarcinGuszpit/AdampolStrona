const page_titles = ['Ustawienia', 'HTML', 'Galerie', 'Podstrony', 'Języki', 'Dodatkowe'];
const pageSections = [
    {
        id: 'ustawienia',
        link: 'ustawienia',
        menuTitle: 'Ustawienia',
        pageTitle: 'Administrator - ustawnienia',
        description: 'Dodatkowe ustawienia'
    },
    {
        id: 'html',
        link: 'html',
        menuTitle: 'HTML',
        description: 'Fragmenty HTML'
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
const document_title = 'To jest testowa strona';

module.exports = {
    page_titles,
    pageSections,
    selectedPageId: 'ustawienia',
    document_title,
    user: {
        name: 'admin',
        id: '234567899'
    }
};
