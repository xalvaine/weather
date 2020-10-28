import React, { useEffect, useState } from 'react'
import { Form, Select } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import styles from './weather.module.scss'
import { CITIES } from '../../config'
import { City, LocalStorageWeatherItem, WeatherItem } from '../../types'
import { getWeather } from './weatherActions'
import { useTranslation } from 'react-i18next'
import Forecast from '../common/Forecast/Forecast'

interface ParamTypes {
  city: City
}

const saveHistory = (city: LocalStorageWeatherItem) => {
  const key = `history`
  try {
    const tmpArray = JSON.parse(localStorage.getItem(key) as string) || []
    tmpArray.unshift(city)
    localStorage.setItem(key, JSON.stringify(tmpArray))
  } catch {
    localStorage.setItem(key, JSON.stringify([city]))
  }
}

const Weather = () => {
  const history = useHistory()
  const { city } = useParams<ParamTypes>()
  const { t } = useTranslation()
  const [weather, setWeather] = useState<WeatherItem[]>([])

  useEffect(() => {
    if (!city) return
    getWeather(city, t(`lang`)).then((data) => {
      const tmpWeather = []
      const chunk = 8
      for (let i = 0; i < data.length; i += chunk)
        tmpWeather.push(data.slice(i, i + chunk))
      setWeather(tmpWeather)
      saveHistory({ weather: tmpWeather, timestamp: new Date().toJSON(), city })
    })
  }, [city, t])

  useEffect(() => {}, [weather])

  const handleCitySelect = (city: City) => {
    history.push(`/weather/${city}`)
  }

  return (
    <Form className={styles.wrapper} layout="vertical">
      <Form.Item label={t(`City`)}>
        <Select
          showSearch
          className={styles.search}
          size="large"
          placeholder={t(`Enter city`)}
          defaultValue={city}
          optionFilterProp="children"
          onChange={handleCitySelect}
          notFoundContent={t(`Cities not found`)}
          filterOption={(input, option) =>
            !!option &&
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {CITIES.map((option) => (
            <Select.Option value={option} key={option}>
              {t(option)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Forecast weather={weather} />
    </Form>
  )
}

export default Weather
