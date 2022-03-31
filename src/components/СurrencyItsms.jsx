import React from 'react'

import courses from './../store/courses'
import { observer } from 'mobx-react-lite'
import ReactTooltip from 'react-tooltip'

export const СurrencyItsms = observer(() => {
  return (
    <>
      {courses.rateData.length > 0 &&
        courses.rateData[courses.rateData.length - 1].Valute.map((el, i) => (
          <div
            onClick={() => courses.openPopUp(el.ID)}
            key={el.Name || i + el}
            className="valute-item">
            <div data-tip data-for={el.ID}>
              {el.CharCode}
            </div>
            <div>{el.Value} руб</div>
            <div>
              {el.Trend}%
              {el.Value > el.Previous ? (
                <span className="up">↑</span>
              ) : (
                <span className="down">↓</span>
              )}
            </div>
            <ReactTooltip id={el.ID} place="bottom" effect="solid">
              {el.Name}
            </ReactTooltip>
          </div>
        ))}
    </>
  )
})
