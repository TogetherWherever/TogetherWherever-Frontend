import { addDays } from "date-fns";

export const votingPageMockData = {
    trip_id: "001",
    tripName: "Trip To: Phuket",
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/5d/c8/caption.jpg?w=2400&h=1000&s=1&cx=2606&cy=1838&chk=v1_a61182fd4040ed4ecc4e",
    startDate: new Date(),
    lastDate: addDays(new Date(), 7),
    voting_date: addDays(new Date(), 1),
    members_voted: 0,
    total_members: 6,
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
    destinations: [
        {
            destID: "ChIJMVGAs1g3UDARyLMbAwlTF_c",
            destName: "Green Elephant Sanctuary Park",
            photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_oFKGw9GI96bU-bhk8IcwvPuPco862AWpJ0SAGrrOxZuIhWj0tA2oCPd8LXt5J5wGd1xrF8O7m_DYThLNhVVaz_nchtVDpkVlD1mk_64qNxqstqvr4MGciN1EHd4ziWzgu-3g=s294-w294-h220-k-no",
        },
        {
            destID: "ChIJezyyaqM6UDARyh5o4-SHqkw",
            destName: "Jungceylon",
            photo: "https://lh5.googleusercontent.com/p/AF1QipMxMKiMG02JxvEBiNAwc29Wzc1Ftg4oQuVI_m5r=w408-h544-k-no",
        },
        {
            destID: "ChIJAdUTdI0lUDAR-EN1U6iZIY0",
            destName: "Kata Beach",
            photo: "https://lh3.googleusercontent.com/proxy/_GIB95cWs8RVzVkn3Sppa9GdSMibandtlKXInNfH5QBSP8sgNpySwTgQzpSmWuBKHWJESOvlCLn3Qq2hEaDVoGZY63zLvknMOR6AnGpglKz76qcqvMAMfOkxUTgWZM5TnN9tK-tApnIuwDcj_uQka4gjJ-DSZg=s294-w294-h220-k-no",
        },
        {
            destID: "ChIJ1SemHHIlUDARH2WofLMBaOQ",
            destName: "Karon Beach",
            photo: "https://lh5.googleusercontent.com/p/AF1QipMlIEmadi1VznA832bVPHV8M2dQSuuOHUTlcjA=w408-h253-k-no",
        }
    ],
};