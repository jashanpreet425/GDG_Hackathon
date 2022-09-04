import React, { useState, useEffect } from 'react'
import { Extraction } from './Extraction'
import { Map } from './Map'
import LoadingBar from 'react-top-loading-bar'
import './Search.css'

export const Search = () => {
    const [text, setText] = useState("")
    const [textSend, setTextSend] = useState("")
    const [parsed, setParsed] = useState({})
    const [changeMap, setChangeMap] = useState("https://www.google.com/maps/embed/v1/place?key=AIzaSyALZXYkorU6_PEN74ybylWE_enevzG2Gs0")

    const [cod, setCod] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [wlatitude, setwLatitude] = useState(0)
    const [wlongitude, setwLongitude] = useState(0)
    const [temp, setTemp] = useState(273.15)
    const [temp_min, setTemp_min] = useState(273.15)
    const [temp_max, setTemp_max] = useState(273.15)
    const [weatherMain, setWeatherMain] = useState("")
    const [cloud, setCloud] = useState(0)
    const [icon, setIcon] = useState("")
    const [progress, setProgress] = useState(0)
    const [myCode, setMycode] = useState(0)

    const handlOnChange = (event) => {
        setText(event.target.value);
    }

    const handleSearchClicked = () => {
        setTextSend(text);
    }

    const extractData = async () => {
        setProgress(10)

        var url = `https://api.openweathermap.org/data/2.5/weather?q=${textSend}&appid=d20912908fb193fc900c46b232668fa0`
        console.log(url)
        const data = await fetch(url);
        setProgress(50)
        const parsedData = await data.json();
        setProgress(70)
        // setParsed(parsedData);
        setCod(parsedData.cod);
        setwLatitude(parsedData.coord.lat)
        setwLongitude(parsedData.coord.lon)
        setProgress(90)
        setTemp(parsedData.main.temp)
        setTemp_min(parsedData.main.temp_min)
        setTemp_max(parsedData.main.temp_max)
        setCloud(parsedData.clouds.all)
        setWeatherMain(parsedData.weather[0].main)
        setIcon(`http://openweathermap.org/img/wn/${parsedData.weather[0].icon}@2x.png`)


        setProgress(100)



    }
    const extractDataWithLat = async () => {
        setProgress(10)
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d20912908fb193fc900c46b232668fa0`

        console.log(url)
        const data = await fetch(url);
        setProgress(50)
        const parsedData = await data.json();
        setProgress(70)
        setParsed(parsedData);
        setCod(parsedData.cod);
        setProgress(90)
        setTemp(parsedData.main.temp)
        setTemp_min(parsedData.main.temp_min)
        setTemp_max(parsedData.main.temp_max)
        setCloud(parsedData.clouds.all)
        setWeatherMain(parsedData.weather[0].main)
        setIcon(`http://openweathermap.org/img/wn/${parsedData.weather[0].icon}@2x.png`)


        setProgress(100)

    }
    const getLocation = () => {
        console.log("fire")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, error);
        } else {
            document.getElementById("root").innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

    }
    function error(err) {
        setMycode(1);

    }



    useEffect(() => {
        getLocation();
        

    }, [])
    useEffect(() => {
        console.log(cod)
    }, [cod])


    useEffect(() => {
        if (textSend !== "") {
            extractData();

        }
    }, [textSend])

    useEffect(() => {
        if(wlongitude!==0&& wlatitude!==0){
            setChangeMap(`https://www.google.com/maps/embed/v1/place?key=AIzaSyALZXYkorU6_PEN74ybylWE_enevzG2Gs0&q=${wlatitude},${wlongitude}`)

        }
        
    }, [wlongitude])



    useEffect(() => {
        if (latitude !== 0 && longitude !== 0) {
            extractDataWithLat();
            setChangeMap(`https://www.google.com/maps/embed/v1/place?key=AIzaSyALZXYkorU6_PEN74ybylWE_enevzG2Gs0&q=${latitude},${longitude}`)

        }

    }, [longitude])

    

    if (cod === 200) {
        console.log("op")

        return (

            <div>
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                // height={3}
                />

                <div style={{ height: "100vh", width: "100%", display: "flex" }}>
                    <Map changeMap={changeMap} />
                    <div className="flex justify-end " style={{ width: "100%" }} >
                        <div className="mb-3 xl:w-96 mt-2">
                            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 px-5 mx-0">
                                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " placeholder="Search weather of any city" aria-label="Search" aria-describedby="button-addon2" value={text} onChange={handlOnChange} />
                                <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" onClick={handleSearchClicked}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <Extraction temp={temp} temp_min={temp_min} temp_max={temp_max} weatherMain={weatherMain} cloud={cloud} icon={icon} />
                </div>

            </div>
        )


    }

    else if (cod === "404") {
        return (

            <>
                <div className="flex justify-end " style={{ width: "100%" }} >
                    <div className="mb-3 xl:w-96 mt-2">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 px-5 mx-0">
                            <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " placeholder="Search weather of any city" aria-label="Search" aria-describedby="button-addon2" value={text} onChange={handlOnChange} />
                            <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" onClick={handleSearchClicked}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center ' style={{ height: "80vh", alignItems: "center" }}>
                    <h1 className='font-bold text-4xl'>
                        Your Entered city is not found
                    </h1>

                </div>

            </>


        )
    }



    else if(myCode===1) {
        return (
            <>
                <div className="flex justify-end " style={{ width: "100%" }} >
                    <div className="mb-3 xl:w-96 mt-2">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 px-5 mx-0">
                            <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " placeholder="Search weather of any city" aria-label="Search" aria-describedby="button-addon2" value={text} onChange={handlOnChange} />
                            <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" onClick={handleSearchClicked}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center ' style={{ height: "80vh", alignItems: "center" }}>
                    <h1 className='font-bold text-4xl'>
                        Please turn your location on or manually search for a city
                    </h1>

                </div>

            </>



        )
    }
    else{
        return(
            <div>
                
                 <div className="flex justify-end " style={{ width: "100%" }} >
                    <div className="mb-3 xl:w-96 mt-2">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 px-5 mx-0">
                            <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " placeholder="Search weather of any city" aria-label="Search" aria-describedby="button-addon2" value={text} onChange={handlOnChange} />
                            <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" onClick={handleSearchClicked}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

               

            </div>
        )
    }



}
