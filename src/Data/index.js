const NavbarMenu = 
    [
        {
            id: 1,
            name: 'Home',
            icon: 'fas fa-home',
            path: '/',
        },
        {
            id: 2,
            name: 'Member',
            icon: 'fas fa-users',
            path: '/users',
        },
        {
            id: 3,
            name: 'Games',
            icon: 'fas fa-gamepad',
            path: '/games',
        },
    ]

const gameData = 
    [
        {
            id: 'poker',
            name: 'Poker',
            iconImage: 'poker-cards.png',
        },
    ]

const pokerConfig = {
    navbar: [
        {
            link: 'home',
            icon: 'fas fa-home',
            block: true,
        },
        {
            link: 'gameplay',
            icon: 'fas fa-gamepad',
            block: false,
        },
        {
            link: 'history',
            icon: 'fas fa-history',
            block: true,
        },
        {
            link: 'member-config',
            icon: 'fas fa-users-cog',
            block: false,
        },
    ],
}

const getLocalStorage = (value) => {
    switch (value) {
        case 'member': return JSON.parse(localStorage.getItem('memberData')) || []
        case 'poker': return JSON.parse(localStorage.getItem('pokerData')) || []
        case 'now': return JSON.parse(localStorage.getItem('nowData')) || {}
        default: return [];
    }
}

const setLocalStorage = (input, value) => {
    switch (input) {
        case 'memberData': return localStorage.setItem('memberData', JSON.stringify(value))
        case 'pokerData': return localStorage.setItem('pokerData', JSON.stringify(value))
        case 'nowData': return localStorage.setItem('nowData', JSON.stringify(value))
        default: break;
    }
}
export { NavbarMenu, gameData, getLocalStorage, setLocalStorage, pokerConfig }