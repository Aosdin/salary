<template>
  <div class="content-wrapper">
    <div class="info">
      <ul>
        <li>
          <span>국민연금 :</span>
          {{ Math.floor(nationalPension / 12).toLocaleString() }}
        </li>
        <li>
          <span>건강보험 :</span>
          {{ Math.floor(healthInsurance / 12).toLocaleString() }}
        </li>
        <li>
          <span>고용보험 :</span>
          {{ Math.floor(employmentInsurance / 12).toLocaleString() }}
        </li>
      </ul>
      <p>
        <span>월실수령액 : {{ Math.floor(realIncome).toLocaleString() }}</span>
      </p>
    </div>
    <vue-slider
      class="salary"
      v-if="isSlider"
      v-model="scaleValue.score"
      v-bind="options"
      :tooltip-formatter="v => v.toLocaleString()"
    />
    <v-dialog v-model="settingDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">설정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump'
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="settingDialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="settingDialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { Expo, TweenLite } from 'gsap/all'
import { mapActions, mapState } from 'vuex'

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
      isSlider: false,
      scaleValue: { score: 12000000, complete: true },
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: window.innerHeight - 150,
        contained: false,
        direction: 'btt',
        data: null,
        min: 12000000,
        max: 100000000,
        interval: 500000,
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
        marks: false,
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
    realIncome() {
      return (
        (this.scaleValue.score -
          this.nationalPension -
          this.healthInsurance -
          this.employmentInsurance) /
        12
      )
    },
    nationalPension() {
      return this.scaleValue.score * 0.045
    },
    healthInsurance() {
      return (
        this.scaleValue.score * 0.0343 + this.scaleValue.score * 0.0343 * 0.1152
      )
    },
    employmentInsurance() {
      return this.scaleValue.score * 0.008
    }
  },
  methods: {
    ...mapActions('products', {
      setSettingDialogAction: 'setSettingDialog'
    })
  },
  mounted() {
    // const max = 100000000
    // const min = 12000000 - 1
    const score = 100000000 / 2
    // this.options.max = max
    // this.options.min = min
    // this.scaleValue = min
    TweenLite.to(this.scaleValue, 0.5, {
      score,
      delay: 0.5,
      roundProps: 'score',
      ease: Expo.easeOut,
      onComplete: () => {}
    })

    this.isSlider = true
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
.content-wrapper {
  position: relative;
  .info {
    position: absolute;
    bottom: -100px;
    left: 0;
    z-index: 9;
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
