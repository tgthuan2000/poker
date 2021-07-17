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

const award = () => {
    
}

const initialMember = () => {
    return [
        {
            id: 3118410422,
            name: 'Trần Gia Thuận',
            color: 123,
        },
        {
            id: 3118410419,
            name: 'Hồ Thị Thơm',
            color: 123,
        },
        {
            id: 3118410400,
            name: 'Hồ Đức Thắng',
            color: 123,
        },
        
        {
            id: 3118410068,
            name: 'Hồ Sỹ Đạt',
            color: 123,
        },
        {
            id: 3118410412,
            name: 'Nguyễn Ngọc Thịnh',
            color: 123,
        },
        {
            id: 3118410420,
            name: 'Nguyễn Thị Thu',
            color: 123,
        },
    ]
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
export { award, initialMember, NavbarMenu, gameData, getLocalStorage, setLocalStorage, pokerConfig }