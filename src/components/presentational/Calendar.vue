<template>
  <table class="table-condensed">
    <thead>
      <tr>
        <th
          :style="showOperation === false ? 'opacity: 0;' : ''"
          class="prev available"
          @click="prevMonth"
        >
          <span v-if="position === 'left'" />
        </th>
        <th v-if="showDropdown" colspan="5" class="month">
          <div class="row mx-1">
            {{ year }}
            <!--
            <input type="text" v-model="year" class="yearselect col" />
            -->
            <select v-model="month" class="monthselect col">
              <option
                v-for="m in months"
                :key="m.value"
                :value="m.value"
                :tabindex="m.value"
                :selected="
                  isCurrent === true
                    ? m.value === isSameMonth(`${year}/${m.value}`)
                    : false
                "
              >
                {{ m.text }}
              </option>
            </select>
          </div>
        </th>
        <th v-else colspan="5" class="month">
          {{ `${year}年 ${monthName.text}` }}
        </th>
        <th
          :style="showOperation === false ? 'opacity: 0;' : ''"
          class="next available"
          @click="nextMonth"
        >
          <span
            v-if="
              singleDatePicker === true ||
              (singleDatePicker === false && position === 'right')
            "
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th v-for="weekDay in daysOfWeek" :key="weekDay.value" class="weekday">
          {{ weekDay.text }}
        </th>
      </tr>
      <tr v-for="(dateRow, index) in calendar" :key="index">
        <slot v-for="(date, idx) in dateRow" name="date-slot">
          <td
            :key="idx"
            :class="dayClass(date)"
            @click="$emit('dateClick', date)"
            @mouseover="$emit('hoverDate', date)"
          >
            {{ date.getDate() }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import DateUtil from '@/utils/native'
import { DAY_OF_WEEKS, MONTH_LIST } from '@/utils/custom'
import { CalendarData, Locale } from '@/types'

export default Vue.extend({
  props: {
    monthDate: {
      type: Date as PropType<Date>,
      required: true
    },
    localeData: {
      type: Object as PropType<object>,
      required: true
    },
    start: {
      type: String || Date,
      default() {
        return ''
      }
    },
    end: {
      type: String || Date,
      default() {
        return null
      }
    },
    minDate: {
      type: String as PropType<string>,
      default() {
        return null
      }
    },
    maxDate: {
      type: String as PropType<string>,
      default() {
        return null
      }
    },
    isCurrent: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showDropdown: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showOperation: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    singleDatePicker: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    position: {
      type: String as PropType<string>,
      default: 'left'
    }
  },
  data(): CalendarData {
    return {
      currentMonthDate: this.monthDate || this.start || new Date(),
      daysOfWeek: DAY_OF_WEEKS,
      monthList: MONTH_LIST
    }
  },
  computed: {
    monthName(): object {
      return this.monthList[this.currentMonthDate.getMonth()]
    },
    year: {
      get(): number {
        return this.currentMonthDate.getFullYear()
      },
      set(value: any): void {
        const newDate: Date = DateUtil.validateDateRange(
          new Date(value, this.month, 1),
          this.minDate,
          this.maxDate
        )

        this.$emit('change-month', {
          month: newDate.getMonth(),
          year: newDate.getFullYear()
        })
      }
    },
    month: {
      get(): number {
        return this.currentMonthDate.getMonth() + 1
      },
      set(value: any): void {
        const newDate: Date = DateUtil.validateDateRange(
          new Date(this.year, value - 1, 1),
          this.minDate,
          this.maxDate
        )

        this.$emit('change-month', {
          month: newDate.getMonth(),
          year: newDate.getFullYear()
        })
      }
    },
    calendar(): Array<Array<number | Date>> {
      let month = this.month
      let year = this.currentMonthDate.getFullYear()
      let firstDay = new Date(year, month - 1, 1)
      let lastMonth = DateUtil.prevMonth(firstDay).getMonth() + 1
      let lastYear = DateUtil.prevMonth(firstDay).getFullYear()
      let daysInLastMonth = new Date(lastYear, month - 1, 0).getDate()

      let dayOfWeek = firstDay.getDay()

      let calendar: Array<Array<number | Date>> = []

      for (let i = 0; i < 6; i++) {
        calendar[i] = []
      }

      let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1
      if (startDay > daysInLastMonth) startDay -= 7

      if (dayOfWeek === this.locale.firstDay) startDay = daysInLastMonth - 6

      let curDate = new Date(lastYear, lastMonth - 1, startDay, 12, 0, 0)
      for (
        let i = 0, col = 0, row = 0;
        i < 6 * 7;
        i++, col++, curDate.setDate(curDate.getDate() + 1)
      ) {
        if (i > 0 && col % 7 === 0) {
          col = 0
          row++
        }
        calendar[row][col] = new Date(curDate.getTime())
      }

      return calendar
    },
    months(): Array<{
      text: string
      value: number
    }> {
      let monthsData = this.monthList.map((m) => ({
        text: m.text,
        value: m.value
      }))

      if (this.maxDate && this.minDate) {
        let y: number =
          new Date(this.maxDate).getFullYear() -
          new Date(this.minDate).getFullYear()
        if (y < 2) {
          let months: number[] = []
          if (y < 1) {
            for (
              let i: number = new Date(this.minDate).getMonth();
              i <= new Date(this.maxDate).getMonth();
              i++
            ) {
              months.push(i)
            }
          } else {
            for (let i = 0; i <= new Date(this.maxDate).getMonth(); i++) {
              months.push(i)
            }
            for (let i = new Date(this.minDate).getMonth(); i < 12; i++) {
              months.push(i)
            }
          }

          if (months.length > 0) {
            return monthsData.filter((m: { text: string; value: number }) => {
              return (months.find((i) => m.value === i) as number) > -1
            })
          }
        }
      }

      return monthsData
    },
    locale(): Locale | object | any {
      return DateUtil.localeData(this.localeData)
    }
  },
  watch: {
    monthDate(value): void {
      this.changeMonthDate(value, false)
    }
  },
  methods: {
    isSameMonth(date: string) {
      return DateUtil.isSame(this.start, date, 'month')
    },
    prevMonth() {
      if (this.showOperation === true) {
        if (this.position === 'left') {
          this.changeMonthDate(DateUtil.prevMonth(this.currentMonthDate))
        }
      }
    },
    nextMonth() {
      if (this.singleDatePicker === false) {
        if (this.showOperation === true) {
          if (this.position === 'right') {
            this.changeMonthDate(DateUtil.nextMonth(this.currentMonthDate))
          }
        }
      } else {
        if (this.showOperation === true) {
          this.changeMonthDate(DateUtil.nextMonth(this.currentMonthDate))
        }
      }
    },
    changeMonthDate(date: Date, emit = true) {
      let yearMonth = DateUtil.yearMonthFormat(this.currentMonthDate)
      this.currentMonthDate = DateUtil.validateDateRange(
        date,
        this.minDate,
        this.maxDate
      )
      if (
        emit &&
        yearMonth !== DateUtil.yearMonthFormat(this.currentMonthDate)
      ) {
        this.$emit('change-month', {
          month: this.currentMonthDate.getMonth(),
          year: this.currentMonthDate.getFullYear()
        })
      }
    },
    dayClass(date: Date) {
      let dt = new Date(date)
      dt.setHours(0, 0, 0, 0)
      let start = new Date(this.start)
      start.setHours(0, 0, 0, 0)
      let end = new Date(this.end)
      end.setHours(0, 0, 0, 0)

      let classes = {
        off: date.getMonth() + 1 !== this.month,
        weekend: date.getDay() === 6 || date.getDay() === 0,
        today: dt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0),
        active:
          dt.setHours(0, 0, 0, 0) ==
            new Date(this.start).setHours(0, 0, 0, 0) ||
          dt.setHours(0, 0, 0, 0) == new Date(this.end).setHours(0, 0, 0, 0),
        'in-range': dt >= start && dt <= end,
        'start-date': dt.getTime() === start.getTime(),
        'end-date':
          dt.getTime() === end.getTime() ||
          // disabled: (this.minDate && dt.getTime() < this.minDate.getTime())
          (this.maxDate && dt.getTime() > new Date(this.maxDate).getTime())
      }

      return classes
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/calendar';
</style>
