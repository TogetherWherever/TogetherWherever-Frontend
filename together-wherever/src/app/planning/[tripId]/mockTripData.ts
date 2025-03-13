
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
                          "Sunday": { "open": "06:30", "close": "18:30" },
                          "Monday": { "open": "06:30", "close": "18:30" },
                          "Tuesday": { "open": "06:30", "close": "18:30" },
                          "Wednesday": { "open": "06:30", "close": "18:30" },
                          "Thursday": { "open": "06:30", "close": "18:30" },
                          "Friday": { "open": "06:30", "close": "18:30" },
                          "Saturday": { "open": "06:30", "close": "18:30" },
                      },
                      lat: 7.827868593792716,
                      lng: 98.31278865581969
                  },
                  {
                    destID: "ChIJtZgCJiEmUDARG1q53LLQaAs",
                    destName: "Promthep Cape",
                    photo: "https://lh5.googleusercontent.com/p/AF1QipPU0EqMJ5j0BzcrbcVJIJ6elTUclpbNMzEs_Uc=w408-h271-k-no",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                    openingHours: {
                        "Sunday": { "open": "00:00", "close": "23:59" },
                        "Monday": { "open": "00:00", "close": "23:59" },
                        "Tuesday": { "open": "00:00", "close": "23:59" },
                        "Wednesday": { "open": "00:00", "close": "23:59" },
                        "Thursday": { "open": "00:00", "close": "23:59" },
                        "Friday": { "open": "00:00", "close": "23:59" },
                        "Saturday": { "open": "00:00", "close": "23:59" },
                    },
                    lat: 7.762023064920043, 
                    lng: 98.30535942883606
                },
              ],
              afternoon: [
                  {
                      destID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
                      destName: "Andamanda Phuket",
                      photo: "https://lh3.googleusercontent.com/p/AF1QipPsrXH0SQaoPL2QuXn_tzad7R8tamEuFhj-8KZu=s1360-w1360-h1020-rw",
                      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                      openingHours: {
                          "Sunday": { "open": "10:00", "close": "19:00" },
                          "Monday": { "open": "10:00", "close": "19:00" },
                          "Tuesday": { "open": "10:00", "close": "19:00" },
                          "Wednesday": { "open": "10:00", "close": "19:00" },
                          "Thursday": { "open": "10:00", "close": "19:00" },
                          "Friday": { "open": "10:00", "close": "19:00" },
                          "Saturday": { "open": "10:00", "close": "19:00" },
                      },
                      lat: 7.904687851358944,
                      lng: 98.36365107116391
                  }
              ],
              night: [
                  {
                      destID: "ChIJQSLg8hg6UDARpDYnTS8kgLM",
                      destName: "Phuket FantaSea",
                      photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB-nZEevBXD7TX3-w1mRY3C7YFuXCHhf4PqrH88xQXdBOE2HbFcXg01EPwqxNrULpfAMWODPDyQc-ZiSVR3QDg9U4PG7zYgt6dmqUECqw-teImfTKn_RUwKeoVrKy-Q1xDIAvr0=s1360-w1360-h1020-rw",
                      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                      openingHours: {
                          "Sunday": { "open": "17:30", "close": "23:30" },
                          "Monday": { "open": null, "close": null },
                          "Tuesday": { "open": "17:30", "close": "23:30" },
                          "Wednesday": { "open": null, "close": null },
                          "Thursday": { "open": null, "close": null },
                          "Friday": { "open": "17:30", "close": "23:30" },
                          "Saturday": { "open": null, "close": null },
                      },
                      lat: 7.956695821596965,
                      lng: 98.28742629999998
                  },
              ],            
          },
          distance: [
            {
                from: "The Big Buddha",
                fromID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                to: "Promthep Cape",
                toID: "ChIJtZgCJiEmUDARG1q53LLQaAs",
                distance_km: 15.0,
                duration_min: 24
              },
              {
                from: "Promthep Cape",
                fromID: "ChIJtZgCJiEmUDARG1q53LLQaAs",
                to: "Andamanda Phuket",
                toID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
                distance_km: 20.3,
                duration_min: 24
              },
              {
                from: "Andamanda Phuket",
                fromID: "ChIJ_YjQ6uQxUDARHVetUBkoi9k",
                to: "Phuket FantaSea",
                toID: "ChIJQSLg8hg6UDARpDYnTS8kgLM",
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
                destID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                destName: "The Big Buddha",
                photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB8R2-W1BiFfDus87rupQ4oqmeYm7XYeph3c5rYizfqwxBoRB3WTe_E_fd7STBdNwy-xnbtaK2FqzLXBWMxoj2NhD4BX8fF9fWNdYK6JzYAlSZ1PfiAuUFbfAiwx6HEIpUdxYQhfwA=w353-h256-k-no",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                openingHours: {
                    "Sunday": { "open": "06:30", "close": "18:30" },
                    "Monday": { "open": "06:30", "close": "18:30" },
                    "Tuesday": { "open": "06:30", "close": "18:30" },
                    "Wednesday": { "open": "06:30", "close": "18:30" },
                    "Thursday": { "open": "06:30", "close": "18:30" },
                    "Friday": { "open": "06:30", "close": "18:30" },
                    "Saturday": { "open": "06:30", "close": "18:30" },
                },
                lat: 7.827868593792716,
                lng: 98.31278865581969
            },
            {
                destID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                destName: "The Big Buddha",
                photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB8R2-W1BiFfDus87rupQ4oqmeYm7XYeph3c5rYizfqwxBoRB3WTe_E_fd7STBdNwy-xnbtaK2FqzLXBWMxoj2NhD4BX8fF9fWNdYK6JzYAlSZ1PfiAuUFbfAiwx6HEIpUdxYQhfwA=w353-h256-k-no",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                openingHours: {
                    "Sunday": { "open": "06:30", "close": "18:30" },
                    "Monday": { "open": "06:30", "close": "18:30" },
                    "Tuesday": { "open": "06:30", "close": "18:30" },
                    "Wednesday": { "open": "06:30", "close": "18:30" },
                    "Thursday": { "open": "06:30", "close": "18:30" },
                    "Friday": { "open": "06:30", "close": "18:30" },
                    "Saturday": { "open": "06:30", "close": "18:30" },
                },
                lat: 7.827868593792716,
                lng: 98.31278865581969
            },
            {
                destID: "ChIJOSmXz2AvUDARXCxlBBs7y38",
                destName: "The Big Buddha",
                photo: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB8R2-W1BiFfDus87rupQ4oqmeYm7XYeph3c5rYizfqwxBoRB3WTe_E_fd7STBdNwy-xnbtaK2FqzLXBWMxoj2NhD4BX8fF9fWNdYK6JzYAlSZ1PfiAuUFbfAiwx6HEIpUdxYQhfwA=w353-h256-k-no",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus.",
                openingHours: {
                    "Sunday": { "open": "06:30", "close": "18:30" },
                    "Monday": { "open": "06:30", "close": "18:30" },
                    "Tuesday": { "open": "06:30", "close": "18:30" },
                    "Wednesday": { "open": "06:30", "close": "18:30" },
                    "Thursday": { "open": "06:30", "close": "18:30" },
                    "Friday": { "open": "06:30", "close": "18:30" },
                    "Saturday": { "open": "06:30", "close": "18:30" },
                },
                lat: 7.827868593792716,
                lng: 98.31278865581969
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