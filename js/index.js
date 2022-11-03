// first day
let today = document.getElementById("today");
    todayDate = document.getElementById("todayDate");
    cityLocation = document.getElementById("location");
    degreeToday  = document.getElementById("degreeToday");
    todayIcon  = document.getElementById("todayIcon");
    todayLine  = document.getElementById("todayLine");
    umbrella  = document.getElementById("umbrella");
    wind  = document.getElementById("wind");
    compass  = document.getElementById("compass");
    searchInput  = document.getElementById("searchInput");


    // second day
let secondDay = document.getElementsByClassName("secondDay");
    secondDayIcon = document.getElementsByClassName("secondDayIcon");
    maxDegree = document.getElementsByClassName("maxDegree");
    minDegree = document.getElementsByClassName("minDegree");
    secondDayLine = document.getElementsByClassName("secondDayLine");
    cityNameValue = "cairo";


month =  ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
daysName = [
    "Saturday",       //0
    "Sunday",        //1
    "Monday",        //2
     "Tuesday",      //3
     "Wednesday",    //4
     "Thursday",     //5
     "Friday",       //6
];

async function getWeatherDate(){
     apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0b775fb3006f470789d03758222510&q=${cityNameValue}&days=3`);
     responseData = await apiResponse.json() ;
    console.log(responseData); 
    displayToday()
    displaySecondDay()
}    
getWeatherDate()

let dataName = new Date();

function displayToday(){
    today.innerHTML = daysName[dataName.getDay()];
    todayDate.innerHTML = dataName.getDay() + month[dataName.getMonth()] ;
    cityLocation.innerHTML = responseData.location.name;
    degreeToday.innerHTML = `${responseData.current.temp_c}<sup>o</sup><span>C</span>`;
    todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`);
    todayLine.innerHTML = responseData.current.condition.text;
    umbrella.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;
    console.log(responseData.location.name);
    console.log(dataName);
}


function displaySecondDay(){
    for (let i = 0; i < secondDay.length; i++) {
        secondDay[i].innerHTML = daysName[new Date (responseData.forecast.forecastday[i+1].date).getDay()];
        secondDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = `${responseData.forecast.forecastday[i+1].day.maxtemp_c}<span class="d-inline-block"><sup>o</sup>C</span>`;
        minDegree[i].innerHTML = `${responseData.forecast.forecastday[i+1].day.mintemp_c}<span class="d-inline-block"><sup>o</sup>C</span>`;
        secondDayLine[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;

    }


}

searchInput.addEventListener('keydown', function(){
     cityNameValue = searchInput.value;
    // console.log(cityNameValue);
    getWeatherDate(cityNameValue)
})


$(document).ready(function(){
    $('#loading').fadeOut(2000,function(){
        $('body').css('overflow','visible')
    })
})