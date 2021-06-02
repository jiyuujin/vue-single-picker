export type LocalData = {
  monthDate?: Date
  nextMonthDate?: Date
  start?: Date
  end?: Date
  inSelection?: boolean
  isOpen?: boolean
  locale?: Locale
}

export type CalendarData = {
  currentMonthDate: string | Date | any
  daysOfWeek: Array<{
    value: number
    text: string
  }>
  monthList: Array<{
    value: number
    text: string
  }>
}

export type CalendarTimeData = {
  hour: number
  minute: number
  second: number
  ampm: number
}

export type Locale = {
  direction: string
  format: string
  firstDay: number
}

export type DateRange = {
  startDate: string
  endDate?: string
}

export type LocaleData = {
  daysOfWeek: string[]
}
