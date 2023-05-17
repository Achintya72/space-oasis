import { createContext, useState } from "react";

const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
    const [auth, changeAuth] = useState(false);
    const [user, changeUser] = useState({
        name: "John Doe",
        email: "john_doe@gmail.com",
        phone: "012-345-6789",
        miles: 150000000,
        bday: "07/02/2007",
        img: "EmilyJones.jpg",
        bookings: [{
            type: "Mars Exploration",
            departure: new Date("2024-12-17T03:24:00"),
            arrival: new Date("2025-12-17T03:24:00"),
            meal: "Vegetarian",
            passengers: 3,
            img: "Mars.png"
        }],
        training: {
            current: 0,
            lessons: [
                {
                    lesson_outline: ["Landing Procedure Presentation", "Landing Procedure Demonstration", "Q&A Session", "Written Test"],
                    date: new Date("2023-02-21T03:24:00"),
                    name: "Lesson 1"
                },
                {
                    lesson_outline: ["Landing Procedure Presentation", "Landing Procedure Demonstration", "Q&A Session", "Written Test"],
                    date: new Date("2023-02-21T03:24:00"),
                    name: "Lesson 2"
                },
                {
                    lesson_outline: ["Landing Procedure Presentation", "Landing Procedure Demonstration", "Q&A Session", "Written Test"],
                    date: null,
                    name: "Lesson 3"
                },
                {
                    lesson_outline: ["Landing Procedure Presentation", "Landing Procedure Demonstration", "Q&A Session", "Written Test"],
                    date: null,
                    name: "Lesson 4"
                },
                {
                    lesson_outline: ["Landing Procedure Presentation", "Landing Procedure Demonstration", "Q&A Session", "Written Test"],
                    date: null,
                    name: "Lesson 5"
                },
                {
                    lesson_outline: ["Landing Procedure Presentation", "Landing Procedure Demonstration", "Q&A Session", "Written Test"],
                    date: null,
                    name: "Lesson 6"
                }
            ]
        }
    });

    const values = {
        user,
        auth,
        changeAuth,
        changeUser
    }
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
};