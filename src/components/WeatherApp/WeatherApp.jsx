import React, { useState } from "react";
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

 const WeatherApp=() => {

    let api_key ="979a316b7b39539a65c54d2004d67a93";

    const [wicon,setWicon] =useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
    
        if (element[0].value === "") {
            return 0;
        }
    
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;
    
            let response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            let data = await response.json();
    
            // Check if the expected properties exist in the API response
            if (data.main && data.main.humidity !== undefined && data.wind !== undefined) {
                const humidity = document.getElementsByClassName("humidity-percent");
                const wind = document.getElementsByClassName("wind-rate");
                const temperature = document.getElementsByClassName("weather-temp");
                const location = document.getElementsByClassName("weather-location");
    
                humidity[0].innerHTML = `${data.main.humidity}%`;
                wind[0].innerHTML = `${data.wind.speed} km/h`;
                temperature[0].innerHTML = `${data.main.temp}°C`;
                location[0].innerHTML = data.name;

                if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
                    setWicon(clear_icon);
                }
                else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
                {
                    setWicon(cloud_icon);
                }
                else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
                {
                    setWicon(drizzle_icon);
                }
                else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
                {
                    setWicon(drizzle_icon);
                }
                else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
                {
                    setWicon(rain_icon);
                }
                else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
                {
                    setWicon(rain_icon);
                }
                else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
                {
                    setWicon(snow_icon);
                }
                else{
                    setWicon(clear_icon);
                }
                

                
            } else {
                console.error("Invalid API response structure:", data);
                // Handle the case where the API response structure is not as expected
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // Handle other errors, for example, display a message to the user
        }
    }
    
     return (
        <div className='container'> 
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="Search" />
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
            </div> 
            <div className="weather-image">
                <img src={wicon} alt="" />
                </div>  
                <div className="weather-temp">24°C</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">18km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <div>
                <footer className="fixed bottom-0 p-4 footer bg-base-100 border-t-2 border-base-200 text-base-content footer-center">
                    <div className="flex-items">
                    <p style={{ color: "white" }}>Engineered by Gaurav Kumar🚀</p>
                        <a href='##' target="_blank" className='flex items-center hover:underline font-bold cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github mr-1" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.20-.82 2.20-.82.44 1.10.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.20 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                </footer>
            </div>

        </div>
        
     );
 };
 export default WeatherApp;