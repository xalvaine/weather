import React, { useEffect, useState } from 'react'
import { Collapse, Pagination } from 'antd'
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

  useEffect(() => {
    setContent(getHistory())
    setItemsCount(getHistory().length)
  }, [])

  const handlePageChange = (page: number, pageSize: number = 10) => {
    setContent(getHistory().slice(pageSize * (page - 1), pageSize * page))
    setPage(page)
  }

  return (
    <>
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
        onChange={handlePageChange}
        className={styles.pagination}
      />
    </>
  )
}

export default History
