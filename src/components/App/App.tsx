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
import { useTranslation } from 'react-i18next'

const App = () => {
  const history = useHistory()
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={location.pathname === `/history` ? t(`History`) : t(`Weather`)}
        extra={
          <Tabs
            activeKey={
              location.pathname === `/history` ? `/history` : `/weather`
            }
            onChange={(key) => history.push(key)}
          >
            <Tabs.TabPane tab={t(`Weather`)} key="/weather" />
            <Tabs.TabPane tab={t(`History`)} key="/history" />
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
