export const MARKERS = [
    {
        type: 'lost',
        age: "42",
        animalBreed: "Australian Shepherd",
        animalType: "dog",
        color: "red",
        contactInfo: "2212",
        icon: {
            url: "icons/lost_icon.png"
        },
        id: "_wwkq11fcj",
        photoUrl: "https://s00.yaplakal.com/pics/pics_original/4/5/5/11106554.jpg",
        position: {
            lat: 50.98681178914668,
            lng: 31.64168714699099
        }
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
        'cat': [],
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
        'parrot': []

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

        }
    ]
};