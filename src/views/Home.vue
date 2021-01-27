<template>
  <div class="content-wrapper">
    <vue-slider
      v-model="scaleValue.score"
      v-bind="options"
    />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  components: {
    VueSlider
  },
  data() {
    return {
      scaleValue: { score: 100000000 / 2, complete: true },
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: window.innerHeight - (35 * window.innerWidth) / 100,
        contained: false,
        direction: 'btt',
        data: null,
        min: 24000000,
        max: 100000000,
        interval: 1000000,
        disabled: false,
        clickable: true,
        duration: 0.3,
        adsorb: false,
        lazy: false,
        tooltip: 'always',
        tooltipPlacement: 'left',
        tooltipFormatter: '',
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: true,
        enableCross: true,
        fixed: false,
        minRange: 0,
        maxRange: 0,
        order: false,
        marks: {
          '24000000': { label: '24,000,000' },
          '50000000': { label: '50,000,000' },
          '100000000': { label: '100,000,000' }
        },
        dotOptions: true,
        process: true,
        dotStyle: 0,
        railStyle: 0,
        processStyle: 0,
        tooltipStyle: 0,
        stepStyle: 0,
        stepActiveStyle: 0,
        labelStyle: 0,
        labelActiveStyle: 0
      }
    }
  },
  computed: {
    sliderHeight() {
      return (25 * this.WIDTH) / 100
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
.content-wrapper {
  position: relative;
  .vue-slider {
    .vue-slider-rail {
      .vue-slider-process {
        background-color: #FFBB31;
      }
    }
  }
}
.vue-slider-btt .vue-slider-mark-label {
  left: 0;
}

</style>
