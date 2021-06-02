import { Locale } from '../types'

const DateUtil = {
  /**
   * Check same date
   * @param date1
   * @param date2
   * @param granularity
   */
  isSame(
    date1: string | Date,
    date2: string | Date,
    granularity: string = 'date'
  ) {
    const dt1 = new Date(date1)
    const dt2 = new Date(date2)
    if (granularity === 'date') {
      return dt1.getTime() === dt2.getTime()
    }
    return false
  },
  /**
   * Check null date
   * @param value
   */
  isNullDate(value: string) {
    if (Number(new Date(value)) === Number(new Date(null))) {
      return true
    }
    return false
  },
  isBefore(
    date1: string | Date,
    date2: string | Date,
    granularity: string = 'date'
  ) {
    const dt1 = new Date(date1)
    const dt2 = new Date(date2)
    if (granularity === 'date') {
      return dt1.getTime() < dt2.getTime()
    }
    return false
  },
  /**
   * Get days in a month
   * @param year
   * @param month
   */
  daysInAMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate()
  },
  /**
   * Set format
   * @param date
   * @param mask
   */
  format(date: string, mask: string) {
    return this.formatDate(new Date(date), mask)
  },
  formatDate(date: string | any, mask: string) {
    if (!mask) mask = 'YYYY-MM-DD hh:mm:ss.SSS'
    mask = mask.replace(/YYYY/g, date.getFullYear())
    mask = mask.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    mask = mask.replace(/DD/g, ('0' + date.getDate()).slice(-2))
    mask = mask.replace(/hh/g, ('0' + date.getHours()).slice(-2))
    mask = mask.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    mask = mask.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    if (mask.match(/S/g)) {
      const milliSeconds = ('00' + date.getMilliseconds()).slice(-3)
      const length = mask.match(/S/g).length
      for (let i = 0; i < length; i++) {
        mask = mask.replace(/S/, milliSeconds.substring(i, i + 1))
      }
    }
    return mask
  },
  /**
   * Set year month format
   * @param date
   */
  yearMonthFormat(date: any) {
    const month = date.getMonth() + 1
    return date.getFullYear() + (month < 10 ? '0' : '') + month
  },
  /**
   * Go prev month
   * @param date
   */
  prevMonth(date: any) {
    const prevMonthDate = new Date(date.getTime())
    prevMonthDate.setDate(1)
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1)
    return prevMonthDate
  },
  /**
   * Go next month
   * @param date
   */
  nextMonth(date: any) {
    const nextMonthDate = new Date(date.getTime())
    nextMonthDate.setDate(1)
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)
    return nextMonthDate
  },
  /**
   * Valid date range
   * @param newDate
   * @param min
   * @param max
   */
  validateDateRange(newDate: any, min: string, max: string) {
    const maxDate = new Date(max)
    const minDate = new Date(min)

    if (max && newDate.getTime() > maxDate.getTime()) {
      return maxDate
    }

    if (min && newDate.getTime() < minDate.getTime()) {
      return minDate
    }

    return newDate
  },
  /**
   * Valid date
   * @param value
   */
  validDate(value: string) {
    const arr = value.split('/')
    if (arr.length !== 3) {
      return ''
    }

    let formattedValue: any = ''
    /* eslint-disable-next-line no-useless-escape */
    const reg =
      /^(?:(?!(?:[02468][1235679]|[13579][01345789])00[年\-\/]0?2[月\/\-](?:29|30)日?))(?:(?![0-9]{2}(?:[02468][1235679]|[13579][01345789])[年\-\/]0?2[月\/\-](?:29|30)日?))(?:(?![0-9]{4}[年\-\/](?:0?2|0?4|0?6|0?9|11)[月\/\-]31日?))([0-9]{4})[年\-\/](0?[1-9]|1[0-2])[月\/\-](0?[1-9]|[12][0-9]|3[01])日?$/
    /* eslint-disable-next-line no-cond-assign */
    return (formattedValue = reg.exec(value))
      ? new Date(formattedValue[1], formattedValue[2] - 1, formattedValue[3])
      : ''
  },
  /**
   * Update date
   * @param value
   * @param oldValue
   */
  updateDate(value: string, oldValue: string | any) {
    const replaced = value.replace(/\/0/g, '/')
    const result = this.validDate(replaced)
    return new Date(result !== '' ? replaced : oldValue)
  },
  /**
   * Locale data
   * @param options
   */
  localeData(options?: object): Locale | object {
    const defaultLocale: Locale = {
      direction: 'ltr',
      format: 'yyyy/mm/dd',
      firstDay: 0
    }

    return { ...defaultLocale, ...options }
  }
}

export default DateUtil
