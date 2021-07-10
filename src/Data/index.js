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

const getLocalStorage = (value) => {
    switch (value) {
        case 'member': return JSON.parse(localStorage.getItem('memberData')) || []
        case 'poker': return JSON.parse(localStorage.getItem('pokerData')) || []
        default: return [];
    }
}

const setLocalStorage = (input, value) => {
    switch (input) {
        case 'memberData': return localStorage.setItem('memberData', JSON.stringify(value))
        case 'pokerData': return localStorage.setItem('pokerData', JSON.stringify(value))
        default: break;
    }
}
export { NavbarMenu, gameData, getLocalStorage, setLocalStorage }