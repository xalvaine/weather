import React, { useEffect, useState } from 'react'
import { Collapse, Form, Pagination, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { LocalStorageWeatherItem } from '../../types'
import Forecast from '../common/Forecast/Forecast'
import styles from './history.module.scss'

const getHistory = () => {
  try {
    return (
      (JSON.parse(
        localStorage.getItem(`history`) as string,
      ) as LocalStorageWeatherItem[]) || []
    )
  } catch {
    return []
  }
}

const History = () => {
  const { t } = useTranslation()
  const [content, setContent] = useState<LocalStorageWeatherItem[]>([])
  const [itemsCount, setItemsCount] = useState<number>()
  const [page, setPage] = useState<number>(1)
  const [oldestFirst, setOldestFirst] = useState(false)

  useEffect(() => {
    setContent(getHistory().slice(0, 10))
    setItemsCount(getHistory().length)
  }, [])

  useEffect(() => {
    handlePageChange(page, oldestFirst)
  }, [page, oldestFirst])

  const handlePageChange = (page: number, oldestFirst: boolean) => {
    const data = oldestFirst ? getHistory().reverse() : getHistory()
    setContent(data.slice(10 * (page - 1), 10 * page))
  }

  return (
    <>
      <Form.Item className={styles.switch} label="Сначала старые">
        <Switch onChange={(value) => setOldestFirst(value)} />
      </Form.Item>
      <Collapse ghost className={styles.wrapper}>
        {content.map((weatherItem) => (
          <Collapse.Panel
            key={weatherItem.timestamp}
            header={`${t(weatherItem.city)}, ${moment(
              weatherItem.timestamp,
            ).format(`DD.MM, HH:mm`)}`}
          >
            <Forecast weather={weatherItem.weather} />
          </Collapse.Panel>
        ))}
      </Collapse>
      <Pagination
        total={itemsCount}
        current={page}
        onChange={(page) => setPage(page)}
        className={styles.pagination}
      />
    </>
  )
}

export default History
