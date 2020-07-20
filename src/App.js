import React, {useState} from 'react';

const api = {
  key: '81bd3577126e27f74b6c3f31dacd8f59',
  base: 'https://api.openweathermap.org/data/2.5/'}

function App() {
  const [query,setQuery] = useState('')
  const [weather,setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=Imperial&appid=${api.key}`)
      .then(res =>res.json())
      .then(result => {
        setQuery('')                                
        setWeather(result)
        console.log(result)
      })
    }
  }
 
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year  = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
      ? ((weather.main.temp> 32) 
        ? ((weather.main.temp> 65) 
          ? ((weather.main.temp> 90) 
            ? 'app hot'
            : 'app warm')
          : 'app chill')
        : 'app')
      : 'app'}>
      <main>
      <br/><br/>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                { Math.round(weather.main.temp) }F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) :("")}
        <div className="name">
          Created By Mitchell Thatcher
        </div>
      </main>
    </div>
  );
}

export default App;
