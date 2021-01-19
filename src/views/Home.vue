<template>
  <div class="page-wrapper">
    <div
      class="scaleWrap cnt10"
    >
      <div class="scaleCon">
        <vue-slider
          ref="slider"
          v-model="scaleValue.score"
          style="padding:0;width:100%;"
          v-bind="options"
        />
        <div class="answerScale">
          <div class="markingBox">
            <div class="marking">
              <ul class="line">
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      scaleValue: { score: 0, complete: true },
      inter: null,
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: this.scaleHeight,
        contained: false,
        direction: 'btt',
        data: null,
        min: 0,
        max: 10,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.3,
        adsorb: false,
        lazy: false,
        tooltip: 'always',
        tooltipPlacement: 'right',
        tooltipFormatter: '',
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: true,
        enableCross: true,
        fixed: false,
        minRange: 0,
        maxRange: 0,
        order: true,
        marks: false,
        dotOptions: false,
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
    cssScaleHeight() {
      return (99.71 * this.WIDTH) / 100
    },
    scaleHeight() {
      return this.HEIGHT - this.cssScaleHeight - this.getSafeArea.bottom
    }
  },
  methods: {
    getSafeArea() {
      const div = document.createElement('div')
      div.style.padding =
        'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
      document.body.appendChild(div)
      const compu = getComputedStyle(div)
      const result = {
        top: parseInt(compu.paddingTop, 0) || 0,
        right: parseInt(compu.paddingRight, 0) || 0,
        bottom: parseInt(compu.paddingBottom, 0) || 0,
        left: parseInt(compu.paddingLeft, 0) || 0
      }
      document.body.removeChild(div)
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 3rem;
  }

  .home-page-title {
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #5d6788;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }

  .scaleWrap{
    height: calc(100vh - 72.5vw);
    height: calc(100vh - 72.5vw - env(safe-area-inset-bottom));
    position:absolute;
    width:100%;
    left:0;
    overflow: hidden;
    padding-top:7.5vw;
    top:57.77vw;
    .vue-slider{
      // width:calc(100% + 12.77vw);
      height:calc(100vh - 99.71vw) !important;
      height:calc(100vh - 99.71vw - env(safe-area-inset-bottom)) !important;
      // padding-bottom:19.44vw !important;
      // padding-bottom:calc(19.44vw  - env(safe-area-inset-bottom)) !important;
      .vue-slider-dot{
        left:0 !important;
        .vue-slider-dot-tooltip-right{
          right:auto;
          left:12.5vw;
          top:0;
          transform:translate(0);
          .vue-slider-dot-tooltip-inner{
            font-size:16.66vw;
            line-height:1.3;
            color:#222;
            background-color: transparent;
            padding:0;
            min-width: auto;
            border-color: transparent;
            border-radius: 0;
            font-weight:700;
          }
          .vue-slider-dot-tooltip-inner-right::after{
            content:none;
          }
        }
      }
      .vue-slider-dot-handle{
        display:none !important;
      }
      .vue-slider-dot-handle-focus{
        -webkit-box-shadow:none !important;
        box-shadow: none !important;
      }
    }
    .vue-slider-rail, .vue-slider-process{
      border-radius: 0;
    }
    .vue-slider-rail{
      background-color:#fff;
    }
    .vue-slider-process{
      background-color:#FFBB31;
    }
    .answerScale{
      width:auto;
      height:100%;
      position: absolute;
      top:0;
      right:0;
      z-index:1;
      .markingBox{
        height: 100%;
        padding-bottom:19.44vw;
        padding-bottom:calc(19.44vw - env(safe-area-inset-bottom));
        .marking{
          position: relative;
          text-align: right;
          padding-right:7.22vw;
          p{
            position: absolute;
            font-size:3.05vw;
            line-height:1.1;
            right:0;
            width:21.16vw;
            &.top{
              top:-6.06vw;
              right:7.22vw;
            }
            &.bottom{
              bottom:-6.06vw;
              right:7.22vw;
            }
          }
          ul.line{
            position: relative;
            height:calc(100vh - 99.71vw);
            height:calc(100vh - 99.71vw - env(safe-area-inset-bottom));
            li{
              height:100%;
              position: relative;
              &::before{
                content:'';
                position: absolute;
                width:6.66vw;
                height:1px;
                background:#222;
                right:0;
                top:0;
              }
              &:first-child::before{
                content:none;
              }
              &:last-child::before{
                content:none;
              }
              // &:nth-child(6)::before{
              //     width:12.22vw;
              // }
            }
            &::before, &::after{
              content:'';
              position: absolute;
              width:12.22vw;
              height:1px;
              background:#222;
              right:0;
              top:0;
            }
            &::after{
              top:auto;
              bottom:0;
            }
          }
        }
      }
    }
    .scaleCon{
      position: relative;
      height:100%;
      background-color:#FFBB31;
      -webkit-transition: background-color 0.3s;
      transition: background-color 0.3s;
    }
    &.reverse{
      .scaleCon{
        background-color:#444444;
        -webkit-transition: background-color 0.3s;
        transition: background-color 0.3s;
      }
      .vue-slider-process{
        background-color:#444444;
      }
      .answerScale .markingBox .marking ul.line::before,
      .answerScale .markingBox .marking ul.line::after{
        background:#999;
      }
      .answerScale .markingBox .marking ul.line li::before{
        background:#999;
      }
      .answerScale .markingBox .marking p{
        color:#999;
      }
      .vue-slider .vue-slider-dot .vue-slider-dot-tooltip-right .vue-slider-dot-tooltip-inner{
        color:#fff;
      }
    }

  }
}
</style>
