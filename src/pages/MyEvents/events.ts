import {IMyEvent} from "../../types/events";

export const myEventsList: Array<IMyEvent> = [
    {
        id: 0,
        name: "Консультация",
        start_date: '2022-03-18',
        stop_date: '2022-03-18',
        is_verified: true,
        important_dates: [
            {
                name: '',
                date: ''
            }
        ]
    },
    {
        id: 1,
        name: "Консультация",
        start_date: '2022-03-19',
        stop_date: '2022-03-20',
        is_verified: false,
        important_dates: [
            {
                name: '',
                date: ''
            }
        ]
    },
    {
        id: 2,
        name: "Консультация",
        start_date: '2022-03-21',
        stop_date: '2022-03-21',
        is_verified: true,
        important_dates: [
            {
                name: '',
                date: ''
            }
        ]
    },
    {
        id: 3,
        name: "Консультация",
        start_date: '2022-03-21',
        stop_date: '2022-03-21',
        is_verified: true,
        important_dates: [
            {
                name: '',
                date: ''
            }
        ]
    }
]