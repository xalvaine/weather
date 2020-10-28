import React from 'react'
import { PageHeader, Tabs } from 'antd'
import {
  useHistory,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'
import styles from './app.module.scss'
import Weather from '../Weather/Weather'
import History from '../History/History'

const App = () => {
  const history = useHistory()
  const location = useLocation()

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={location.pathname === `/history` ? `History` : `Weather`}
        extra={
          <Tabs
            activeKey={
              location.pathname === `/history` ? `/history` : `/weather`
            }
            onChange={(key) => history.push(key)}
          >
            <Tabs.TabPane tab="Weather" key="/weather" />
            <Tabs.TabPane tab="History" key="/history" />
          </Tabs>
        }
      />
      <Switch>
        <Route path="/weather/:city?" exact>
          <Weather />
        </Route>
        <Route path="/history" exact>
          <History />
        </Route>
        <Redirect to="/weather" />
      </Switch>
    </div>
  )
}

export default App
