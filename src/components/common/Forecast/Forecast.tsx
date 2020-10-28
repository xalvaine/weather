import React from 'react'
import styles from '../../Weather/weather.module.scss'
import { Avatar, Card, Space } from 'antd'
import moment from 'moment'
import { WeatherItem } from '../../../types'

interface Props {
  weather: WeatherItem[]
}

const capitalizeString = (string: string) =>
  string.slice(0, 1).toUpperCase() + string.slice(1)

const getPointTitle = (point: WeatherItem[0]) => {
  return `${capitalizeString(point.weather[0].description)}, ${Math.round(
    point.main.temp,
  )} °C`
}

const Forecast = (props: Props) => {
  const { weather } = props

  return (
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
  )
}

export default Forecast
