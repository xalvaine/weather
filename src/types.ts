import { CITIES } from './config'

export type City = typeof CITIES[number]

export type WeatherItem = {
  clouds: { all: number }
  dt: number
  dt_txt: string
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  }
  weather: [
    {
      description: string
      icon: string
      id: number
      main: string
    },
  ]
}[]

export type LocalStorageWeatherItem = {
  city: string
  timestamp: string
  weather: WeatherItem[]
}
