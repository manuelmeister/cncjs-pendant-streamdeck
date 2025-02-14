import { isObject } from 'lodash/lang'
import { defineStore } from 'pinia'

const streamdeckFields = [
  'bgColor',
  'brightness',
  'columns',
  'rows',
  'font',
  'fontSize',
  'gcodeColors',
  'gcodeLimit',
  'lineHeight',
  'palette',
  'progressColor',
  'textColor',
  'textShadow',
]
const streamdeckGetters = streamdeckFields.reduce((fields, fieldName) => {
  fields[fieldName] = (state) =>
    state.web || state._streamdeckOverride[fieldName] !== true
      ? state[`_${fieldName}`]
      : (state._streamdeckConfig[fieldName] ?? state[`_${fieldName}`])
  return fields
}, {})

export const useUiStore = defineStore({
  id: 'ui',

  state: () => ({
    active: true,
    activityTimeout: null,
    asleep: false,
    _bgColor: 2,
    _brightness: 60,
    _columns: 5,
    _font: 'monospace',
    _fontSize: 12,
    _lineHeight: 1.1,
    editor: false,
    feedrateInterval: 1,
    spindleInterval: 1,
    fileDetailsPath: null,
    fileDetails: {},
    fileDetailsSort: 'alpha_asc',
    _gcodeColors: {},
    _gcodeLimit: 0,
    iconSize: 72,
    input: {
      value: '',
      previous: 0,
      type: '',
      callback: () => {},
    },
    pageColor: '#111111',
    _palette: ['#000000', '#ffffff'],
    _progressColor: 4,
    _rows: 3,
    sceneStack: ['home'],
    textSize: 1,
    _textColor: 1,
    _textShadow: false,
    throttle: 0,
    timeout: 0,
    userFlags: {},
    web: true,

    _streamdeckConfig: {},
    _streamdeckOverride: {
      bgColor: false,
      brightness: false,
      columns: false,
      font: false,
      fontSize: false,
      lineHeight: false,
      gcodeColors: false,
      gcodeLimit: false,
      palette: false,
      progressColor: false,
      rows: false,
      textColor: false,
      textShadow: false,
    },
  }),

  getters: {
    _output: (state) => {
      const fields = [
        '_bgColor',
        '_brightness',
        '_columns',
        '_font',
        '_fontSize',
        '_lineHeight',
        '_gcodeColors',
        '_gcodeLimit',
        'pageColor',
        '_palette',
        '_progressColor',
        '_rows',
        '_textColor',
        '_textShadow',
        'textSize',
        'throttle',
        'timeout',
      ]

      return fields.reduce((config, field) => {
        const saveField = field.startsWith('_') ? field.slice(1) : field

        if (state[field] != null) {
          config[saveField] = state[field]
        }
        return config
      }, {})
    },
    _streamdeckOutput: (state) => {
      const config = {}
      Object.entries(state._streamdeckConfig).forEach(([key, value]) => {
        if (
          state._streamdeckOverride[key] &&
          state._streamdeckConfig[key] != null
        ) {
          config[key] = state._streamdeckConfig[key]
        }
      })
      return config
    },
    sceneName: (state) => {
      return state.sceneStack[state.sceneStack.length - 1]
    },
    fileDetailSize: (state) => {
      if (!state.fileDetails) {
        return '0'
      }
      const size = state.fileDetails.size
      if (size > 1024) {
        const digits = size > 5120 ? 0 : 1
        return `${+(size / 1024).toFixed(digits)}K`
      } else {
        return `${size}`
      }
    },
    fileDetailModifiedTime: (state) => {
      if (!state.fileDetails) {
        return ''
      }
      return new Date(state.fileDetails.mtime).toLocaleString()
    },
    fileDetailCreatedTime: (state) => {
      if (!state.fileDetails) {
        return ''
      }
      return new Date(state.fileDetails.ctime).toLocaleString()
    },
    displayBrightness: (state) => state.brightness,
    ...streamdeckGetters,
  },

  actions: {
    addInput(chars) {
      const inputTest = /^-?(0|[1-9]\d*)?(?:\.\d*)?$/
      // trim leading zeroes followed by non-zeroes
      const newValue = (this.input.value + chars).replace(/^0+(?=[1-9]|0)/, '')
      if (inputTest.test(newValue)) {
        this.input.value = newValue
      }
    },
    toggleInputSign() {
      if (this.input.value.startsWith('-')) {
        this.input.value = this.input.value.slice(1)
      } else {
        this.input.value = '-' + this.input.value
      }
    },
    startInput(value, type, scene = 'numpad', callback = () => {}) {
      this.input.value = ''
      this.input.previous = value
      this.input.type = type
      this.input.callback = callback
      this.goToScene(scene)
    },
    completeInput() {
      this.input.callback(this.input.value)
      this.input.value = ''
      this.goBack()
    },
    toggleFeedrateInterval() {
      this.feedrateInterval = this.feedrateInterval === 1 ? 10 : 1
    },
    toggleSpindleInterval() {
      this.spindleInterval = this.spindleInterval === 1 ? 10 : 1
    },
    setStreamdeckConfig(config) {
      this._streamdeckConfig = config ?? {}
      // establish override value
      for (const [key, value] of Object.entries(this._streamdeckConfig)) {
        if (value != null && this._streamdeckOverride.hasOwnProperty(key)) {
          this._streamdeckOverride[key] = true
        }
      }
    },
    setWebConfig(config) {
      this.webConfig = config
    },
    setGrid(rows, columns) {
      if (rows && columns) {
        this._columns = columns
        this._rows = rows
      }
    },
    setBgColor(color) {
      this._bgColor = color
    },
    clearUserFlag(id) {
      delete this.userFlags[id]
    },
    setBrightness(brightness) {
      if (brightness != null) {
        this._brightness = Math.max(Math.min(100, brightness), 10)
      }
    },
    setIconSize(size) {
      this.iconSize = size
    },
    setGcodeColors(colors) {
      if (!colors) {
        return
      }
      this._gcodeColors = colors
    },
    activity() {
      this.active = true
      clearTimeout(this.activityTimeout)
      this.activityTimeout = setTimeout(this.inactive.bind(this), this.timeout)
    },
    inactive() {
      this.active = false
    },
    decreaseBrightness() {
      this.setBrightness(this.brightness - 10)
    },
    increaseBrightness() {
      this.setBrightness(this.brightness + 10)
    },
    setGcodeLimit(limit) {
      this._gcodeLimit = limit
    },
    setTextSize(size) {
      this.textSize = size
    },
    setTimeout(timeout) {
      this.timeout = timeout
    },
    setWeb(web) {
      this.web = !!web
    },
    setUserFlag(id, value) {
      this.userFlags[id] = value
    },
    setProgressColor(color) {
      this._progressColor = color
    },
    setPalette(colors) {
      if (colors) {
        this._palette = colors
      }
    },
    setThrottle(throttle) {
      if (throttle != null) {
        const millis = parseInt(throttle)
        if (millis) {
          this.throttle = millis
        }
      }
    },
    setScene(scene) {
      this.sceneStack.splice(0)
      this.sceneStack.push(scene)
    },
    swapScene(scene) {
      this.sceneStack.splice(this.sceneStack.length - 1, 1, scene)
    },
    goToScene(scene) {
      if (this.sceneName !== scene) {
        this.sceneStack.push(scene)
      }
    },
    renameScene(oldName, newName) {
      this.sceneStack.forEach((scene, index) => {
        if (scene === oldName) {
          this.sceneStack[index] = newName
        }
      })
    },
    deleteScene(sceneName) {
      this.sceneStack = this.sceneStack.filter((scene) => scene !== sceneName)
      if (this.sceneStack.length === 0) {
        this.sceneStack.push('home')
      }
    },
    deletePalette(index) {
      this._palette.splice(index, 1)
      // TODO: Update color settings and button backgrounds
    },

    goBack(count = 1) {
      if (this.sceneStack.length > 1) {
        this.sceneStack.splice(-count, count)
      }
    },
  },
})
