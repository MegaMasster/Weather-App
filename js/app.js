const searchButton = document.querySelector(".searchButton")
const notFound = document.querySelector(".notfound")
const weatherImg = document.querySelector(".notfound-img")
const resultImg = document.querySelector(".imgData")

const resultCountry = document.querySelector(".resultWeather-cont__country")
const resultCity = document.querySelector(".resultWeather-cont__city")
const resultTemp = document.querySelector(".resultWeather-cont__temp")
const resultWeather = document.querySelector(".resultWeather-cont__weather")
const resultWind = document.querySelector(".resultWeather-cont__wind")



const checkWeather = async (city) => {
    const api_key = "b6d79e8a23b46829e97880d36cec5262"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    try{
        const response = await fetch(`${url}`)

        const data = await response.json()

        if(city.length == 0 ) notFound.innerHTML = "Enter location please"

        if(data.cod == "404") {
            notFound.innerHTML = "City not found" 
            weatherImg.style.display = "flex"
        }else{
            weatherImg.style.display = "none"
        }
        
        if(data.cod == "200") {
            notFound.innerHTML = ""
            resultImg.style.display = "flex"

            displayWeatherData(data)

            if(data.weather[0] && data.weather) {
                switch(data.weather[0].main) {
                    case "Clouds":
                        resultImg.src = "assets/img/cloud.png"
                        break

                    case "Rain":
                        resultImg.src = "assets/img/rain.png"
                        break

                    case "Clear":
                        resultImg.src = "assets/img/clear.png"
                        break

                    case "Snow":
                        resultImg.src = "assets/img/snow.png"
                        break
                    case "Mist":
                        resultImg.src = "assets/img/mist.png"
                        break
                }
            } 

        }else{
            clearWeatherData(data)
        }

        if(!response.ok){
            console.error("Server error")
            throw new Error(data.message)
        }

        console.log(data)

    }catch(error){
        console.log(error)
    }
}

function clearWeatherData(data) {
    resultImg.style.display = "none"
    resultCountry.innerHTML = ``
    resultCity.innerHTML = ``
    resultTemp.innerHTML = ``
    resultWeather.innerHTML = ``
    resultWind.innerHTML = ``
}

function displayWeatherData(data) {
    resultCountry.innerHTML = `Country: ${data.sys.country}`
    resultCity.innerHTML = `City: ${data.name}`
    resultTemp.innerHTML = `Temp: ${data.main.temp} °C`
    resultWeather.innerHTML = `Weather: ${data.weather[0].main}`
    resultWind.innerHTML = `Wind: ${data.wind.speed} m/s`
}

searchButton.addEventListener("click" , async () => {
    const city = document.querySelector(".search-box__input").value
    checkWeather(city)
})