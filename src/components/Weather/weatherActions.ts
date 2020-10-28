import Axios from 'axios'
import { City } from '../../types'
import { APP_ID } from '../../config'

export const getWeather = (city: City, lang: string) => {
  return Axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
    params: { appid: APP_ID, units: `metric`, lang, q: city },
  }).then((response) => response.data.list)
}
