function getCityData(lat, lon){
    return fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_AIRVISUAL_API}`)
        .then(res => res.json())
  
}

export {getCityData}