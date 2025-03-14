
import { addDays } from "date-fns";

export const mockTripDetailData = {
    tripName: "Trip To: Phuket",
    startDate: new Date(),
    lastDate: addDays(new Date(), 7),
    photo: "https://lh3.googleusercontent.com/places/ANXAkqEDRzE8jNSwMQEMHh667pTZnFMgvKYmkKLkYYA_km5wVT3kq28gdgDLcCuiFUYchxgsOj018x9n4ZjdMsIlLevCErBxPo7J0UY=s4800-w600-h600",
    lat: 7.878978,
    lng: 98.398392,
    companion: [
        {
            username: "Christopher",
            profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        },
        {
            username: "Bob",
            profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        },
        {
            username: "Susan",
            profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        },
        {
            username: "Richard",
            profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        },
        {
            username: "Johny",
            profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        },
        {
            username: "Justin",
            profilePic: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        },
    ],
    trip_day: [
        {
            day: 1,
            status: "complete",
            voted: true,
            voted_dests: {
                morning: [
                    {
                        destID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                        destName: "The Big Buddha",
                        photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB8R2-W1BiFfDus87rupQ4oqmeYm7XYeph3c5rYizfqwxBoRB3WTe_E_fd7STBdNwy-xnbtaK2FqzLXBWMxoj2NhD4BX8fF9fWNdYK6JzYAlSZ1PfiAuUFbfAiwx6HEIpUdxYQhfwA=w353-h256-k-no",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                        openingHours: {
                            "Sunday": { open: "06:30", close: "18:30" },
                            "Monday": { open: "06:30", close: "18:30" },
                            "Tuesday": { open: "06:30", close: "18:30" },
                            "Wednesday": { open: "06:30", close: "18:30" },
                            "Thursday": { open: "06:30", close: "18:30" },
                            "Friday": { open: "06:30", close: "18:30" },
                            "Saturday": { open: "06:30", close: "18:30" },
                        },
                        lat: 7.827868593792716,
                        lng: 98.31278865581969
                    },
                    {
                        destID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
                        destName: "Andamanda Phuket",
                        photo: "https://lh3.googleusercontent.com/p/AF1QipPsrXH0SQaoPL2QuXn_tzad7R8tamEuFhj-8KZu=s1360-w1360-h1020-rw",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                        openingHours: {
                            "Sunday": { open: "10:00", close: "19:00" },
                            "Monday": { open: "10:00", close: "19:00" },
                            "Tuesday": { open: "10:00", close: "19:00" },
                            "Wednesday": { open: "10:00", close: "19:00" },
                            "Thursday": { open: "10:00", close: "19:00" },
                            "Friday": { open: "10:00", close: "19:00" },
                            "Saturday": { open: "10:00", close: "19:00" },
                        },
                        lat: 7.904687851358944,
                        lng: 98.36365107116391
                    },
                ],
                afternoon: [
                    {
                        destID: "ChIJQSLg8hg6UDARpDYnTS8kgLM",
                        destName: "Phuket FantaSea",
                        photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-nZEevBXD7TX3-w1mRY3C7YFuXCHhf4PqrH88xQXdBOE2HbFcXg01EPwqxNrULpfAMWODPDyQc-ZiSVR3QDg9U4PG7zYgt6dmqUECqw-teImfTKn_RUwKeoVrKy-Q1xDIAvr0=s1360-w1360-h1020-rw",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                        openingHours: {
                            "Sunday": { open: "17:30", close: "23:30" },
                            "Monday": { open: null, close: null },
                            "Tuesday": { open: "17:30", close: "23:30" },
                            "Wednesday": { open: null, close: null },
                            "Thursday": { open: null, close: null },
                            "Friday": { open: "17:30", close: "23:30" },
                            "Saturday": { open: null, close: null },
                        },
                        lat: 7.956695821596965,
                        lng: 98.28742629999998
                    },
                ],
                night: [                    
                    
                    {
                        destID: "ChIJtZgCJiEmUDARG1q53LLQaAs",
                        destName: "Promthep Cape",
                        photo: "https://lh5.googleusercontent.com/p/AF1QipPU0EqMJ5j0BzcrbcVJIJ6elTUclpbNMzEs_Uc=w408-h271-k-no",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                        openingHours: {
                            "Sunday": { open: "00:00", close: "23:59" },
                            "Monday": { open: "00:00", close: "23:59" },
                            "Tuesday": { open: "00:00", close: "23:59" },
                            "Wednesday": { open: "00:00", close: "23:59" },
                            "Thursday": { open: "00:00", close: "23:59" },
                            "Friday": { open: "00:00", close: "23:59" },
                            "Saturday": { open: "00:00", close: "23:59" },
                        },
                        lat: 7.762023064920043,
                        lng: 98.30535942883606
                    },
                ],
            },
            distance: [
                {
                    from: "The Big Buddha",
                    fromID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                    to: "Andamanda Phuket",
                    toID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
                    distance_km: 15.0,
                    duration_min: 24
                },
                {
                    from: "Andamanda Phuket",
                    fromID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
                    to: "huket FantaSea",
                    toID: "ChIJQSLg8hg6UDARpDYnTS8kgLM",
                    distance_km: 20.3,
                    duration_min: 24
                },
                {
                    from: "Phuket FantaSea",
                    fromID: "ChIJQSLg8hg6UDARpDYnTS8kgLM",
                    to: "Promthep Cape",
                    toID: "ChIJtZgCJiEmUDARG1q53LLQaAs",
                    distance_km: 18.5,
                    duration_min: 35
                },
            ]
        },
        {
            day: 2,
            status: "voting",
            voted: false,
            members_voted: 0,
            total_members: 6,
            suitableDests: [
                {
                    destID: "ChIJMVGAs1g3UDARyLMbAwlTF_c",
                    destName: "Green Elephant Sanctuary Park",
                    photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_oFKGw9GI96bU-bhk8IcwvPuPco862AWpJ0SAGrrOxZuIhWj0tA2oCPd8LXt5J5wGd1xrF8O7m_DYThLNhVVaz_nchtVDpkVlD1mk_64qNxqstqvr4MGciN1EHd4ziWzgu-3g=s294-w294-h220-k-no",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                    openingHours: {
                        "Sunday": { open: "08:00", close: "17:00" },
                        "Monday": { open: "08:00", close: "17:00" },
                        "Tuesday": { open: "08:00", close: "17:00" },
                        "Wednesday": { open: "08:00", close: "17:00" },
                        "Thursday": { open: "08:00", close: "17:00" },
                        "Friday": { open: "08:00", close: "17:00" },
                        "Saturday": { open: "08:00", close: "17:00" },
                    },
                    lat: 7.979018511838991, 
                    lng: 98.30935934232788
                },
                {
                    destID: "ChIJezyyaqM6UDARyh5o4",
                    destName: "Jungceylon",
                    photo: "https://lh5.googleusercontent.com/p/AF1QipMxMKiMG02JxvEBiNAwc29Wzc1Ftg4oQuVI_m5r=w408-h544-k-no",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                    openingHours: {
                        "Sunday": { open: "06:30", close: "18:30" },
                        "Monday": { open: "06:30", close: "18:30" },
                        "Tuesday": { open: "06:30", close: "18:30" },
                        "Wednesday": { open: "06:30", close: "18:30" },
                        "Thursday": { open: "06:30", close: "18:30" },
                        "Friday": { open: "06:30", close: "18:30" },
                        "Saturday": { open: "06:30", close: "18:30" },
                    },
                    lat: 7.892776675289952,
                    lng: 98.29863635767211
                },
                {
                    destID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                    destName: "Kata Beach",
                    photo: "https://lh3.googleusercontent.com/proxy/_GIB95cWs8RVzVkn3Sppa9GdSMibandtlKXInNfH5QBSP8sgNpySwTgQzpSmWuBKHWJESOvlCLn3Qq2hEaDVoGZY63zLvknMOR6AnGpglKz76qcqvMAMfOkxUTgWZM5TnN9tK-tApnIuwDcj_uQka4gjJ-DSZg=s294-w294-h220-k-no",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                    openingHours: {
                        "Sunday": { open: "00:00", close: "23:59" },
                        "Monday": { open: "00:00", close: "23:59" },
                        "Tuesday": { open: "00:00", close: "23:59" },
                        "Wednesday": { open: "00:00", close: "23:59" },
                        "Thursday": { open: "00:00", close: "23:59" },
                        "Friday": { open: "00:00", close: "23:59" },
                        "Saturday": { open: "00:00", close: "23:59" },
                    },
                    lat: 7.821060644463775, 
                    lng: 98.29714525265501
                },
                {
                    destID: "ChIJ1SemHHIlUDARH2WofLMBaOQ",
                    destName: "Karon Beach",
                    photo: "https://lh5.googleusercontent.com/p/AF1QipMlIEmadi1VznA832bVPHV8M2dQSuuOHUTlcjA=w408-h253-k-no",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                    openingHours: {
                        "Sunday": { open: "00:00", close: "23:59" },
                        "Monday": { open: "00:00", close: "23:59" },
                        "Tuesday": { open: "00:00", close: "23:59" },
                        "Wednesday": { open: "00:00", close: "23:59" },
                        "Thursday": { open: "00:00", close: "23:59" },
                        "Friday": { open: "00:00", close: "23:59" },
                        "Saturday": { open: "00:00", close: "23:59" },
                    },
                    lat: 7.844519822157014, 
                    lng: 98.29362271376951
                }
            ]
        },
        {
            day: 3,
            status: "pending",
            voted: false
        },
        {
            day: 4,
            status: "pending",
            voted: false
        },
        {
            day: 5,
            status: "pending",
            voted: false
        },
        {
            day: 6,
            status: "pending",
            voted: false
        },
        {
            day: 7,
            status: "pending",
            voted: false
        },
        {
            day: 8,
            status: "pending",
            voted: false
        },
    ]
};