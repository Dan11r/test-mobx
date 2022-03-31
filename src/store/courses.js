import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class Courses {
  rateData = []
  popUp = { isOpen: false, dataForDays: [] }
  constructor() {
    makeAutoObservable(this)
  }

  async setLatestRateData() {
    try {
      let { data } = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      let arrayOfValute = []

      for (let key in data.Valute) {
        arrayOfValute = [...arrayOfValute, data.Valute[key]]
      }

      arrayOfValute.forEach((v) => {
        v.Trend = ((v.Value / v.Previous) * 100 - 100).toFixed(2)
        v.Value = (v.Value / v.Nominal).toFixed(2)
        v.Previous = (v.Previous / v.Nominal).toFixed(2)
      })

      this.rateData = [{ ...data, Valute: arrayOfValute }]
    } catch (error) {
      this.rateData = [
        {
          Valute: [{ CharCode: 'НЕТ ДАННЫХ...', Value: 'НЕТ ДАННЫХ...', Previous: 0 }],
        },
      ]
      console.log(error)
    }
  }
  async setPreviousRateData() {
    for (let i = 1; i < 10; i++) {
      let { data } = await axios.get(this.rateData[this.rateData.length - i].PreviousURL)
      this.rateData = [data, ...this.rateData]
    }
  }
  // async openPopUp(ID) {
  //   // for (let i = 1; i < 10; i++) {
  //   //   let { data } = await axios.get(this.rateData[this.rateData.length - i].PreviousURL)

  //   //   let arrayOfValute = []

  //   //   for (let key in data.Valute) {
  //   //     arrayOfValute = [...arrayOfValute, data.Valute[key]]
  //   //   }
  //   //   this.rateData = [{ ...data, Valute: arrayOfValute }, ...this.rateData]
  //   // }

  //   this.popUp.isOpen = true
  //   // this.rateData.forEach((d) => {
  //   //   const arrValute = d.Valute
  //   //   this.popUp.dataForDays.push(arrValute.filter((v) => v.ID === ID))
  //   // })
  // }
}
export default new Courses()
