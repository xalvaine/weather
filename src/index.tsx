import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import './i18n'

ReactDOM.render(
  <Router>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </Router>,
  document.getElementById('root'),
)
