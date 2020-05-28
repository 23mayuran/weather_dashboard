
let apiKey = "badb62d09d074fa6044879f48dbfc703";



for (let i = 0; i < localStorage.length; i++) {

    let city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    let cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

let keyCount = 0;
$(".searchButton").click(function () {

    let searchInput = $(".searchInput").val();

    let current = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    let fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    console.log(current);

    if (searchInput == "") {
        console.log(searchInput);
    } else {

        $.ajax({
            url: current,
            method: "GET"
        }).then(function (response) {

            let cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");

            let local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;



            let currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();

            let currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            let timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            let currentTemp = currentName.append("<p>");

            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");

            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // Add Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            let urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=badb62d09d074fa6044879f48dbfc703&lat=${response.coord.lat}&lon=${response.coord.lon}`;


            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                let currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                //currentUV.append("UV Index: " + response.value);
            });

        });

        // testing

        $.ajax({
            url: fiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 
            let day = [0, 8, 16, 24, 32];
            let fiveDayCard = $(".fiveDayCard").addClass("card-body");
            let fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                let FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});


