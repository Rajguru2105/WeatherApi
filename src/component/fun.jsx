import { useState } from "react";
import clear from "../images/clear-sky.png";
import humidity from "../images/drop.png";
import wind from "../images/wind.png";
import clouds from "../images/clouds.png";
import drizzle from "../images/drizzle.png";
import rain from "../images/rain.png";
import snow from "../images/snowflake.png";
import mist from "../images/mist.png";
import axios from "axios";
function Card() {
  const [city, setcity] = useState("");
  const [cname, setcname] = useState("");
  const [humid, sethumid] = useState("");
  const [swind, setwind] = useState("");
  const [temp, settemp] = useState("");
  const [icon, seticon] = useState(clear);
  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": clouds,
    "02n": clouds,
    "03d": clouds,
    "03n": clouds,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };
  function handlecity(evt) {
    setcity(evt.target.value);
  }
  function getweather() {
    var weather = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6179fe7df0eab9d03c10642297e0e41f`
    );
    weather.then(function (sucess) {
      console.log(sucess.data);
      setcname(sucess.data.name);
      sethumid(sucess.data.main.humidity);
      setwind(sucess.data.wind.speed);
      seticon(allicons[sucess.data.weather[0].icon]);
      settemp(Math.floor(sucess.data.main.temp));
    });
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="card w-1/3 rounded-md">
        <div className="bg-transparent flex justify-center items-center">
          {" "}
          <input
            onChange={handlecity}
            type="text"
            className="bg-white m-6 rounded-lg h-10 px-8 text-black"
            placeholder=" Enter the cityname...."
          />
          <button
            onClick={getweather}
            className="bg-black h-10 px-4 rounded-md"
          >
            Get data
          </button>
        </div>
        {city && cname && icon && temp && humid && swind ? (
          <>
            <div className="bg-transparent flex justify-center mt-4">
              <img src={icon} alt="clear" className="bg-transparent w-1/4" />
            </div>
            <div className="bg-transparent">
              <h1 className="bg-transparent text-7xl text-center font-bold p-5">
                {temp}°C
              </h1>
              <h1 className="bg-transparent text-4xl text-center p-5">
                {cname}
              </h1>
            </div>
            <div className="bg-transparent flex justify-between my-20 mt-7 mx-20 pt-14 ">
              <div className=" bg-transparent flex">
                <img
                  src={humidity}
                  alt="humidity"
                  className="bg-transparent w-20 h-20"
                />
                <div className="bg-transparent text-2xl">
                  <p className="bg-transparent text-2xl font-light text-white">
                    humidity
                  </p>
                  <p className="bg-transparent text-2xl font-light text-white">
                    {humid}%
                  </p>
                </div>
              </div>
              <div className=" bg-transparent flex ml-24">
                {" "}
                <img
                  src={wind}
                  alt="wind"
                  className="bg-transparent w-20 h-20"
                />
                <div className="bg-transparent text-2xl">
                  <p className="bg-transparent text-2xl font-light text-white">
                    Wind
                  </p>
                  <p className="bg-transparent text-2xl font-light">
                    {swind}kh/h
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Card;
