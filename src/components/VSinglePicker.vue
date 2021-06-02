<template>
  <div @click.stop>
    <button-comp
      :id="id !== '' ? `${id}-button` : 'button'"
      :text="dateText"
      fill="text"
      size="sm"
      :icons-before="['fa', 'calendar']"
      :icons-after="['fa', 'angle-down']"
      @handleClick="togglePicker(null, true)"
    />

    <transition name="slide-fade" mode="out-in">
      <div
        v-if="isOpen"
        :class="pickerClasses"
        :style="pickerStyles"
        class="vue-single-picker ltr"
      >
        <div class="drp-buttons">
          <div style="margin-right: 12px" class="input-group start">
            <label>日付</label>
            <input :value="dateText" @blur="updateText" />
          </div>
          <button-comp
            v-if="clear"
            text="クリア"
            fill="text"
            style="display: block !important"
            :style="!isIe11 ? 'width: 100%;' : ''"
            @handleClick="clickAway"
          />
        </div>

        <div class="drp-calendar col left single">
          <div class="calendar-table">
            <calendar
              :month-date="monthDate"
              :locale-data="locale"
              :start="requestDate"
              :min-date="min"
              :max-date="max"
              :is-current="Boolean(true)"
              :show-dropdown="showDropdown"
              :show-operation="Boolean(true)"
              :single-date-picker="true"
              @change-month="changeLeftMonth"
              @dateClick="dateClick"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ButtonComp from './atoms/Button.vue'
import Calendar from './presentational/Calendar.vue'

import DateUtil from '@/utils/native'
import { isIe11 } from '@/utils/ua'

export default {
  components: {
    ButtonComp,
    Calendar
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: ''
    },
    minDate: {
      type: Date,
      default() {
        return null
      }
    },
    maxDate: {
      type: Date,
      default() {
        return null
      }
    },
    linkedCalendars: {
      type: Boolean,
      default: true
    },
    showDropdown: {
      type: Boolean,
      default: false
    },
    autoApply: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      default() {
        return ''
      }
    },
    opens: {
      type: String,
      default: 'center'
    },
    clear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let data = {}

    data.monthDate = new Date(this.date)
    data.requestDate = DateUtil.format(this.date, 'YYYY/MM/DD')

    data.isOpen = false

    data.locale = DateUtil.localeData()
    if (data.locale.firstDay !== 0) {
      let iterator = data.locale.firstDay
      while (iterator > 0) {
        // data.locale.daysOfWeek.push(data.locale.daysOfWeek.shift())
        iterator--
      }
    }

    return data
  },
  computed: {
    dateText() {
      if (DateUtil.isNullDate(this.requestDate)) {
        return ''
      }
      return this.requestDate
        ? DateUtil.format(this.requestDate, 'YYYY/MM/DD')
        : ''
    },
    min() {
      return this.minDate ? DateUtil.format(this.minDate, 'YYYY/MM/DD') : null
    },
    max() {
      return this.maxDate ? DateUtil.format(this.maxDate, 'YYYY/MM/DD') : null
    },
    pickerClasses() {
      return {
        'show-calendar': this.isOpen,
        single: true,
        'opens-right': this.opens === 'right',
        'opens-left': this.opens === 'left',
        'opens-center': this.opens === 'center',
        linked: this.linkedCalendars
      }
    },
    pickerStyles() {
      let yPos = 0

      if (document.getElementById('left-bottom-show') != null) {
        const el = document.getElementById('left-bottom-show')
        const rect = el.getBoundingClientRect()
        yPos = window.innerWidth - rect.left - rect.width
      }

      return {
        right: this.opens === 'left' ? `${yPos}px` : '',
        'margin-left': this.opens === 'left' ? '-400px' : ''
      }
    },
    isClear() {
      return !this.requestDate
    },
    isIe11() {
      return isIe11()
    }
  },
  watch: {
    minDate() {
      let dt = DateUtil.validateDateRange(
        this.monthDate,
        this.minDate || new Date(),
        this.maxDate
      )
      this.changeLeftMonth({
        year: dt.getFullYear(),
        month: dt.getMonth()
      })
    },
    maxDate() {
      let dt = DateUtil.validateDateRange(
        this.nextMonthDate,
        this.minDate,
        this.maxDate || new Date()
      )
      this.changeRightMonth({
        year: dt.getFullYear(),
        month: dt.getMonth()
      })
    },
    isOpen: {
      handler(value) {
        if (typeof document === 'object')
          this.$nextTick(() => {
            value
              ? document.body.addEventListener('click', this.clickAway)
              : document.body.removeEventListener('click', this.clickAway)
          })
      },
      immediate: true
    }
  },
  methods: {
    changeLeftMonth(value) {
      let newDate = new Date(value.year, value.month, 1)
      this.monthDate = newDate
      if (
        this.linkedCalendars ||
        DateUtil.yearMonthFormat(this.monthDate) >=
          DateUtil.yearMonthFormat(this.nextMonthDate)
      ) {
        this.nextMonthDate = DateUtil.validateDateRange(
          DateUtil.nextMonth(newDate),
          this.minDate,
          this.maxDate
        )
        if (
          DateUtil.yearMonthFormat(this.monthDate) ===
          DateUtil.yearMonthFormat(this.nextMonthDate)
        ) {
          this.monthDate = DateUtil.validateDateRange(
            DateUtil.prevMonth(this.monthDate),
            this.minDate,
            this.maxDate
          )
        }
      }
    },
    changeRightMonth(value) {
      let newDate = new Date(value.year, value.month, 1)
      this.nextMonthDate = newDate
      if (
        this.linkedCalendars ||
        DateUtil.yearMonthFormat(this.nextMonthDate) <=
          DateUtil.yearMonthFormat(this.monthDate)
      ) {
        this.monthDate = DateUtil.validateDateRange(
          DateUtil.prevMonth(newDate),
          this.minDate,
          this.maxDate
        )
        if (
          DateUtil.yearMonthFormat(this.monthDate) ===
          DateUtil.yearMonthFormat(this.nextMonthDate)
        ) {
          this.nextMonthDate = DateUtil.validateDateRange(
            DateUtil.nextMonth(this.nextMonthDate),
            this.minDate,
            this.maxDate
          )
        }
      }
    },
    updateText(e) {
      const value = e.target.value
      this.requestDate = DateUtil.updateDate(value, this.requestDate)
    },
    dateClick(value) {
      this.requestDate = DateUtil.format(value, 'YYYY/MM/DD')
      if (this.autoApply) {
        this.clickedApply()
      }
    },
    togglePicker(value, event) {
      if (typeof value === 'boolean') {
        this.isOpen = value
      } else {
        this.isOpen = !this.isOpen
      }

      if (event === true) this.$emit('toggle', this.isOpen, this.togglePicker)
    },
    clickedApply() {
      this.togglePicker(false, true)
      this.$emit('update', DateUtil.format(this.requestDate, 'YYYY/MM/DD'))
    },
    clickAway() {
      if (this.isOpen) {
        this.requestDate = this.requestDate
          ? DateUtil.format(this.requestDate, 'YYYY/MM/DD')
          : null
        this.togglePicker(false, true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/picker';

.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
