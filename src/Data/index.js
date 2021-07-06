const NavbarMenu = 
    [
        {
            id: 1,
            name: 'Home',
            icon: 'fas fa-home',
            path: '/',
            active: true,
        },
        {
            id: 2,
            name: 'Member',
            icon: 'fas fa-users',
            path: '/users',
            active: false,
        },
        {
            id: 3,
            name: 'Games',
            icon: 'fas fa-gamepad',
            path: '/games',
            active: false,
        },
    ]

const gameData = 
    [
        {
            id: 1,
            name: 'Poker',
            iconImage: 'poker-cards.png',
        },
    ]
export { NavbarMenu, gameData }