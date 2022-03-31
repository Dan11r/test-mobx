import React from 'react'
import { observer } from 'mobx-react-lite'

export const PopUp = observer(({ mode }) => {
  const [popUpActive, setPopUpActive] = React.useState(!!mode)

  function onClickClose(e) {
    setPopUpActive(false)
  }
  return (
    <>
      {popUpActive && (
        <div className="pop-up">
          <div onClick={onClickClose} className="close-area"></div>
          <div className="pop-up__content">
            <div onClick={onClickClose} className="pop-up__close">
              Х
            </div>
            {Array(10)
              .fill(1)
              .map((e, i) => (
                <div key={e + i} className="pop-up__item">
                  <div className="pop-up__date">12/23/43</div>
                  <div className="pop-up__currency-value">54руб</div>
                  <div className="pop-up__currency-trend">
                    <span className="down">↓</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
})
