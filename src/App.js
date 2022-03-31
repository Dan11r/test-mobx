import React from 'react'
import './app.scss'
import courses from './store/courses'
import { observer } from 'mobx-react-lite'
import { СurrencyItsms } from './components/СurrencyItsms'
import { PopUp } from './components/PopUp'

const App = observer(() => {
  React.useEffect(() => {
    courses.setLatestRateData()
  }, [])

  return (
    <div className="App">
      <h1>Курсы валют ЦБ РФ на сегодня</h1>
      <div className="valute-items">
        <СurrencyItsms />
      </div>
      <PopUp mode={courses.popUp.isOpen} />
    </div>
  )
})

export default App
