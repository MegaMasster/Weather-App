const searchButton = document.querySelector(".searchButton")
const notFound = document.querySelector(".notfound")

const checkWeather = async (city) => {
    const api_key = "b6d79e8a23b46829e97880d36cec5262"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    try{
        const response = await fetch(`${url}`)

        const data = await response.json()

        if(city.length == 0 ) notFound.innerHTML = "Enter location please"

        if(data.cod == "404") notFound.innerHTML = "City not found"
        
        if(data.cod == "200") notFound.innerHTML = ""

        if(!response.ok){
            console.error("Server error")
            throw new Error(data.message)
        }

        console.log(data)

    }catch(error){
        console.log(error)
    }
}


















searchButton.addEventListener("click" , async () => {
    const city = document.querySelector(".search-box__input").value
    checkWeather(city)
})