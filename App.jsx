import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [weatherdata,setWeatherdata] = useState()
  const [city,setCity] = useState("LONDON")
  const [cityname,setCityname] = useState("")
  const apiurl = "http://api.weatherapi.com/v1/forecast.json"
  const apikey = "?key=b7b63115d1e84d1688a151848240110"
  const parameter = "&days=5&aqi=no&alerts=yes"
  const [foreCast,setforecast] = useState([])
  const [hourdata,setHourdata] = useState([])
  // const [hdata,setHdata] = useState([])

  useEffect(()=>{
    setCity(cityname)
    foreCast.map((hr)=>{
      setHourdata(hr.hour)
    })

   
  
  })

  const handleInput = (e)=>{
    setCityname(e.target.value)
  }
  const handlebtn = ()=>{
    fetch(apiurl+apikey+`&q=${city}`+parameter)
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        let datas = data
        setWeatherdata(datas)
        setforecast(datas.forecast.forecastday)
        
      })
      
    
      

  }
  console.log(weatherdata)
  console.log(foreCast)
  console.log(hourdata)
  // console.log(hdata)
  return (

    <div className="app">

      <input onChange={handleInput} type='text'/>
      <button onClick={handlebtn}>weather data</button>
      {weatherdata && <div>
        {
          foreCast.map((ds,index)=>{
            return (
              <div>{ds.date}
             
              <ul>
          {
            hourdata.map((hr,index)=>{
              return (
                <li key={index}> {
                  ds.hour.map((dt,index)=>{
                    return (
                      <p>{dt.time}<img src={hr.condition.icon}/>{hr.condition.text}</p>
                    )
                  })
                }
                  </li>
              )
            })
          }
        </ul></div>
            )
          })
        }
        </div>}
     
      

    </div>
  )
}

export default App
