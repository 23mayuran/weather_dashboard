
let apiKey = "badb62d09d074fa6044879f48dbfc703"


$(".searchButton").click(function () {

    let searchInput = $(".searchInput").val();

let current = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
let fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


console.log(current);
})