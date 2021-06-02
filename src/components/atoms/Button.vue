<template>
  <a
    :id="id"
    :style="getStyles"
    class="atoms-button"
    @click.prevent="$emit('handleClick')"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: String as PropType<string>,
      default: ''
    },
    text: {
      type: String as PropType<string>,
      default: ''
    },
    width: {
      type: String as PropType<string>,
      default: 'auto'
    },
    fill: {
      type: String as PropType<string>,
      default: 'bg',
      validator(val) {
        return ['bg', 'text'].includes(val)
      }
    },
    variant: {
      type: String as PropType<string>,
      default: 'primary',
      validator(val) {
        return ['primary', 'success', 'info', 'warning', 'danger'].includes(val)
      }
    },
    border: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  computed: {
    getStyles: function () {
      let colorCode: string = ''
      if (this.variant === 'primary') {
        colorCode = '#0084cf'
      } else if (this.variant === 'success') {
        colorCode = '#5cb85c'
      } else if (this.variant === 'info') {
        colorCode = '#5bc0de'
      } else if (this.variant === 'warning') {
        colorCode = '#f0ad4e'
      } else if (this.variant === 'danger') {
        colorCode = '#d80011'
      }

      let style = {}

      style = Object.assign({ width: this.width }, style)

      if (this.fill === 'bg') {
        style = Object.assign(
          {
            color: '#fff',
            'background-color': colorCode
          },
          style
        )
      } else {
        if (!this.border) {
          style = Object.assign(
            {
              color: colorCode,
              'background-color': '#303030'
            },
            style
          )
        } else {
          style = Object.assign(
            {
              color: colorCode,
              'background-color': '#fff'
            },
            style
          )
        }
      }

      if (this.border === true) {
        style = Object.assign(
          {
            border: `1px solid ${colorCode}`
          },
          style
        )
      }
      return style
    }
  }
})
</script>

<style lang="scss" scoped>
.atoms-button {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem;
  text-decoration: none;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  line-height: 1;
  white-space: nowrap;
}
</style>
