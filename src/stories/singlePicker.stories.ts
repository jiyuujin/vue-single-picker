import { storiesOf } from '@storybook/vue'
import dayjs from 'dayjs'

// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

// import JRangePicker from '@/components/modules/RangePicker/JRangePicker.vue'
import VSinglePicker from '@/components/VSinglePicker.vue'

storiesOf('Single Picker', module)
  .add('single', () => ({
    components: {
      VSinglePicker
    },
    template: `
      <div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-single-picker
              ref="single-picker"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date="date"
              opens="right"
              @update="updateValue"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker }}
              </div>
            </v-single-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-single-picker
              ref="single-picker"
              button-name="left-bottom-show"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date="date"
              opens="left"
              @update="updateValue"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker }}
              </div>
            </v-single-picker>
          </div>
        </div>

        <div style="margin: 4px;">
          Single Picker with Clear Button
        </div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-single-picker
              ref="single-picker"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :clear="clear"
              :date="date"
              opens="right"
              @update="updateValue"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker }}
              </div>
            </v-single-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-single-picker
              ref="single-picker"
              button-name="left-bottom-show"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :clear="clear"
              :date="date"
              opens="left"
              @update="updateValue"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker }}
              </div>
            </v-single-picker>
          </div>
        </div>

        <div style="margin: 4px;">
          Single Picker, select a month by pull-down selection
        </div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-single-picker
              ref="single-picker"
              :show-dropdown="showDropdown"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date="date"
              opens="right"
              @update="updateValue"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker }}
              </div>
            </v-single-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-single-picker
              ref="single-picker"
              button-name="left-bottom-show"
              :show-dropdown="showDropdown"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date="date"
              opens="left"
              @update="updateValue"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker }}
              </div>
            </v-single-picker>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        singleDatePicker: true as boolean,
        showDropdown: true as boolean,
        autoApply: true as boolean,
        linkedCalendars: true as boolean,
        clear: true as boolean,
        requestDate: dayjs().format('YYYY/MM/DD') as string
      }
    },
    computed: {
      date: {
        get(): string {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          return this.requestDate
        },
        set(text: string): void {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          this.requestDate = text
        }
      }
    },
    methods: {
      updateValue(text: string): void {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          this.requestDate = text
      },
      checkOpen(open: any): void {
        // console.log('event: ' + open)
      }
      // dateFormat(classes: any, date: Date) {
      //   // disabledのオプションを付けるなら
      //   let yesterday = dayjs().subtract(1, 'day')
      //   if (!classes.disabled) {
      //       classes.disabled = dayjs(date).isSame(yesterday, 'day')
      //   }
      //   return classes
      // }
    }
  }))
