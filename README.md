# vue-single-picker

## Installation

Install [vue-single-picker](https://www.npmjs.com/package/v-single-picker) package.

```bash
npm i vue-single-picker

yarn add vue-single-picker
```

### Configuration

You can use as general CSS frameworks.

```js
import Vue from 'vue'
import { CoreUI } from 'vue-single-picker'
import 'vue-single-picker/dist/vue-single-picker.css'

Vue.use(CoreUI)
```

### Props

```html
<v-single-picker
    ref="single-picker"
    :show-dropdown="showDropdown"
    :auto-apply="autoApply"
    :linked-calendars="linkedCalendars"
    :date="date"
    :opens="opens"
    @update="updateValues"
    @toggle="checkOpen"
>
    <div slot="input" slot-scope="picker" style="min-width: 350px;">
        {{ picker }}
    </div>
</v-single-picker>
```

`date` is required, please format in `dayjs` plugin

| # | Type | Default |
|:---|:---|:---|
| minDate | `Date` | `` |
| maxDate | `Date` | `` |
| linkedCalendars | `Boolean` | `true` |
| showDropdown | `Boolean` | `false` |
| date | `string` | `` |
| localeData | `Object` | `` |
| opens | `String` | `center` ( `left` / `right` ) |
