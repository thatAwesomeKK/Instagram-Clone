import { USERS } from "./users";

export const POSTS = [
    {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/storageforweb/image/upload/v1649611534/Home%20Slider/breakingbad3_lxff6b.jpg',
        user: USERS[0].user,
        likes: 1234,
        caption: 'Train Ride to Hogwarts',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'Elon Musk',
                comment: 'Gr8'
            },
            {
                user: 'Gamora',
                comment: 'Thik Hai'
            }
        ]
    },
    {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/storageforweb/image/upload/v1649663497/Stills/armyofthieves3_zhdk0b.jpg',
        user: USERS[1].user,
        likes: 4000,
        caption: 'Army of Thieves',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'Elon Musk',
                comment: 'Gr8'
            },
            {
                user: 'Gamora',
                comment: 'Thik Hai'
            }
        ]
    }
]