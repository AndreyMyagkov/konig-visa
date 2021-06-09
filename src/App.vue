<template>
  <div id="kv-app" class="kv-app" notranslate>
    <!-- HEADER -->
    <div class="kv-header" v-if="CONFIG.mode === 'default'">

      <!-- Bread Crumbs -->
      <BreadCrumbs :crumbs="crumbs" v-if="false"/>
      <!-- /Bread Crumbs -->

      <!-- Info bar -->
      <div class="kv-header__item kv-step-values">
        <div class="kv-step-values__inner">
          <div class="kv-step-values__row">
            <div class="kv-step-values__item" v-if="selectedCountry.name">
              <span>{{selectedCountry.name}}</span>
            </div>


            <div class="kv-step-values__item" v-if="selectedService.name">
              <span>{{selectedService.name}}</span>
              <span v-if="selectedDuration.name">{{selectedDuration.name}} <span v-if="selectedPrice.price.m">| {{selectedPrice.price.m}}-malige Einreise</span></span>
            </div>

          </div>

          <!-- cart -->
          <!--  && steps[2].isValid -->
          <div class="kv-step-values__aside" v-if="calculate.calculation.participants.length">

            <div class="kv-participants">
              <svg class="kv-participants__icon"><use href="#kv-icons_user"></use></svg>
              <div class="kv-participants__multiply">
                <svg><use href="#kv-icons_multiply"></use></svg>
              </div>
              <div class="kv-participants__counter">{{calculate.calculation.participants.length}}</div>
            </div>

            <div class="kv-cart drop">

              <div class="kv-cart__head">
                <svg class="kv-cart__icon"><use href="#kv-icons_cart"></use></svg>

                <div class="kv-price kv-cart__price"> {{totalAmount}} <span class="kv-price__currency">€</span></div>
                <svg class="kv-cart__arrow drop__angle"><use href="#kv-icons_arrow_down"></use></svg>
              </div>

              <div class="kv-cart__body drop__body">

                <div class="kv-cart-table">

                  <div class="kv-cart-table__row" v-for="(item, i) in tourists" :key="i">
                    <div class="kv-cart-table__item">{{ (i+1) }}</div>
                    <div class="kv-cart-table__item kv-cart-table__item_col">{{ item.gender }} {{item.name}} {{item.sname}}</div>
                    <div class="kv-price kv-cart-table__item">
                      <template  v-if="calculate.calculation.participants[i] && (calculate.calculation.participants[i].price !== null)">{{formatter.priceFormat(calculate.calculation.participants[i].price)}}</template>
                      <template v-else><span v-html="constants.dashSymbol"></span> </template>
                      <span class="kv-price__currency">€</span>
                    </div>
                  </div>

                  <!-- Пакеты -->
                  <div class="kv-cart-table__row" v-if="calculate.calculation.servicePackage !== null && calculate.calculation.servicePackage.participants.length">
                    <div class="kv-cart-table__item kv-cart-table__item_col">
                      {{ calculate.calculation.servicePackage.name }}
                      <!--<svg><use href="#kv-icons_multiply"></use></svg> -->
                      х
                      {{ calculate.calculation.servicePackage.participants.length }}
                    </div>
                    <div class="kv-price kv-cart-table__item">
                      <template>{{ formatter.priceFormat(calculate.calculation.servicePackage.price *  calculate.calculation.servicePackage.participants.length) }}</template>
                      <span class="kv-price__currency">€</span>
                    </div>
                  </div>

                  <!-- Услуги -->
                  <template v-if="calculate.calculation.suppServices !== null">
                    <div class="kv-cart-table__row" v-for="suppServices in calculate.calculation.suppServices.filter(_ => !_.isIncluded)" :key="suppServices.id">
                      <div class="kv-cart-table__item kv-cart-table__item_col">
                        {{ suppServices.name }}
                       <!-- <svg><use href="#kv-icons_multiply"></use></svg> -->
                        x
                        {{ suppServices.participants.length }}
                      </div>
                      <div class="kv-price kv-cart-table__item">
                        <template>{{ formatter.priceFormat(suppServices.price * suppServices.participants.length) }}</template>
                        <span class="kv-price__currency">€</span>
                      </div>
                    </div>
                  </template>

                  <!-- Почта -->
                  <div class="kv-cart-table__row" v-if="calculate.calculation.postalService !== null">
                    <div class="kv-cart-table__item kv-cart-table__item_col">{{ calculate.calculation.postalService.name }}</div>
                    <div class="kv-price kv-cart-table__item">
                      <template>{{ formatter.priceFormat(calculate.calculation.postalService.price) }}</template>
                      <span class="kv-price__currency">€</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <!-- /cart -->

        </div>
      </div>
      <!-- /Info bar -->

      <!-- ProgressBar -->
      <ProgressBar :now="currentStep" :all="steps.length"/>
      <!-- ProgressBar -->

    </div>
    <!-- /HEADER -->

    <!-- MAIN Default mode-->
    <div class="kv-content" v-if="CONFIG.mode === 'default'">
      <!-- Step Header -->
      <StepHeader :icon="stepInfo.icon" :text="$lng(`step${currentStep}.header`)"/>
      <!-- /Step Header -->

      <!-- Top buttons -->
      <PrevNextButtons
          :currentStep="currentStep"
          :allowNext="allowNext"
          position="top"
          @prevStep="prevStep"
          @nextStep="nextStep"
          @sendOrder="sendOrder"
          @makePayment="makePayment"
          v-if="currentStep !== 8"
      ></PrevNextButtons>
      <!-- /Top buttons -->

      <div class="kv-content__body">


        <Step1
            :countries="countries"
            :serviceGroups="serviceGroups"
            :serviceGroupsSelected="serviceGroupsSelected"
            :setup="{
              country: selectedCountry,
              serviceGroups: selectedServiceGroup.id ? [selectedServiceGroup.id, selectedService.id] : [selectedService.id],
              service: [selectedService.id],
            }"
            @update:country="countryChange"
            @update:service="selectVisaType"
            @showModal="showModal"
            @active="loadStep1Data"
            v-if="currentStep === 1 && CONFIG.mode === 'default'"
        ></Step1>



        <!-- STEP 2 -->
        <Step2
            :serviceDetails="serviceDetails"
            :nationalities="nationalities"
            :prices="prices"

            :setup="{
              nationality: CONFIG.nationality,
              residenceRegions: CONFIG.residenceRegions,
              duration: selectedDuration,
              price: selectedPrice,
              redirectUrl: CONFIG.redirectUrl,
              mode: CONFIG.mode
            }"

            @active="loadStep2Data"
            @update:nationality="updateNationality"
            @update:residenceRegions="updateResidenceRegions"
            @update:duration="updateDuration"
            @update:price="updatePrice"
            @load:prices="loadPrices"
            @showModal="showModal"
            v-if="currentStep === 2 && CONFIG.mode === 'default'"/>
        <!-- /STEP 2 -->

        <!-- STEP 3 -->
        <!--
        :nationality="CONFIG.nationality"
               :residenceRegions="CONFIG.residenceRegions"
        -->
        <Step3 v-if="currentStep === 3 && CONFIG.mode === 'default'"
               :tourists="tourists"
               :nationalities="nationalities"

               :productDetails="productDetails"

               @update:field="updateTouristField"
               @addTourist="addTourist"
               @deleteTourist="deleteTourist"

               @active="Step3Active"
               @change="sendCalculateAndValidate"
               @scroll-to="scrollTo"
               @isValid="steps[2].isValid = $event"

        >
        </Step3>
        <!-- /STEP 3 -->

        <!-- STEP 4 -->
        <Step4 v-if="currentStep === 4 && CONFIG.mode === 'default'"
               :data="productDetails"
               :selectedServicePackage="selectedServicePackage"
               :selectedSuppServices="selectedSuppServices"

               @showModal="showModal"
               @changePackage="changePackage"
               @changeSuppService="changeSuppService"
               @calculate="sendCalculateAndValidate"
        />
        <!-- /STEP 4 -->

        <!-- STEP 5 -->
        <Step5 v-if="currentStep === 5 && CONFIG.mode === 'default'"
               :addressingCountries="addressingCountries"
               :pickupPoints="pickupPoints"
               :customerDefault="customer"
               :deliveryDefault="delivery"
               :isDeliveryByEmail="calculate.deliveryMedia === 'digital'"
               :showBlock="stepBlock"
               @active="loadStep5Data"
               @isValid="steps[4].isValid = $event"
               @update="setCustomerDelivery"
        />
        <!-- /STEP 5 -->

        <!-- STEP 6 -->
        <Step6 v-if="currentStep === 6 && CONFIG.mode === 'default'"
               :postalServices="postalServices"
               :selectedPostalService="selectedPostalService.id"
               @change="postalChange"
               @active="loadPostalServices"
        />
        <!-- /STEP 6 -->

        <!-- STEP 7 -->
        <Step7 v-if="currentStep === 7 && CONFIG.mode === 'default'"
               :data="{
                  toCountry: selectedCountry,
                  service: selectedService,
                  serviceGroup: selectedServiceGroup,
                  duration: selectedDuration,
                  price: selectedPrice,
                  tourists: tourists,
                  customer: customer,
                  delivery: delivery,
                  postalService: this.selectedPostalService,
                  servicePackage: this.selectedServicePackage,
                  suppServices: this.selectedSuppServices,
                  calculate: this.calculate,
                  discounts: this.productDetails.discounts,
                  servedResidenceRegions: this.productDetails.servedResidenceRegions

               }"
               @setStep="setStep"


        />
        <!-- /STEP 7 -->

        <!-- STEP 8 -->
        <Step8
            :paymentMethods="paymentMethods"
            @update:paymentType="updatePaymentType"
            @update:paymentData="updatePaymentData"
            @active="loadStep8Data"
            @isValid="steps[7].isValid = $event"
            v-if="currentStep === 8 && CONFIG.mode === 'default'"/>
        <!-- /STEP 8 -->


        <!-- Bottom buttons -->
        <PrevNextButtons
            :currentStep="currentStep"
            :allowNext="allowNext"
            position="bottom"
            @prevStep="prevStep"
            @nextStep="nextStep"
            @sendOrder="sendOrder"
            @makePayment="makePayment"
            v-if="CONFIG.mode === 'default'"
        ></PrevNextButtons>
        <!-- /Bottom buttons -->

      </div>
    </div>
    <!-- /MAIN -->


    <div class="kv-content" v-if="CONFIG.mode === 'price'">

      <!-- Step Header -->
      <StepHeader icon="step_2" :text="$lng('price.header')"/>
      <!-- /Step Header -->

      <div class="kv-content__body">




          <!-- select subtype -->
          <div class="kv-pre-staying kv-mb-30" v-if="serviceGroupsSelected.length">
            <div class="kv-horizontal-labeling">
              <div class="kv-label">{{ $lng('price.subtype') }}</div>
              <div class="kv-select kv-flex-grow-1">
                <div class="kv-select__badge">
                  <svg class="kv-select__icon">
                    <use href="#kv-icons_home"></use>
                  </svg>
                </div>
                <select class="kv-select__input" v-model="priceVisaTypeModel">
                  <option value="null">{{ $lng('price.selectSubtypePlaceholder') }}</option>
                  <option :value="item.id" v-for="item in serviceGroupsSelected" :key="item.id">{{ item.name }}</option>
                </select>
                <svg class="kv-selct__arrow">
                  <use href="#kv-icons_arrow_down"></use>
                </svg>
              </div>
            </div>
          </div>
          <!-- /select subtype -->

          <!-- STEP 2 -->
          <Step2
              :serviceDetails="serviceDetails"
              :nationalities="nationalities"
              :prices="prices"

              :setup="{
                nationality: CONFIG.nationality,
                residenceRegions: CONFIG.residenceRegions,
                duration: selectedDuration,
                price: selectedPrice,
                redirectUrl: CONFIG.redirectUrl,
                mode: CONFIG.mode
              }"

              @active="loadStep2Data"
              @update:nationality="updateNationality"
              @update:residenceRegions="updateResidenceRegions"
              @update:duration="updateDuration"
              @update:price="updatePrice"
              @load:prices="loadPrices"
              @showModal="showModal"
              v-if="selectedService.id"/>
          <!-- /STEP 2 -->
        </div>
    </div>


    <div class="kv-content-" v-if="CONFIG.mode === 'success'">
      <!-- SUCCESS -->
      <Success :order="CONFIG.order"/>
      <!-- /SUCCESS -->
    </div>


    <simple-modal v-model="isModalShow" :title="modal.title" size="small">
      <template slot="body">
        <div v-html="modal.content"></div>
      </template>
    </simple-modal>


    <simple-modal v-model="confirm.isShow" :title="confirm.title" size="small">
      <template slot="body">
        <div v-html="confirm.content"></div>
        <div v-if="confirmReset">
          <div class="kv-step-buttons-centered kv-modal-buttons">
            <button class="kv-step-button kv-step-button_second" @click="setResetStepDate(true)">{{ $lng('common.btnYes') }}</button>
            <button class="kv-step-button" @click = "setResetStepDate(false)">{{ $lng('common.btnNo') }}</button>
          </div>
        </div>
      </template>
    </simple-modal>
    <loading :active="isLoading"
             :can-cancel="false"
             :is-full-page="true">
    </loading>
  </div>
</template>

<script>
import '@/assets/svg/kv-icons.svg';
import '@/assets/css/style.css';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import StepHeader from '@/components/ui/StepHeader';
import VisaTypes from "@/components/ui/VisaTypes";
import Loading from 'vue-loading-overlay';
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import Step6 from "@/components/Step6";
import Step7 from "@/components/Step7";
import Step8 from "@/components/Step8";
import Success from "@/components/Success";
import PrevNextButtons from "@/components/PrevNextButtons";
import SimpleModal from "simple-modal-vue";

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
//@import "vue-select/src/scss/vue-select.scss"; в scss

import * as network from '@/helpers/network';
import * as constants from "@/helpers/constants";
import * as formatter from "@/helpers/format";

// TODO: стили изолировать
import 'vue-loading-overlay/dist/vue-loading.css';
//import "css-container-queries"

export default {
  name: 'App',
  components: {
    BreadCrumbs,
    ProgressBar,
    StepHeader,
    VisaTypes,
    Loading,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Success,
    PrevNextButtons,
    SimpleModal
  },
  data() {
    return {
      uniqueKey: Date.now(),
      isMobile: false,
      constants,
      formatter,
      isModalShow: false,
      resetStepData: true, // можно ли сбрасывать данные шагов
      modal: {
        title: '',
        content: '',
      },
      confirm: {
        isShow: false,
        title: '',
        content: '',
        confirmYES: undefined,
        confirmNO: undefined,
      },

      steps: [
        {
          crumb: 'Buchungsauftrag',
          //header: this.$lng('step1.header'),//'Buchungsauftrag',
          icon: 'step_1'
        },
        {
          crumb: 'Aufenthaltsdauer',
         // header: 'Расчет примерной стоимости для одного человека',
          icon: 'step_2',
          allowOrder: true
        },
        {
          crumb: 'Заполнение данных о туристах',
          //header: 'Заполнение данных',
          icon: 'step_3',
          isValid: false, // флаг валидности шага, флаг показа попапа при изменении данных
          allowOrder: false  // флаг возможности заказа виз
        },
        {
          crumb: 'Дополнительные услуги',
          //header: 'Дополнительные услуги',
          icon: 'step_4'
        },
        {
          crumb: 'Информация о заказчике',
         // header: 'Информация о заказчике',
          icon: 'step_5',
          isValid: false
        },
        {
          crumb: 'Способ отправки',
         // header: 'Способ отправки',
          icon: 'step_6'
        },
        {
          crumb: 'Проверка данных',
         // header: 'Проверка данных',
          icon: 'step_7'
        },
        {
          crumb: 'Способ оплаты',
          //header: 'Способ оплаты',
          icon: 'step_8',
          isValid: false
        }
      ],
      currentStep: 0,
      stepBlock: null,
      isLoading: false,

      countries: [],
      services: [],
      serviceGroups: [],
      // Шаг 2
      nationalities: [],
      serviceDetails: {},
      prices: {},

      //Шаг 3
      productDetails: {
        id: null,
        servedResidenceRegions: null,
        discounts: null
      },
      currentEditTourist: null,

      //TODO: Препарированные. Сверху убрать?
      serviceGroupsPrepared: [],

      selectedCountry: new constants.CountryDefault(),

      selectedService: new constants.ServicesDefault(),
      selectedServiceGroup: new constants.ServicesDefault(),

      calculate: new constants.calculateDefault(),

      // Название выбранной продолжительности
      selectedDuration: new constants.DurationDefault(),
      selectedPrice: new constants.PriceDefault(),

      //Шаг 3
      // Список туристов
      tourists: [new constants.Toursit()],

      // Шаг 4
      selectedServicePackage: new constants.ServicePackage(),
      selectedSuppServices: [],


      // Шаг 5
      addressingCountries: [],
      pickupPoints: [],
      customer: new constants.CustomerDefault(),
      delivery: new constants.DeliveryDefault(),



      // Шаг 6
      postalServices: [],
      selectedPostalService: new constants.PostalServiceDefault(),

      //Шаг 8
      paymentMethods: [],
      paymentType: null,
      paymentData: {
        iban: '',
        bic: ''
      },

      CONFIG: {
        mode: "default",
        clientId: null,
        nationality: null,
        residenceRegions: null,
        country: null,
        serviceGroup: null,
        service: null,
        product: null,
        API_URL: "https://apisrv.ideo-software.com/Ideo/KoenigVN/Web/api/OrderPortal/",
        lng: "de",
        order: ""
      }
    }
  },
  methods: {
    updatePaymentType(data) {
      this.paymentType = data
    },
    updatePaymentData(data) {
      this.paymentData = data
    },
    /**
     * Подавить замену цифр на телефоны https://gist.github.com/yuezk/15c5bb1370e30d0a2a60
     */
    disableBrowserPhoneDetection() {
      const head = document.head;
      const meta = document.createElement('meta');
      meta.name = 'format-detection';
      meta.content = 'telephone=no';
      head.appendChild(meta);
    },

    /**
     * Подключить внешний файл CSS
     * @param {string} path - полный пусть к файлу
     */
    appendCssFile(path) {
      const head = document.head;
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = path;
      head.appendChild(link);
    },
    /**
     * Инициирует виджет, проверяет входные данные
     */
    async initiateWidget() {

      // eslint-disable-next-line no-undef
      if (__KV_CONFIG && __KV_CONFIG.clientId) {
        // eslint-disable-next-line no-undef
        this.CONFIG = Object.assign(this.CONFIG,__KV_CONFIG);
      } else {
        return false
      }
      this.disableBrowserPhoneDetection();

      // eslint-disable-next-line no-undef
      if (__KV_CONFIG && __KV_CONFIG.css) {
        // eslint-disable-next-line no-undef
        this.appendCssFile(__KV_CONFIG.css)
      }


      // Режим модуля
      const allowMode = ["default", "price", "success"];
      if (allowMode.indexOf(this.CONFIG.mode) === -1) {
        this.CONFIG.mode = "default";
      }


      if (this.CONFIG.product && !this.selectedPrice.price.id && this.CONFIG.mode === "default") {
        await this.setDefaultProduct();

      } else if (this.CONFIG.mode === "price") {
        this.loadStep1Data();
      }

      else {
        this.currentStep = 1;
      }



      return true
    },

    /**
     * Установить страну из конфига модуля
     */
    setDefaultCountry() {
      if (this.CONFIG.country && !this.selectedCountry.codeA3) {
        const country = this.countries.find(_ => _.codeA3 === this.CONFIG.country);
        if (country) {
          this.countryChange(country)
        }
      }
    },

    /**
     * Установить группу сервисов из конфига модуля
     */
    setDefaultServiceGroup() {
      if (this.CONFIG.serviceGroup && !this.selectedServiceGroup.id) {
        const serviceGroup = this.serviceGroups.find(_ => _.id === this.CONFIG.serviceGroup);
        if (serviceGroup) {
          this.selectVisaType(serviceGroup);
          return true
        }
      }
      return false
    },

    /**
     * Установить сервис из конфига модуля
     */
    setDefaultService() {
      if (this.CONFIG.service && !this.selectedService.id) {
        const service = this.services.find(_ => _.id === this.CONFIG.service);
        if (service) {
          this.selectVisaType(service);
          return true
        }
      }
      return false
    },

    /**
     * Установить продукт из конфига модуля
     */
    async setDefaultProduct() {
      await this.loadCountries();

      this.selectedPrice.price.id = this.CONFIG.product;
      await this.loadProductDetails();

      // установить страну
      const country = this.countries.find(_ => _.codeA3 === this.productDetails.countryA3);
      if (country) {
        await this.countryChange(country)
      }

      // установить типы виз
      const service = this.services.find(_ => _.id === this.productDetails.serviceId);
      if (service) {
        // установить группу виз
        if (service.srvGrpId) {
          const serviceGroup = this.serviceGroups.find(_ => _.id === service.srvGrpId);
          if (serviceGroup) {
            this.selectVisaType(serviceGroup);
          }
        }

        this.selectVisaType(service);
      }

      // Повторно ставим продукт, т.к. он сбрасывается при смене типа виз
      this.selectedPrice.price.id = this.CONFIG.product;

      await this.loadStep2Data();
      // Список гражданств
      //await this.loadNationalities();
      // Детали продукта
      //await this.loadServiceDetails();

      // Установить длительность
      let duration = this.serviceDetails.durations.find(_ => _.name === this.productDetails.duration);

      if (duration === undefined) {
        duration = new this.constants.DurationDefault()
      }
      this.updateDuration(duration);

      /*
      const selectedDurationIndex = this.serviceDetails.durations.findIndex(_ => _.name === this.productDetails.duration);
      if (selectedDurationIndex !== -1) {
        const duration = this.serviceDetails.durations[selectedDurationIndex];
        this.updateDuration({
          ...duration,
          index: selectedDurationIndex
        });
      }
      */

      // Повторно ставим продукт, т.к. он сбрасывается при смене длительности
      this.selectedPrice.price.id = this.CONFIG.product;

      let priceValue = null;
      const price = this.prices.prices.find(_ => _.productId === this.selectedPrice.price.id);
      if (price && 'price' in price) {
        priceValue =  price.price
      }

      const priceData = {
        info: {
          dimension: this.productDetails.processDuration.dimension,
          //duration: this.constants.processDurationsToWords(this.productDetails.processDuration.dimension),
          hours: this.productDetails.processDuration.hours,
          quantity: this.productDetails.processDuration.quantity,
        },
        price: {
          id: this.productDetails.id,
          m: this.productDetails.multiplicity,
          price: priceValue
        }
      }
      // Установить кратность, цену
      this.updatePrice(priceData)


        // await this.sendCalculateAndValidate();
      this.currentStep = 3;
      return false
    },

    /**
     * Пропуск шага
     */
    skipStep(step) {
      // Пропуск шага 4, если нет пакетов и услуг
      if (step === 4) {
        /*
        if (this.calculate.calculation.servicePackage === null && this.calculate.calculation.suppServices === null) {
          return true
        }
        if (this.calculate.calculation.servicePackage === null && !this.calculate.calculation.suppServices.length) {
          return true
        }
        */

        if (this.productDetails.servicePackages === null && this.productDetails.suppServices === null) {
          return true
        }
        if (this.productDetails.servicePackages === null && !this.productDetails.suppServices.length) {
          return true
        }

      }


      // Пропуск шага 6, если самовывоз
      if (step === 6 && this.delivery.type === "3") {
        return true
      }
      //Пропуск шага 6, если электронная доставка
      if (step === 6 && this.calculate.deliveryMedia === "digital") {
        return true
      }

      return false
    },
    /**
     * Переход к следующему шагу
     */
    nextStep() {
      let step = this.currentStep + 1;

      if (this.skipStep(step)) {
        step++;
      }
      this.setStep({step: step, block: null})
    },
    /**
     * Переход к предыдущему шагу
     */
    prevStep() {
      let step = this.currentStep - 1;

      if (this.skipStep(step)) {
        step--;
      }

      this.setStep({step: step, block: null})
    },

    /**
     * Устанавливает номер текущего шага и прокручивает до нужного блока
     */
    setStep(data) {
      if (this.currentStep >= 1 || this.currentStep < this.steps.length) {
        this.currentStep = data.step
      }
      this.stepBlock = data.block || null;

      setTimeout(
          () => {this.scrollTo(data.block)},
          500
      )


    },

    /**
     * Прокрутка экрана до элемента
     */
    scrollTo(element, mobileOnly = false) {
      console.log('прокрутка ', element);
      let elementTarget;

      if (mobileOnly && !this.isMobile) {
        return
      }
      if (element === null) {
        //return
        elementTarget = document.querySelector('.kv-content__header');
      } else {
        elementTarget = document.querySelector(element);
      }

      console.log(elementTarget);
      if (elementTarget === null) {
        return false
      }

      // Дополнительное смещение для красоты или высота внешней шапки
      const parentOffset = 10;

      const elementPosition = elementTarget.getBoundingClientRect().top;

      const header =  document.querySelector('#kv-app .kv-header');
      let headerHeight = 0
      if (header) {
        headerHeight = header.getBoundingClientRect().height;
      }
      const topOffset = headerHeight + parentOffset;

      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      console.log('прокрутка до ' + offsetPosition);

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
          block: 'start'
        });
      }, 200)

/*
      setTimeout(
          () => {
            document.querySelector('#form-delivery').scrollIntoView({
              block: "start",
              behavior: "smooth"
            });
          },
          1000
      )*/
    },

    /**
     * Показывает модальное окно с текстом
     * @param content
     * @param title
     */
    showModal(content = '', title = '') {
      this.modal.title = title;
      this.modal.content = content;
      if (content.length) {
        this.isModalShow = true;
      }
    },

    /**
     * Конфирм - предупреждение о сбросе выбранных параметров
     */
    showResetConfirm(content, title) {
        this.confirm.title = title || "";
        this.confirm.content = content || this.$lng("common.confirmResetText");
        this.confirm.isShow = true;

        return new Promise((resolve, reject) => {
          this.confirm.confirmYES = resolve
          this.confirm.confirmNO = reject
        })
    },


    setResetStepDate(data) {
      //this.resetStepData = data;
      this.confirm.isShow = false;
      if (data) {
        this.confirm.confirmYES(true)
      } else {
        this.confirm.confirmYES(false)
      }
    },


    /**
     * Загружает справочник стран
     */
    async loadCountries() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSCountries?clientId=${this.CONFIG.clientId}`);
        let countries = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        this.isLoading = false;

        this.countries = countries.countries;
        this.setDefaultCountry();
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },



    /**
     * Загружает справочник гражданств
     */
    async loadNationalities() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSNationalities?clientId=${this.CONFIG.clientId}`);
        let nationalities = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        this.nationalities = nationalities.nationalities;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     * Загружает детальное инфо по сервису
     */
    async loadServiceDetails() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSServiceDetails?clientId=${this.CONFIG.clientId}&serviceId=${this.selectedService.id}`);
        let serviceDetails = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        // Случай, если недоступны цены
        if (serviceDetails.processDurations === null) {
          serviceDetails.processDurations = []
        }

        // Добавить index к Duration
        if (serviceDetails.service.durations !== null) {
          serviceDetails.service.durations = serviceDetails.service.durations.map((_, index) => {return {..._, index: index}})
        }


        this.serviceDetails = serviceDetails.service;

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     * Загружает прайсы
     */
    async loadPrices() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSPrices?clientId=${this.CONFIG.clientId}&serviceId=${this.selectedService.id}&nationalityA2=${this.CONFIG.nationality}&residenceCode=${this.CONFIG.residenceRegions}&withDetails=false`);
        let prices = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        // Случай, если недоступны цены TODO: ???
        if (prices.prices === null) {
          prices.prices = []
        }
        this.prices = prices;


        // console.warn('***');
        // console.log(`prices.state = ${prices.state}`);
        // console.log(`id = ${this.selectedPrice.price.id}`)
        // console.log(this.getPriceByProductId(this.selectedPrice.price.id))
        // Если заказ невозможен
        if (prices.state !== 0 /*|| (prices.state === 0 && this.selectedPrice.price.id && this.getPriceByProductId(this.selectedPrice.price.id) === null )*/ ) {
          this.steps[1].allowOrder = false;
          //this.calculate.amount = null
        } else {
          this.steps[1].allowOrder = true;
        }

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     *  Возращает Цену по id продукта
     */
    getPriceByProductId(id) {
      if (!this.prices.prices.length) {
        return null;
      }
      const price = this.prices.prices.find(_ => _.productId === id);
      if (price && 'price' in price) {
        return price.price
      } else {
        return null
      }
    },

    /**
     * Устанавливает флаг необходимости заполнения места жительства туристам
     */
    setResidenceRegionsRequired() {
      this.tourists.forEach(item => {
        item.residenceRegionsRequired = this.productDetails.servedResidenceRegions !== null
      })
    },

    /**
     * Активация шага 4

    Step4Active() {
      //this.setFirstPackage();
    },
     */
    /**
     * Выбор первого возможного сервис-пакета, если он еще не выбран
     */
    setFirstPackage() {
      console.log('setFirstPackage')
      if (this.productDetails.servicePackages !== null && this.productDetails.servicePackages.length && this.selectedServicePackage.id === null) {
        //this.selectPackage(this.data.servicePackages[0])
        //this.changePackage(this.productDetails.servicePackages[0]);
        console.log('setFirstPackage+')
      }
    },

    /**
     * Загружает детальную инфо по продукту
     */
    async loadProductDetails() {
      if (this.productDetails.id &&  this.productDetails.id === this.selectedPrice.price.id) {
        //this.setFirstPackage();
        return false
      }
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSProductDetails?clientId=${this.CONFIG.clientId}&productId=${this.selectedPrice.price.id}`);
        let productDetails = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(productDetails.Message);
        }
/*
        if (productDetails.product.servedResidenceRegions !==null) {
          productDetails.product.servedResidenceRegions.map(item => {
            //item.code = item.code.replace(/\\/g, "\\\\");
            //item.code = item.code.replace(/\\/g, "*");
            return item
          })
        }
*/
        this.productDetails = productDetails.product;

        this.isLoading = false;

        this.setResidenceRegionsRequired();
        //this.setFirstPackage();

      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    async sendCalculateAndValidate(index = null) {
      this.currentEditTourist = index;

      if (!this.selectedPrice.price.id) {
        this.calculate = new constants.calculateDefault();
        return
      }
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: network.toFormUrlEncoded(
            {
              productId: this.selectedPrice.price.id,
              participants: this.tourists.map((item, i) => {
                return {
                  nr: i + 1,
                  nationalityA2: item.nationality.codeA2 || this.CONFIG.nationality,
                  residenceCode: item.residenceRegion.code || this.CONFIG.residenceRegions,
                  discountCode: item.discount
                }
              }),
              servicePackageId: this.selectedServicePackage.id,
              suppServices: this.selectedSuppServices.map(_ => _.id),
              postalServiceId: this.selectedPostalService === null ? "" : this.selectedPostalService.id
            }
        ),
        redirect: 'follow'
      };
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}calculateAndValidate?clientId=${this.CONFIG.clientId}`, requestOptions);
        let calculate = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(calculate.Message);
        }

        this.calculate = calculate;
        this.setResidenceRegionsRequired();

        // Проверка туристов на возможность оформления виз
        if (calculate.calculation.participants !== null) {
          calculate.calculation.participants.forEach((item, index) => {
            this.tourists[index].state = item.state;
            this.tourists[index].stateDescription = item.stateDescription;
          })
        }
        // Если заказ невозможен на шаге 2 по причине проблем с туристами шага 3 (возврат) - показываем попап
        if (calculate.state !== 0 && this.currentStep === 2) {
          this.showModal(this.$lng('step2.errorByTourists'), this.$lng('common.error'));
        }
        // Если заказ невозможен показываем попап
        if (calculate.state !== 0 && this.currentStep === 3) {
          /*if (this.tourists[0].nationality.codeA3) {
            this.showModal(calculate.stateDescription, this.$lng('common.error'));
          }*/
          /* && item.state === 0 */
          /* && item.gender !== '' */
          /*
          if (this.tourists.every(item => item.nationality.codeA3) && this.currentEditTourist == (item.nr - 1) ) {
            this.showModal(calculate.stateDescription, this.$lng('common.error'));
          }
          */
          if (this.tourists[this.currentEditTourist].nationality.codeA3  && this.tourists[this.currentEditTourist].state !== 0 ) {
            this.showModal(calculate.stateDescription, this.$lng('common.error'));
          }
          this.steps[2].allowOrder = false;
        } else {
          this.steps[2].allowOrder = true;
        }

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },


    /**
     * Загружает справочник стран адресов для шага 5
     */
    async loadAddressingCountries() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getAddressingCountries?clientId=${this.CONFIG.clientId}`);
        let countries = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        this.addressingCountries = countries.countries;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     * Загружает справочник мест получения заказа шага 5
     */
    async loadPickupPoints() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSPickupPoints?clientId=${this.CONFIG.clientId}`);
        let pickupPoints = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(pickupPoints.Message);
        }
        this.pickupPoints = pickupPoints.points;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     * Загрузка служб доставки виз */
    async loadPostalServices() {
      console.log('Загрузка почтовых сервисов');
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

        //TODO: ? брать из заказчика или адреса по типу
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: network.toFormUrlEncoded(
            {
              zip: this.customer.zip,
              city: this.customer.city,
              countryA3: this.customer.addressingCountry.codeA3,
            }
        ),
        redirect: 'follow'
      };
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getPostalServices?clientId=${this.CONFIG.clientId}`, requestOptions);
        let responseJSON = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(responseJSON.Message);
        }

        this.postalServices = responseJSON.services;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    loadStep1Data() {
      this.loadCountries();
    },

    async loadStep2Data() {
      await this.loadServiceDetails();
      await this.loadNationalities();
      await this.loadPrices();
    },

    async loadStep5Data() {
      await this.loadAddressingCountries();
      await this.loadPickupPoints();
    },

    /**
     *  Смена страны
     */
    async countryChange(data) {
      // Конфирм сброса
      if (this.confirmReset &&
          (this.selectedService.id || this.selectedPrice.price.id !== null || this.selectedServicePackage.id !== null || this.selectedSuppServices.length || this.selectedPostalService.id !== null)
      ) {
        if (await this.showResetConfirm()) {
          await this._countryChange(data)
        }
      } else {
        await this._countryChange(data)
      }
    },

    async _countryChange(data) {
      this.selectedCountry = data;
      this.selectedDuration = new constants.DurationDefault();
      this.selectedPrice = new constants.PriceDefault();
      this.calculate = new constants.calculateDefault();
      this.resetStep4();
      this.resetStep6();
      await this.loadServices();
    },

    /**
     *  Загрузка справочника достуных типов виз
     */
    async loadServices() {
      const selectedCountryId = this.selectedCountry.codeA3;

      if (!selectedCountryId) {
        console.log('Страна не выбрана'); // TODO: что делаем?
        return
      }

      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSServices?clientId=${this.CONFIG.clientId}&countryA3=${selectedCountryId}`);
        let services = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(services.Message);
        }

        const srv = this.servicesPrepare(services.services)

        const grp = this.servicesPrepare(services.serviceGroups)

        const grpServ = this.servicesGroupsPrepare(grp, srv);

        this.services = srv;
        this.serviceGroups = grpServ;

        this.selectedServiceGroup = new this.constants.ServicesDefault();
        this.selectedService = new this.constants.ServicesDefault();

        if (this.setDefaultServiceGroup() && this.setDefaultService()) {
          this.nextStep();
        }


        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }

    },


    async updateNationality(data){
      this.CONFIG.nationality = data;
      await this.loadPrices();
      //await this.sendCalculateAndValidate();


      this.resetStep4();
      this.resetStep6();

      this.scrollTo('#kv-residence-regions', true)

    },

    updateResidenceRegions(data){
      this.CONFIG.residenceRegions = data;
      this.loadPrices();
    },

    async updateDuration(data){
      // Конфирм сброса
      if (this.confirmReset &&
          (this.selectedPrice.price.id !== null || this.selectedServicePackage.id !== null || this.selectedSuppServices.length || this.selectedPostalService.id !== null)
      ) {
        if (await this.showResetConfirm()) {
          this._updateDuration(data)
        }
      } else {
        this._updateDuration(data)
      }
    },

    _updateDuration(data){
      this.selectedDuration = data;
      this._updatePrice(new this.constants.PriceDefault());
    },

    async updatePrice(data) {
      // Конфирм сброса
      //if (this.confirmReset && this.selectedPrice.price.id !== null) {
      if (this.confirmReset &&
          (this.selectedServicePackage.id !== null || this.selectedSuppServices.length || this.selectedPostalService.id !== null )
      ) {
        if (await this.showResetConfirm()) {
          this._updatePrice(data)
        }
      } else {
        this._updatePrice(data)
      }
    },


    _updatePrice(data) {
      console.log('Обновление цены')
      this.selectedPrice = data;
      this.resetStep4();
      this.resetStep6();
      this.sendCalculateAndValidate();

      // Если цена не доступна - не пускаем на 3-й шаг
      // if (this.selectedPrice.price.id && this.getPriceByProductId(this.selectedPrice.price.id) === null) {
      //   this.steps[1].allowOrder = false;
      // } else {
      //   this.steps[1].allowOrder = true;
      // }
    },
  //  ПО выбору смотреть тип. Выбирать группу или сервис и открывать шаг
    /**
     * Возращает сервисы игруппы, приведенные к единому типу: {id, srvGrpId, type,  name, description}
     */
    servicesPrepare(data) {
      return data.map(item => {
        return {
          id: item.serviceId || item.id,
          srvGrpId: item.srvGrpId ? item.srvGrpId : null,
          type: (item.srvGrpId === undefined) ? 'group' : 'item',
          name: item.name,
          description: item.description,
          selected: false
        }
      })
    },

    /**
     * Возращает группы сервисов, плюс сервисы без группы
     */
    servicesGroupsPrepare(groups, services) {
      services = services.filter(item => item.srvGrpId === null)
      return [...groups, ...services]
    },

    async selectVisaType(item) {
      // Конфирм сброса
      if (this.confirmReset &&
          (this.selectedPrice.price.id !== null || this.selectedServicePackage.id !== null || this.selectedSuppServices.length || this.selectedPostalService.id !== null)      ) {
        if (await this.showResetConfirm()) {
          this._selectVisaType(item)
        }
      } else {
        this._selectVisaType(item)
      }
    },

    /**
     * Выбор типа виз (группы или типа)
     */
    _selectVisaType(item) {
      if (item.type === 'group') {
        this.selectedServiceGroup = item;
        this.selectedService = new this.constants.ServicesDefault();

        setTimeout(() => {this.scrollTo('#kv-services', true)}, 200)
      } else {
        this.selectedService = item;
        //this.selectedServiceGroup = new this.constants.ServicesDefault();
        //this.selectedServiceGroup.id = item.srvGrpId ? item.srvGrpId : '-';

        if (item.srvGrpId) {
          this.selectedServiceGroup.id = item.srvGrpId;
        } else {
          this.selectedServiceGroup = new this.constants.ServicesDefault();
        }
      }

      this.serviceGroups.forEach(_ => {
        _.selected = item.id === _.id;
      })

      this.services.forEach(_ => {
        _.selected = item.id === _.id;
      })

      // Сброс Duration, Price ???
      this.selectedDuration = new constants.DurationDefault();
      this.selectedPrice = new constants.PriceDefault();
      this.calculate = new constants.calculateDefault();
      this.resetStep4();
      this.resetStep6();
    },



    updateTouristField(data) {
      this.currentEditTourist = data.index
      this.tourists[data.index][data.field] = data.value;
    },

    /**
     * Возращает информацию по туристу для корзины
     */
    touristInfo(i) {
      if (this.tourists.length) {
        const tourist = this.tourists[i];
        return `${tourist.gender} ${tourist.sname} ${tourist.name}`
      }
    },

    /**
     * Смена способа доставки
     */
    postalChange(data) {
      this.selectedPostalService = data;
      this.sendCalculateAndValidate();
    },

    /*STEP 3*/
    async Step3Active() {
      await this.loadProductDetails();
      await this.sendCalculateAndValidate();
    },

    /**
     * Добавляет туриста
     */
    async addTourist() {
      this.tourists.push(new this.constants.Toursit());
      await this.sendCalculateAndValidate();
      this.scrollTo(`#kv-tourist-${this.tourists.length - 1}`);
    },
    /**
     * Удаляет участника под номером Index
     * @param {Number} index
     */
    deleteTourist(index) {
      this.tourists.splice(index, 1);
      this.sendCalculateAndValidate();
    },


    /* STEP 4 */
    /**
     * Смена сервисного пакета
     */
    changePackage(pcg) {
      this.selectedServicePackage = pcg
    },

    /**
     * Выбрать услугу в пакете
     */
    changeSuppService(services) {
      this.selectedSuppServices = services;
    },
    /**
     * Сброс шага 4
     */
    resetStep4() {
      this.selectedServicePackage = new constants.ServicePackage();
      this.selectedSuppServices = [];
    },

    /* Step 6 */
    setCustomerDelivery(data) {
      this.customer = data.customer;
      this.delivery = data.delivery
    },

    /**
     * Сброс шага 6
     */
    resetStep6() {
      this.postalServices = [];
      this.selectedPostalService = new constants.PostalServiceDefault();
    },

    /* Step 7*/
    /**
     * Сохранение заявки
     * @return {Promise<void>}
     */
    async sendOrder() {
      console.log('Сохранение заявки');

      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
        body: network.toFormUrlEncoded(
            {
              productId: this.selectedPrice.price.id,
              servicePackageId: this.selectedServicePackage.id,
              suppServices: this.selectedSuppServices.map(_ => _.id),
              participants: this.tourists.map((item, i) => {
                return {
                  nr: i + 1,
                  lastName: item.sname,
                  firstName: item.name,
                  sex: (item.gender === "Herr") ? "m" : "f",
                  nationalityA2: item.nationality.codeA2 || "",
                  residenceCode: item.residenceRegion.code || "",
                  discountCode: item.discount,
                  birthdate: item.birthDate
                }
              }),
              customer: {
                title: this.customer.gender,
                lastName: this.customer.sname,
                firstName: this.customer.name,
                organization: this.customer.companyName,
                phone: this.customer.tel,
                mobilePhone: this.customer.mobile,
                email: this.customer.email,
                address: {
                  address: this.customer.address,
                  zip: this.customer.zip,
                  city: this.customer.city,
                  countryA3: this.customer.addressingCountry.codeA3
                }
              },
              delivery: {
                method: this.calculate.deliveryMedia === "digital" ? "electronic" : ((this.delivery.type == 3) ? "pick-up" : "post"),
                pickupPointId: ((this.delivery.type == 3) ? this.delivery.branch.id : null),
                postalServiceId: ((this.delivery.type == 2) ? this.selectedPostalService.id : null),
                deliveryAddress: (this.delivery.type == 2) ? {
                  title: this.delivery.gender,
                  lastName: this.delivery.sname,
                  firstName: this.delivery.name,
                  organization: this.delivery.companyName,
                  address: {
                    address: this.delivery.address,
                    zip: this.delivery.zip,
                    city: this.delivery.city,
                    countryA3: this.delivery.addressingCountry.codeA3
                  }
                } : null
              },
              uniqueKey: this.uniqueKey,
            }
        )
      };
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}order?clientId=${this.CONFIG.clientId}`, requestOptions);
        let responseData = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(responseData.Message);
        }

        this.isLoading = false;

        this.CONFIG.order = responseData.orderNr;
        if (responseData.state >= 0 && responseData.orderNr) {
          this.nextStep()
        } else {
          this.showModal(responseData.stateDescription, this.$lng("common.error"))
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /* Step 8 */

    async loadStep8Data() {
      await this.loadPaymentMethods();
    },

    async loadPaymentMethods() {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: network.toFormUrlEncoded(
            {
              orderNr: this.CONFIG.order,
            }
        ),
        redirect: 'follow'
      };
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getPaymentMethods?clientId=${this.CONFIG.clientId}`, requestOptions);
        let responseJSON = await response.json();
        if (response.status >= 400 && response.status < 600) {
          if (responseJSON.Message) {
            this.showModal(responseJSON.Message, this.$lng("common.error"))
          }
          throw new Error(responseJSON.Message);
        }

        this.isLoading = false;
        this.paymentMethods = responseJSON.paymentMethods;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },


    async makePayment() {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: network.toFormUrlEncoded(
            {
              orderNr: this.CONFIG.order,
              payment: {
                method: this.paymentType,
                bankCode: this.paymentData.bic,
                bankAccount: this.paymentData.iban
              }
            }
        ),
        redirect: 'follow'
      };
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}makePayment?clientId=${this.CONFIG.clientId}`, requestOptions);
        let responseJSON = await response.json();
        if (response.status >= 400 && response.status < 600) {
          if (responseJSON.Message) {
            this.showModal(responseJSON.Message, this.$lng("common.error"))
          }
          throw new Error(responseJSON.Message);
        }


        this.isLoading = false;
        if (responseJSON.state >= 0) {
          this.CONFIG.mode = "success";
          setTimeout(
              () => {this.scrollTo(null)},
              500
          )
        } else {
          this.showModal(responseJSON.stateDescription, this.$lng("common.error"))
        }

      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    }

  },
  computed: {
    /**
     * Выводить модалку о сбросе параметров
     */
    confirmReset() {
      return this.steps[2].isValid
    },

    /**
     * Возращает информацию по текущему шагу
     * @return {{crumb: string, icon: string, header: string}}
     */
    stepInfo() {
      return this.currentStep ? this.steps[this.currentStep - 1] :
          {
            crumb: '',
            header: '',
            icon: ''
          }
    },



    /**
     *  Функцию возращает цепочку по текущему шагу
     *
     */
    crumbs() {
      return this.steps.slice(0, this.currentStep).map(el => el.crumb )
    },

    /**
     * Можно ли преейти на следующий шаг из текущего
     */
    allowNext() {
      if (this.currentStep === 1) {
        if (this.selectedCountry.codeA3 && this.selectedService.id) {
          return true
        }
      }

      // TODO: проверка
      if (this.currentStep === 2) {
        if (this.selectedPrice.price.price !== null && this.steps[1].allowOrder) {
          return true
        }
      }

      if (this.currentStep === 3) {
        return this.steps[2].isValid && this.steps[2].allowOrder
      }

      // TODO: проверка
      if (this.currentStep === 4) {
        return true
      }

      // TODO: проверка
      if (this.currentStep === 5) {
        return this.steps[4].isValid
      }

      if (this.currentStep === 6) {
        if (this.selectedPostalService.id !== null) {
          return true
        }
      }
      // TODO: проверка
      if (this.currentStep === 7) {
        return true
      }
      if (this.currentStep === 8) {
        return this.steps[7].isValid
      }
      return false
    },

    /**
     * Возращает информация по выбранной стране
     * @return {}
     */
    /*
    countrySelected() {
      //console.log(this.countries.filter(item => item.codeA3 == this.selectedCountryId))
      const country = this.countries.find(item => item.codeA3 == this.selectedCountryId)
      return country || {name: ''}
    },
  */
    /**
     * Возращает название выбранного типа визы TODO: DEL
     * @return {String}
     */
    serviceNameSelected() {
      const service = this.services.find(item => item.id === this.selectedService.id)
      return service ? service.name : ''
    },


    /**
     * Возращает подтипы виз по выбранному типу виз
     * @return {[]}
     */
    serviceGroupsSelected() {
      return this.services.filter(item => item.srvGrpId && item.srvGrpId === this.selectedServiceGroup.id)
    },


    /* STEP 3 */

    totalAmount() {
      let amount = this.calculate.amount;
      if (amount !== null) {
        return this.formatter.priceFormat(amount)
      } else {
        return this.constants.dashSymbol
      }
    },

    /* Price mode */
    priceVisaTypeModel: {
      get () {
        if (this.CONFIG.service) {
          return this.serviceGroupsSelected.find(item => item.id === this.CONFIG.service).id;
        }
        return null
      },
      set (value) {
        if (value) {
          this.selectVisaType(this.serviceGroupsSelected.find(item => item.id === value))
        }
      },
    },




  },
  mounted() {
    // 1. Инициировать виджет
    if (!this.initiateWidget()) {
      return false
    }

    this.isMobile = document.querySelector('#kv-app').getBoundingClientRect().width < 640

/*
    function resizeElement(e, s, t, l) {
      let i, v = document.querySelectorAll(e);
      if (v)
        for (let c = 0; c < v.length; c++) {
          let a = v[c];
          if (i = e !== s && s ? a.querySelectorAll(s) : document.querySelectorAll(e), i)
            for (let e = 0; e < i.length; e++) {
              let s = i[e];
              a.offsetWidth <= l ? s.classList.add(t) : s.classList.contains(t) && s.classList.remove(t)
            }
        }
    } ["resize", "load"].forEach(e => window.addEventListener(e, () => {
      resizeElement(".kv-class-tabs", ".kv-class-tab", "kv-class-tab_bp", 991), resizeElement(".kv-class-tab", ".kv-class-tab__title", "kv-class-tab__title_hidden", 94), resizeElement(".kv-services", ".kv-classes__item", "kv-classes__item_bp", 991), resizeElement(".kv-services", ".kv-classes", "kv-classes_bp", 991), resizeElement(".kv-services", ".kv-class", "kv-class_bp", 991), resizeElement(".kv-services", ".kv-services", "kv-services_bp", 991), resizeElement(".kv-services", ".kv-services__item", "kv-services__item_bp", 991), resizeElement(".kv-class-tabs", ".kv-tabs-tail", "kv-tabs-tail_bp", 991), resizeElement(".kv-class-tabs", ".kv-class-tabs", "kv-class-tabs_bp", 991), resizeElement(".kv-services__footer", ".kv-services__prices", "kv-services__prices_bp", 991)
    }, !1));


 */

  }
}
</script>

<style>
/*
#kv-app {
  --primary: #02a7f0;
}
*/
/* строка состояния, калькуляция */
/* увеличил отступы Y */
.kv-app .kv-cart-table__item {
  padding: 5px 15px;
  overflow: initial;
  text-overflow: initial;
  white-space: initial;
  overflow-wrap: initial;
}


.vld-overlay {
  bottom: 0 !important;
  left: 0 !important;;
  position: absolute !important;;
  right: 0 !important;;
  top: 0 !important;;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}


/* select */
.v-select {
  width: 100%;
}
.kv-app .kv-select .vs__dropdown-toggle {
  border: none;
}
.v-select .vs__selected {
  color: var(--c-second_dark);
  font-size: 18px;
}
.kv-select__input .vs__clear,
.kv-select__input .vs__open-indicator {
  fill: var(--c-second);
}
.kv-select__input .vs__dropdown-option--highlight{
  background:#ADE1F5;
}
.vs__dropdown-menu {
  border-color: var(--c-second);
}

.kv-form__sel-custom .vs__actions {
  display: none;
}
.kv-form__sel-custom .vs__selected-options {
  padding-left: 13px;
}

.kv-form__sel-custom .vs__dropdown-toggle {
  padding: 0;
}

.kv-form__sel-custom {
  width: 100%;
}


/* modal */
.vsm-modal-body {
  max-height: 88vh;
  overflow-y: auto;
}
.vsm-modal .btn-close span {
  font-size: 30px;
  color: #555;
}



/* TODO: ПЕРЕНОС */

.kv-app .kv-select .kv-select__input {
  padding: 0;
}
.kv-app .kv-select select.kv-select__input,
.kv-app .kv-select input.kv-select__input {
  padding: 7px 32px 7px 10px;
}





.kv-app .kv-form__item input:not(:placeholder-shown) ~ .kv-form__label {
  top: 7px;
  color: var(--c-disabled_dark);
}

.kv-app .kv-form__item input:not(:placeholder-shown) ~ .kv-form__label,
.kv-app .kv-form__item input:focus ~ .kv-form__label,
/*.kv-app .kv-form__item select:focus ~ .kv-form__label,*/
.kv-app .kv-form__item.kv_is-focused .kv-form__label,
.kv-app .kv_is-focused .kv-form__label {
  top: 3px;
  font-size: 14px;
  line-height: 25px;
}

/*
.kv-app .kv-form__label {
  pointer-events: auto;
  top: 0;
  left: 0;
  right: 0;
  padding-left: 20px;
  line-height: 60px;
  z-index: 1;
}
*/
.kv-form__sublabel {
  position: absolute;
  bottom: 3px;
  left: 20px;
  font-size: 14px;
  z-index: 0;
  color: var(--c-disabled_dark);
}
.kv-app .kv-form__item input:focus ~ .kv-form__sublabel {
  display: none;
}


.kv-modal-buttons .kv-step-button{
  height: auto;
  padding: 8px 20px;
}

/* FIRE FOX FIXES */
@-moz-document url-prefix() {
  .kv-app .kv-form__sel {
    padding-left: 14px;
  }
}
</style>
