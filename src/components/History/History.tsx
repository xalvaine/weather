import React from 'react'
import { List } from 'antd'
import { Link } from 'react-router-dom'
import styles from './history.module.scss'

const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(`history`) as string)
  } catch {
    return []
  }
}

const History = () => {
  return (
    <List
      className={styles.wrapper}
      dataSource={getHistory()}
      locale={{ emptyText: `You have not seen the weather forecast yet` }}
      renderItem={(city: string) => (
        <List.Item>
          <Link to={`/weather/${city}`}>{city}</Link>
        </List.Item>
      )}
    />
  )
}

export default History
