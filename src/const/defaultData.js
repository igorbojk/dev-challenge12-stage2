export const MARKERS = [
    {
        age: "2",
        animalBreed: "Australian Myst",
        animalType: "cat",
        color: "ohre",
        contactInfo: "0678554512\nІванов Іван",
        icon: {
            url: "icons/find_icon.png"
        },
        id: "_zr2nftt25",
        photoUrl: "http://murkote.com/wp-content/uploads/2015/06/australian-mist.jpg",
        position: {
            lat: 50.45804464740388,
            lng: 30.514451867675803
        },
        type: "find"
    },
    {
        age: '1',
        animalBreed: 'Alabay',
        animalType: "dog",
        color: "ohre",
        contactInfo: "0678554112\nАлексей",
        icon: {
            url: "icons/lost_icon.png"
        },
        id: "_08xnfvnm0",
        photoUrl: "https://kot-pes.com/wp-content/uploads/2015/04/Alabai-04-650x433.jpg",
        position: {
            lat: 50.45760749727376,
            lng: 30.478402978515646
        },
        type: "lost"
    },
    {
        age: "1",
        animalBreed: "Parrot Corella",
        animalType: "parrot",
        color: "green",
        contactInfo: "0955221212\nВасилиса",
        icon: {
            url: "icons/lost_icon.png"
        },
        id: "_2pv6u5prh",
        photoUrl: "http://zoovologda.ru/media/images/x3WUH7Yf6Hs.400x400.jpg",
        position: {
            lat: 50.45400085454712,
            lng: 30.497972375488303
        },
        type: "lost"
    },
    {
        age: "1",
        animalBreed: "Parrot Corella",
        animalType: "parrot",
        color: "green",
        contactInfo: "0678552212\nИван",
        icon: {
            url: "icons/find_icon.png"
        },
        id: "_uuizbxfan",
        photoUrl: "http://zoovologda.ru/media/images/x3WUH7Yf6Hs.400x400.jpg",
        position: {
            lat: 50.47858614659611,
            lng: 30.484239465332053
        },
        type: "find"
    },
    {
        age: "2",
        animalBreed: "Parrot Corella",
        animalType: "parrot",
        color: "black",
        contactInfo: "0685554121\nДмитрий",
        icon: {
            url: "icons/find_icon.png"
        },
        id: "_hvlytkh39",
        photoUrl: "http://popugairoma.umi.ru/images/cms/data/27.jpg",
        position: {
            lat: 50.4758550786822,
            lng: 30.49179256591799
        },
        type: "find"
    }
];

export const SETTINGS = {
    ANIMAL_TYPES: [
        {
            value: 'cat',
            text: 'Кіт/Кішка'
        },
        {
            value: 'dog',
            text: 'Собака'
        },
        {
            value: 'parrot',
            text: 'Папуга'
        },
    ],
    ANIMAL_BREEDS: {
        'cat': [
            {
                value: 'Australian Myst',
                text: 'Австралійський мист'
            },
            {
                value: 'British Shorthair',
                text: 'Британська короткошерста'
            },
            {
                value: 'Minskin',
                text: 'Мінскін'
            },
            {
                value: 'Scottish Fold',
                text: 'Скоттиш Фолд'
            },
            {
                value: 'Persian cat',
                text: 'Персидська'
            }
        ],
        'dog': [
            {
                value: 'Australian Shepherd',
                text: 'Австралійська вівчарка'
            },
            {
                value: 'Alabay',
                text: 'Алабай'
            },
            {
                value: 'Dalmatian',
                text: 'Далматин'
            },
            {
                value: 'Yorkshire Terrier\n',
                text: 'Йоркширський тер\'єр\n'
            },
            {
                value: 'St. Bernard',
                text: 'Сенбернар'
            },
        ],
        'parrot': [
            {
                value: 'Wavy Parrots',
                text: 'Хвилясті папуги'
            },
            {
                value: 'Parrot Corella',
                text: 'Папуга Корелла'
            },
            {
                value: 'Nerazluchniki',
                text: 'Нерозлучники'
            },
            {
                value: 'Ara',
                text: 'Ара'
            },
            {
                value: 'Cockatoo',
                text: 'Какаду'
            }
        ]

    },
    ANIMAL_COLORS: [
        {
            value: 'red',
            text: 'Червоний'
        },
        {
            value: 'black',
            text: 'Чорний'
        },
        {
            value: 'green',
            text: 'Зелений'
        },
        {
            value: 'ohre',
            text: 'Охра'
        }
    ],
    TRANSLATES: {
        MARKER_TYPES: {
            'find': 'Знайдено',
            'lost': 'Загублено'
        },
        ANIMAL_TYPES: {
            'cat': 'Кіт/Кішка',
            'dog': 'Собака',
            'parrot': 'Папуга',
        },
        BREEDS: {
            'dog': {
                'Australian Shepherd': 'Австралійська вівчарка',
                'Alabay': 'Алабай',
                'Dalmatian': 'Далматин',
                'Yorkshire Terrier\n': 'Йоркширський тер\'єр\n',
                'St. Bernard': 'Сенбернар'
            },
            'cat': {
                'Australian Myst': 'Австралійський мист',
                'British Shorthair': 'Британська короткошерста',
                'Minskin': 'Мінскін',
                'Scottish Fold': 'Скоттиш Фолд',
                'Persian cat': 'Персидська',
            },
            'parrot': {
                'Wavy Parrots': 'Хвилясті папуги',
                'Parrot Corella': 'Папуга Корелла',
                'Nerazluchniki': 'Нерозлучники',
                'Ara': 'Ара',
                'Cockatoo': 'Какаду'
            }
        },
        ANIMAL_COLORS: {
            'red': 'Червоний',
            'black': 'Чорний',
            'green': 'Зелений',
            'ohre': 'Охра'
        }
    }
};