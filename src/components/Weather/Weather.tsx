import React, { useEffect, useState } from 'react'
import { Avatar, Card, Form, Select, Space } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import styles from './weather.module.scss'
import { CITIES } from '../../config'
import { City, WeatherItem } from '../../types'
import { getWeather } from './weatherActions'

interface ParamTypes {
  city: City
}

const capitalizeString = (string: string) =>
  string.slice(0, 1).toUpperCase() + string.slice(1)

const Weather = () => {
  const history = useHistory()
  const { city } = useParams<ParamTypes>()
  const [weather, setWeather] = useState<WeatherItem[]>([])

  useEffect(() => {
    if (city)
      getWeather(city).then((data) => {
        const tmpWeather = []
        const chunk = 8
        for (let i = 0; i < data.length; i += chunk)
          tmpWeather.push(data.slice(i, i + chunk))
        setWeather(tmpWeather)
      })
  }, [city])

  const handleCitySelect = (city: City) => {
    history.push(`/weather/${city}`)
  }

  const getPointTitle = (point: WeatherItem[0]) => {
    return `${capitalizeString(point.weather[0].description)}, ${Math.round(
      point.main.temp,
    )} °C`
  }

  return (
    <Form className={styles.wrapper} layout="vertical">
      <Form.Item label="City">
        <Select
          showSearch
          className={styles.search}
          size="large"
          placeholder="Select a person"
          defaultValue={city}
          optionFilterProp="children"
          onChange={handleCitySelect}
          filterOption={(input, option) =>
            !!option &&
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {CITIES.map((option) => (
            <Select.Option value={option} key={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Space direction="vertical" className={styles.space} size="large">
        {weather.map((item) => (
          <Card
            key={`card-${item[0].dt}`}
            className={styles.card}
            title={moment(item[0].dt_txt).format(`DD.MM.YYYY`)}
          >
            {item.map((point) => (
              <Card.Grid className={styles.gridItem} key={point.dt}>
                <Card.Meta
                  avatar={
                    <Avatar
                      size="large"
                      shape="square"
                      src={`http://openweathermap.org/img/wn/${point.weather[0].icon}@2x.png`}
                    />
                  }
                  title={getPointTitle(point)}
                  description={moment(point.dt_txt).format(`HH:mm`)}
                />
              </Card.Grid>
            ))}
          </Card>
        ))}
      </Space>
    </Form>
  )
}

export default Weather