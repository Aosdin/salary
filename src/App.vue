<template>
  <div id="app" data-app>
    <div class="main-wrapper">
      <div class="content-wrapper">
        <div class="info">
          <ul>
            <li>
              <span>국민연금 :</span>
              {{ Math.floor(nationalPension).toLocaleString() }}
            </li>
            <li>
              <span>건강보험 :</span>
              {{ Math.floor(healthInsurance).toLocaleString() }}
            </li>
            <li>
              <span>고용보험 :</span>
              {{ Math.floor(employmentInsurance).toLocaleString() }}
            </li>
            <li>
              <span>소득세 :</span>
              {{ Math.floor(income).toLocaleString() }}
            </li>
            <li>
              <span>지방 소득세 :</span>
              {{ Math.floor(income / 10).toLocaleString() }}
            </li>
          </ul>
          <p>
            <span
              >월실수령액 : {{ Math.floor(realIncome).toLocaleString() }}</span
            >
          </p>
        </div>
        <vue-slider
          v-if="isSlider"
          v-model="scaleValue.score"
          class="salary"
          v-bind="options"
          :tooltip-formatter="v => v.toLocaleString()"
        />
        <v-dialog v-model="settingDialog" persistent max-width="600px">
          <v-card style="overflow: hidden">
            <v-card-title>
              <span class="headline">설정</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h4>인적공제 인원수</h4>
                    <vue-slider
                      ref="slider"
                      v-model="setting.v1"
                      v-bind="setting.v1Opt"
                      :tooltip-formatter="v => v.toLocaleString()"
                    ></vue-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h4>20세미만</h4>
                    <vue-slider
                      ref="slider"
                      v-model="v2"
                      v-bind="setting.v1Opt"
                      :tooltip-formatter="v => v.toLocaleString()"
                    ></vue-slider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="settingDialog = false">
                취소
              </v-btn>
              <v-btn color="blue darken-1" text @click="settingDialog = false">
                저장
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal>
  </div>
</template>
<script>
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'
import { Expo, TweenLite } from 'gsap/all'
import gabgeunse2021 from '@/assets/tax/gabgeunse2021.json'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    NewContentAvailableToastr,
    AppleAddToHomeScreenModal,
    VueSlider
  },
  data() {
    return {
      mapActions,
      isSlider: false,
      scaleValue: { score: 24000000, complete: true },
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: window.innerHeight - 100,
        contained: false,
        direction: 'btt',
        data: null,
        min: 24000000,
        max: 100000000,
        interval: 100000,
        disabled: false,
        clickable: true,
        duration: 0.3,
        adsorb: false,
        lazy: false,
        tooltip: 'always',
        tooltipFormatter: '',
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: true,
        enableCross: true,
        fixed: false,
        minRange: 0,
        maxRange: 0,
        order: false,
        marks: false,
        dotOptions: true,
        process: true,
        dotStyle: 10,
        railStyle: 0,
        processStyle: 0,
        tooltipStyle: 0,
        stepStyle: 0,
        stepActiveStyle: 0,
        labelStyle: 0,
        labelActiveStyle: 0
      },
      setting: {
        v1: 1,
        v2: 0,
        v1Opt: {
          data: null,
          min: 1,
          max: 10,
          interval: 1,
          disabled: false,
          clickable: true,
          duration: 0.3,
          adsorb: false,
          lazy: false,
          tooltip: 'always',
          tooltipPlacement: 'bottom',
          tooltipFormatter: '',
          useKeyboard: false,
          keydownHook: null,
          dragOnClick: true,
          enableCross: true,
          fixed: false,
          minRange: 0,
          maxRange: 0,
          order: false,
          marks: false,
          dotOptions: true,
          process: true,
          dotStyle: {
            borderColor: '#ffbb31'
          },
          railStyle: {
            backgroundColor: 'whitesmoke'
          },
          processStyle: {
            backgroundColor: '#ffbb31'
          },
          tooltipStyle: {
            padding: '0 5px'
          },
          stepStyle: 0,
          stepActiveStyle: 0,
          labelStyle: 0,
          labelActiveStyle: 0
        }
      }
    }
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp']),
    ...mapState('products', {
      sd: state => state.settingDialog
    }),
    settingDialog: {
      get() {
        return this.sd
      },
      set(b) {
        this.setSettingDialogAction(b)
      }
    },
    v2: {
      get() {
        return this.setting.v2
      },
      set(b) {
        console.log(b >= this.setting.v1, b, this.setting.v1)
        return b > this.setting.v1 ? this.setting.v1 : b
      }
    },
    realIncome() {
      return (
        this.scaleValue.score / 12 -
        this.nationalPension -
        this.healthInsurance -
        this.employmentInsurance -
        this.income -
        this.income / 10
      )
    },
    nationalPension() {
      return (this.scaleValue.score / 12) * 0.045
    },
    healthInsurance() {
      return (
        (this.scaleValue.score / 12) * 0.0343 +
        (this.scaleValue.score / 12) * 0.0343 * 0.1152
      )
    },
    employmentInsurance() {
      return (this.scaleValue.score / 12) * 0.008
    },
    income() {
      const d = gabgeunse2021.tax
      const l = d.length
      const s = this.scaleValue.score / 12000
      console.log(s)
      for (let i = 0; i < l; i += 1) {
        if (s >= parseFloat(d[i][0]) && s < parseFloat(d[i][1])) {
          console.log(i, s, parseFloat(d[i][0]), parseFloat(d[i][2]))
          return parseFloat(d[i][2])
        }
      }
      return 0
    }
  },
  methods: {
    ...mapActions('app', {
      closeAddToHomeScreenModalForApple: 'closeAddToHomeScreenModalForApple',
      serviceWorkerSkipWaiting: 'serviceWorkerSkipWaiting'
    }),
    ...mapActions('products', {
      setSettingDialogAction: 'setSettingDialog'
    })
  },
  mounted() {
    const score = 100000000 / 2
    TweenLite.to(this.scaleValue, 0.5, {
      score,
      delay: 0.5,
      roundProps: 'score',
      ease: Expo.easeOut,
      onComplete: () => {
        setTimeout(() => {
          this.options.tooltip = 'active'
        }, 1000)
      }
    })
    this.isSlider = true
  }
}
</script>

<style lang="scss">
body,
html {
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  font-family: 'Nanum Gothic', sans-serif;
  a {
    font-weight: 500;
    text-decoration: none;
  }
  * {
    font-family: 'Nanum Gothic', sans-serif;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #2c3e50;

    .new-content-available-toastr {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .apple-add-to-home-screen-modal {
      position: absolute;
      bottom: 0;
      right: 0;
      top: 0;
      left: 0;
      height: fit-content;
      width: fit-content;
      margin: auto;
      z-index: 1000;
    }

    .main-wrapper {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100px;
        background-color: #ffbb31;
      }
    }
  }
}

.content-wrapper {
  position: relative;
  .info {
    position: absolute;
    bottom: -100px;
    right: 0;
    z-index: 1;
  }
}
.salary {
  &.vue-slider {
    .vue-slider-rail {
      border-radius: 0;
      .vue-slider-process {
        border-radius: 0;
        background-color: #ffbb31;
      }
    }
  }
  .vue-slider-btt .vue-slider-mark-label {
    left: 0;
  }
  .vue-slider-dot-tooltip {
    margin-top: 30px;
    left: 20px;
    z-index: 9;
    .vue-slider-dot-tooltip-text {
      font-size: 30px;
      font-weight: bold;
      text-align: left;
    }
  }
  .vue-slider-dot-tooltip-inner-left::after {
    display: none;
  }
}
</style>
