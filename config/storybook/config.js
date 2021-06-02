import { configure, addDecorator } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'

const req = require.context('../../src/stories', true, /.stories.ts$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

addDecorator(() => ({
  template: '<story/>'
}))

// 言語を切り替えるため全てのストーリーでknobsを使う
addDecorator(withKnobs)
