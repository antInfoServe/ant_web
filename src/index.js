import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import { BrowserRouter } from 'react-router-dom'
import {register} from './registerServiceWorker'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('main'))
register()