import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Clima = () => {

    const [climate, setClimate] = useState({})
    const [temp, setTemp] = useState(0)
    const [isCelsius, SetCelsius] = useState(true)
    const [load, setLoad] = useState(true)
    useEffect(() => {
        const success = pos => {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ffe5955a0b5f002e53b0e4ab91c7e1c4`)
                .then(res => {
                    setClimate(res.data)
                    setTemp(res.data.main.temp - 273.15)
                })
                .finally(() => setLoad(false))
        }
        const error = () => {
            alert(`Lo siento no podemos mostrar el clima si no me autorizas`)
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    const convertir = () => {
        if (isCelsius == true) {
            setTemp(((temp * 9) / 5) + 32)
            SetCelsius(false)
        } else {
            setTemp(((temp - 32) * 5) / 9)
            SetCelsius(true)
        }
    }

    console.log(temp)
    return (
        <div>
            {load
                ? (
                    <div className='fondo'>
                        <div class="spinner">
                            <span>Cargando</span>
                        </div>
                    </div>
                )
                : (<div className='card'>
                    <h1>Climate</h1>
                    <h4>Country: <span>{climate?.name}</span> - <span>{climate?.sys?.country}</span></h4>
                    <h4>Speed Wind: <span>{climate?.wind?.speed}</span></h4>
                    <div>
                        <img src={`http://openweathermap.org/img/wn/${climate?.weather?.[0]?.icon}.png`} />
                        <h4>Climate: <span>{climate?.weather?.[0]?.main}</span></h4>
                    </div>
                    <h4>Temperature: <span>{temp.toFixed(2)} {isCelsius ? "°C" : "°F"}</span></h4>
                    <button onClick={convertir}>Degrees °F/°C</button>
                </div>)
            }
        </div>
    );
};

export default Clima;