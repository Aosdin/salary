<template>
  <v-app>
    <v-content>
      <div class="main-wrapper">
        <div class="content-wrapper">
          <!-- 슬라이더 -->
          <vue-slider
            v-if="isSlider"
            v-model="scaleValue.score"
            class="salary"
            v-bind="options"
            :tooltip-formatter="v => v.toLocaleString()"
          />
          <!-- // 슬라이더 -->

          <!-- 설정 플로팅 버튼 -->
          <v-btn
            class="btn-setting"
            color="primary"
            fab
            dark
            small
            @click="settingDialog = true"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <!-- // 설정 플로팅 버튼 -->

          <div class="info-area">
            <v-list-item>
              <v-list-item-title class="font-weight-light mr-2">국민연금</v-list-item-title>
              <v-list-item-subtitle class="text-right font-weight-bold">
                {{ Math.floor(nationalPension).toLocaleString() }}원
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-light mr-2">건강보험</v-list-item-title>
              <v-list-item-subtitle class="text-right font-weight-bold">
                {{ Math.floor(healthInsurance).toLocaleString() }}원
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-light mr-2">고용보험</v-list-item-title>
              <v-list-item-subtitle class="text-right font-weight-bold">
                {{ Math.floor(employmentInsurance).toLocaleString() }}원
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-light mr-2">소득세</v-list-item-title>
              <v-list-item-subtitle class="text-right font-weight-bold">
                {{ Math.floor(income).toLocaleString() }}원
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-light mr-2">지방소득세</v-list-item-title>
              <v-list-item-subtitle class="text-right font-weight-bold">
                {{ Math.floor(income / 10).toLocaleString() }}원
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-light mr-2">월실수령액</v-list-item-title>
              <v-list-item-subtitle class="text-right font-weight-bold title">
                <em class="text--primary">{{ Math.floor(realIncome).toLocaleString() }}</em>원
              </v-list-item-subtitle>
            </v-list-item>
          </div>

          <!-- 설정 팝업 -->
          <v-dialog v-model="settingDialog">
            <v-card style="overflow: hidden">
              <v-card-title>
                <span class="headline">설정</span>
              </v-card-title>
              <v-card-text class="mt-5">
                <v-row >
                  <v-col class="text-left col-8 pb-0">
                    <span class="subtitle-1 font-weight-bold black--text">인적공제(본인포함)</span>
                  </v-col>
                  <v-col class="text-right col-4 pb-0">
                    <span class="subtitle-1 font-weight-light"><em class="font-weight-bold black--text">{{ H }}</em> 명</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0">
                    <v-slider
                      v-model="H"
                      color="black"
                      track-color="black"
                      always-dirty
                      min="1"
                      max="10"
                    >
                      <template v-slot:prepend>
                        <v-icon color="grey" @click="H--">
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon color="grey" @click="H++">
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-left col-4 pb-0">
                    <span class="subtitle-1 font-weight-bold black--text">비급여</span>
                  </v-col>
                  <v-col class="text-right col-8 pb-0">
                    <span class="subtitle-1 font-weight-light"><em class="font-weight-bold black--text">{{ F.toLocaleString() }}</em> 원</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0">
                    <v-slider
                      v-model="F"
                      color="black"
                      track-color="black"
                      always-dirty
                      step="100000"
                      min="1200000"
                      :max="scaleValue.score * 0.5"
                    >
                      <template v-slot:prepend>
                        <v-icon color="grey" @click="F-=100000">
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon color="grey" @click="F+=100000">
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="" text @click="settingDialog = false">
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- // 설정 팝업 -->
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
    </v-content>
  </v-app>
</template>
<script>
import NewContentAvailableToastr from "@/components/NewContentAvailableToastr";
import AppleAddToHomeScreenModal from "@/components/AppleAddToHomeScreenModal";
import { mapState, mapActions, mapGetters } from "vuex";
import { Expo, TweenLite } from "gsap/all";
import gabgeunse2021 from "@/assets/tax/gabgeunse2021.json";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

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
      settingDialog: false,
      scaleValue: { score: 24000000, complete: true },
      H: 1,
      F: 1200000,
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: window.innerHeight - 100,
        contained: false,
        direction: "btt",
        data: null,
        min: 24000000,
        max: 100000000,
        interval: 100000,
        disabled: false,
        clickable: true,
        duration: 0.3,
        adsorb: false,
        lazy: false,
        tooltip: "always",
        tooltipFormatter: "",
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
      }
    };
  },
  computed: {
    ...mapGetters("app", ["newContentAvailable"]),
    ...mapState("app", ["showAddToHomeScreenModalForApple", "refreshingApp"]),
    realIncome() {
      return (
        (this.scaleValue.score - this.F) / 12 -
        this.nationalPension -
        this.healthInsurance -
        this.employmentInsurance -
        this.income -
        this.income / 10
      ) + (this.F / 12);
    },
    nationalPension() {
      return (this.scaleValue.score / 12) * 0.045;
    },
    healthInsurance() {
      return (
        (this.scaleValue.score / 12) * 0.0343 +
        (this.scaleValue.score / 12) * 0.0343 * 0.1152
      );
    },
    employmentInsurance() {
      return (this.scaleValue.score / 12) * 0.008;
    },
    income() {
      const d = gabgeunse2021.tax;
      const l = d.length;
      const s = (this.scaleValue.score - this.F) / 12000;
      for (let i = 0; i < l; i += 1) {
        if (s >= parseFloat(d[i][0]) && s < parseFloat(d[i][1])) {
          console.log(s, d[i][1 + this.H], this.H)
          return parseFloat(d[i][1 + this.H]);
        }
      }
      return 0;
    }
  },
  watch: {
    H (newValue) {
      localStorage.H = newValue
    },
    F (newValue) {
      localStorage.F = newValue
    },
    scaleValue: {
      handler (newValue) {
        localStorage.score = newValue.score
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("app", {
      closeAddToHomeScreenModalForApple: "closeAddToHomeScreenModalForApple",
      serviceWorkerSkipWaiting: "serviceWorkerSkipWaiting"
    }),
    ...mapActions("products", {
      setSettingDialogAction: "setSettingDialog"
    })
  },
  mounted() {
    this.H = localStorage.H ? Number(localStorage.H) : this.H
    this.F = localStorage.F ? Number(localStorage.F) : this.F
    this.scaleValue.score = localStorage.score ? Number(localStorage.score) : 100000000 / 2;
    const score = localStorage.score ? Number(localStorage.score) : 100000000 / 2;
    TweenLite.to(this.scaleValue, 0.5, {
      score,
      delay: 0.5,
      roundProps: "score",
      ease: Expo.easeOut,
      onComplete: () => {
        setTimeout(() => {
          this.options.tooltip = "active";
        }, 1000);
      }
    });
    this.isSlider = true;
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;

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
        content: "";
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
  .info-area {
    position: fixed;
    bottom: 30px;
    right: 0;
    z-index: 10;
    background-color: transparent;
    text-align: right;
    .v-list-item {
      min-height: 24px;
      .v-list-item__title {
        text-align: right;
      }
      .v-list-item__subtitle {
        flex: 1 1 150%;
        text-overflow: clip;
      }
    }
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
.btn-setting {
  position: fixed !important;
  top: 25px;
  right: 10px;
  z-index: 9;
}
</style>
