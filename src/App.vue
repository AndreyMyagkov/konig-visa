<template>
  <div id="kv-app" class="kv-app" notranslate>

    <!-- HEADER -->
    <div class="kv-header">

      <!-- Bread Crumbs -->
      <BreadCrumbs :crumbs="crumbs"/>
      <!-- /Bread Crumbs -->

      <!-- Info bar -->
      <div class="kv-header__item kv-step-values">
        <div class="kv-step-values__inner">
          <div class="kv-step-values__row">
            <div class="kv-step-values__item" v-if="selectedCountry.name">
              <span>{{selectedCountry.name}}</span>
            </div>


            <div class="kv-step-values__item" v-if="serviceNameSelected">
              <span>{{serviceNameSelected}}</span>
              <span v-if="selectedDuration.name">{{selectedDuration.name}} <span v-if="selectedPrice.price.m">| {{selectedPrice.price.m}}-malige Einreise</span></span>
            </div>

          </div>

          <!-- cart -->

          <div class="kv-step-values__aside" v-if="calculate.calculation.participants.length">

            <div class="kv-participants">
              <svg class="kv-participants__icon"><use href="img/icons/icons.svg#user"></use></svg>
              <div class="kv-participants__multiply">
                <svg><use href="img/icons/icons.svg#multiply"></use></svg>
              </div>
              <div class="kv-participants__counter">{{calculate.calculation.participants.length}}</div>
            </div>

            <div class="kv-cart drop">

              <div class="kv-cart__head">
                <svg class="kv-cart__icon"><use href="img/icons/icons.svg#cart"></use></svg>

                <div class="kv-cart__price" data-kv-cart-price="€"> {{totalAmount}}</div>
                <svg class="kv-cart__arrow drop__angle"><use href="img/icons/icons.svg#arrow_down"></use></svg>
              </div>

              <div class="kv-cart__body drop__body">

                <div class="kv-cart-table">

                  <div class="kv-cart-table__row" v-for="(item, i) in calculate.calculation.participants" :key="i">
                    <div class="kv-cart-table__item">{{item.nr}}</div>
                    <div class="kv-cart-table__item kv-cart-table__item_col">{{ touristInfo(i) }}</div>
                    <div class="kv-cart-table__item kv-cart-table__item_price" data-kv-cart-price="€">
                      <template  v-if="item.price !== null">{{item.price}}</template>
                      <!-- &minus -->
                      <template v-else><span v-html="constants.dashSymbol"></span> </template>
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


    <!-- MAIN -->
    <div class="kv-content">
      <!-- Step Header -->
      <StepHeader :icon="stepInfo.icon" :text="stepInfo.header"/>
      <!-- /Step Header -->

      <!-- Top buttons -->
      <PrevNextButtons
          :currentStep="currentStep"
          :allowNext="allowNext"
          @setStep="setStep"
      ></PrevNextButtons>
      <!-- /Top buttons -->


      <simple-modal v-model="isModalShow" :title="modal.title" size="small">
        <template slot="body">
          <div v-html="modal.content"></div>
        </template>

      </simple-modal>


      <div class="kv-content__body">
        <!-- Step 1 -->
          <div class="kv-buch"  v-if="currentStep === 1">

            <div class="kv-buch__row">

              <!-- Country -->
              <div class="kv-buch__col">

                <div class="kv-buch__col-inner">
                  <div class="kv-buch__title">Выберите страну назначения:</div>
                  <div class="kv-buch__list">

                    <!-- select -->
                    <!--
                    <div class="kv-select">
                      <div class="kv-select__badge">
                        <svg class="kv-select__icon"><use href="img/icons/icons.svg#pin"></use></svg>
                      </div>
                      <select class="kv-select__input" v-model="selectedCountryId" @change="countryChange">
                        <option value="0" selected>Не выбрано</option>
                        <option :value="item.codeA3" v-for="item in countries" :key="item.codeA3">{{item.name}}</option>
                      </select>
                      <svg class="kv-selct__arrow">
                        <use href="img/icons/icons.svg#arrow_down"></use>
                      </svg>
                    </div>
                    -->
                    <!-- /select -->


                    <!-- select -->
                    <div class="kv-select">
                      <div class="kv-select__badge">
                        <svg class="kv-select__icon"><use href="img/icons/icons.svg#pin"></use></svg>
                      </div>
                      <div class="kv-select__input">
                        <v-select
                            :options="countries"
                            label="name"
                            placeholder="Выберите"
                            v-model="selectedCountry"
                            :clearable="false"
                            @option:selected="countryChange"

                        />
                      </div>
                    </div>
                    <!-- /select -->

                  </div>
                </div>
              </div>
              <!-- /Country -->

              <!-- Groups -->
              <div class="kv-buch__col">
                <div class="kv-buch__col-inner" v-if="serviceGroups.length">
                  <div class="kv-buch__title">Выберите группу:</div>
                  <VisaTypes
                      :data="serviceGroups"
                      :selected="[selectedServiceGroup, selectedService]"
                      @change="selectVisaType"
                      @showModal="showModal"
                  >

                  </VisaTypes>
                </div>
              </div>
              <!-- /Groups -->

              <!-- Services -->
              <div class="kv-buch__col">
                <div class="kv-buch__col-inner"  v-if="serviceGroupsSelected.length">
                  <div class="kv-buch__title">Выберите подтип визы:</div>
                  <VisaTypes
                      :data="serviceGroupsSelected"
                      :selected="[selectedService]"
                      @change="selectVisaType"
                      @showModal="showModal"
                  >
                  </VisaTypes>
                  <!--
                  <div class="kv-buch__list kv-buch__list_scroll">

                    <div class="kv-buch__list-item" v-for="item in serviceGroupsSelected" :key="item.serviceId" @click="selectService(item.serviceId)">
                      <label class="kv-buch-chb">
                        <input type="radio" checked name="visa-type" aria-label="checkbox">
                        <span class="kv-buch-chb__caption">
                          <span class="kv-buch-chb__title">
                            {{item.name}}
                            <svg class="kv-buch-chb__icon"><use href="img/icons/icons.svg#play"></use></svg>
                          </span>
                          <span class="kv-buch-chb__badge"  :title="item.description">
                            <svg class="kv-buch-chb__info"  v-if="item.description"><use href="img/icons/icons.svg#info"></use></svg>
                            <span v-html="item.description" style="display: none"></span>
                          </span>
                        </span>
                      </label>
                    </div>

                  </div>
                  -->
                </div>
              </div>
              <!-- /Services -->

            </div>
          </div>
        <!-- /Step 1 -->

        <!--
        <Step1
            :countries="countries"
        ></Step1>
        -->


        <!-- STEP 2 -->
        <Step2
            :serviceDetails="serviceDetails"
            :nationalities="nationalities"
            :prices="prices"

            :setup="{
              nationality: CONFIG.nationality,
              residenceRegions: CONFIG.residenceRegions,
              duration: selectedDuration,
              price: selectedPrice
            }"

            @active="loadStep2Data"
            @update:nationality="updateNationality"
            @update:residenceRegions="updateResidenceRegions"
            @update:duration="updateDuration"
            @update:price="updatePrice"
            @load:prices="loadPrices"
            @showModal="showModal"
            v-if="currentStep === 2"/>
        <!-- /STEP 2 -->

        <!-- STEP 3 -->
        <!--
        :nationality="CONFIG.nationality"
               :residenceRegions="CONFIG.residenceRegions"
        -->
        <Step3 v-if="currentStep === 3"
               :tourists="tourists"
               :nationalities="nationalities"

               :productDetails="productDetails"
               @update:tourists="updateTourists"
               @active="loadProductDetails"
               @change="sendCalculateAndValidate"
        >
        </Step3>
        <!-- /STEP 3 -->

        <!-- STEP 4 -->
        <Step4 v-if="currentStep === 4"
               :data="productDetails"
               @showModal="showModal"
        />
        <!-- /STEP 4 -->

        <!-- STEP 5 -->
        <Step5 v-if="currentStep === 5"
               :addressingCountries="addressingCountries"
               :pickupPoints="pickupPoints"
               @active="loadStep5Data"
        />
        <!-- /STEP 5 -->

        <!-- STEP 6 -->
        <Step6 v-if="currentStep === 6"
               :postalServices="postalServices"
               @change="postalChange"
               @active="loadPostalServices"
        />
        <!-- /STEP 6 -->

        <!-- STEP 7 -->
        <Step7 v-if="currentStep === 7"
               :data="{
                  toCountry: selectedCountry,
                  type: '',
                  subType: '',
                  duration: selectedDuration,
                  price: selectedPrice,
                  tourists: tourists,
                  customer: customer,
                  delivery: delivery
               }"


        />
        <!-- /STEP 7 -->

        <!-- STEP 8 -->
        <Step8 v-if="currentStep === 8"/>
        <!-- /STEP 8 -->

        <!-- Bottom buttons -->
        <PrevNextButtons
            :currentStep="currentStep"
            :allowNext="allowNext"
            @setStep="setStep"
        ></PrevNextButtons>
        <!-- /Bottom buttons -->

      </div>
    </div>
    <!-- /MAIN -->




    <loading :active="isLoading"
             :can-cancel="false"
             :is-full-page="true">

    </loading>
  </div>
</template>

<script>
import '@/assets/css/style.css';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import StepHeader from '@/components/ui/StepHeader';
import kvSelect from '@/components/ui/kvSelect';
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
import PrevNextButtons from "@/components/PrevNextButtons";
import SimpleModal from "simple-modal-vue";

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
//@import "vue-select/src/scss/vue-select.scss"; в scss

import * as network from '@/helpers/network';
import * as constants from "@/helpers/constants";

// TODO: стили изолировать
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    BreadCrumbs,
    ProgressBar,
    StepHeader,
    VisaTypes,
    kvSelect,
    Loading,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    PrevNextButtons,
    SimpleModal,
    vSelect
  },
  data() {
    return {
      constants,
      isModalShow: false,
      modal: {
        title: '',
        content: ''
      },

      steps: [
        {
          crumb: 'Buchungsauftrag',
          header: 'Buchungsauftrag',
          icon: 'step_1'
        },
        {
          crumb: 'Aufenthaltsdauer',
          header: 'Расчет примерной стоимости для одного человека',
          icon: 'step_2'
        },
        {
          crumb: 'Заполнение данных о туристах',
          header: 'Заполнение данных',
          icon: 'step_3'
        },
        {
          crumb: 'Дополнительные услуги',
          header: 'Дополнительные услуги',
          icon: 'step_4'
        },
        {
          crumb: 'Информация о заказчике',
          header: 'Информация о заказчике',
          icon: 'step_5'
        },
        {
          crumb: 'Способ отправки',
          header: 'Способ отправки',
          icon: 'step_6'
        },
        {
          crumb: 'Проверка данных',
          header: 'Проверка данных',
          icon: 'step_7'
        },
        {
          crumb: 'Способ оплаты',
          header: 'Способ оплаты',
          icon: 'step_8'
        }
      ],
      currentStep: 1,
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

      //TODO: Препарированные. Сверху убрать?
      serviceGroupsPrepared: [],

      selectedCountry: [],
      selectedCountryId: 0,
      selectedServiceGroup: null,
      selectedService: null,

      calculate: {
        amount: 0,
        calculation: {
          participants: []
        },
        state: 0,
        stateDescription: ''
      },

      // Название выбранной продолжительности
      selectedDuration: new constants.DurationDefault(),
      selectedPrice: new constants.PriceDefault(),

      // Список туристов
      tourists: [],


      // Шаг 5
      addressingCountries: [],
      pickupPoints: [],
      delivery: {},
      customer: {
        addressingCountry: {
          codeA3: "DEU",
        },
        zip: "125130",
        city: "10115"
      },


      // Шаг 6
      postalServices: [],
      postalService: null,


      CONFIG: {
        clientId: '',
        nationality: null,
        residenceRegions: null,
        API_URL: 'https://apisrv.ideo-software.com/Ideo/KoenigVN/Web/api/OrderPortal/'
      }
    }
  },
  methods: {
    /**
     * Инициирует виджет, проверяет входные данные
     */
    initiateWidgete() {

      if (__KV_CONFIG && __KV_CONFIG.clientId) {
        //this.CONFIG.clientId = __KV_CONFIG.clientId;
        this.CONFIG = Object.assign(this.CONFIG,__KV_CONFIG);
      } else {
        return false
      }

      // Подавить замену цифр на телефоны https://gist.github.com/yuezk/15c5bb1370e30d0a2a60
      const head = document.head;
      const meta = document.createElement('meta');
      meta.name = 'format-detection';
      meta.content = 'telephone=no';
      head.appendChild(meta);

      // Подключить внешний файл CSS
      if (__KV_CONFIG && __KV_CONFIG.css) {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = __KV_CONFIG.css;
        head.appendChild(link);
      }

      return true
    },

    /**
     * Устанавливает номер текущего шага
     */
    setStep(step) {
      if (this.currentStep >= 1 || this.currentStep < this.steps.length) {
        this.currentStep = step
      }
    },

    /**
     * Показывает модальное окно с текстом
     * @param content
     * @param title
     */
    showModal(content = '', title = '') {
      console.log('модалка')
      console.log(content)
      this.modal.title = title;
      this.modal.content = content;
      if (content.length) {
        this.isModalShow = true;
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
        this.countries = countries.countries;
        this.isLoading = false;
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
        let response = await fetch(`${this.CONFIG.API_URL}getCSServiceDetails?clientId=${this.CONFIG.clientId}&serviceId=${this.selectedService}`);
        let serviceDetails = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        // Случай, если недоступны цены
        if (serviceDetails.processDurations === null) {
          serviceDetails.processDurations = []
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
        let response = await fetch(`${this.CONFIG.API_URL}getCSPrices?clientId=${this.CONFIG.clientId}&serviceId=${this.selectedService}&nationalityA2=${this.CONFIG.nationality}&residenceCode=${this.CONFIG.residenceRegions}&withDetails=false`);
        let prices = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }
        // Случай, если недоступны цены TODO: ???
        if (prices.prices === null) {
          prices.prices = []
        }
        this.prices = prices;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    /**
     * Загружает детальную инфо по продукту
     */
    async loadProductDetails() {
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSProductDetails?clientId=${this.CONFIG.clientId}&productId=${this.selectedPrice.price.id}`);
        let productDetails = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }

        this.productDetails = productDetails.product;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }
    },

    async sendCalculateAndValidate() {
      console.log('Калькуляция, валидация');

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
              })
            }
        ),
        redirect: 'follow'
      };
      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}calculateAndValidate?clientId=${this.CONFIG.clientId}`, requestOptions);
        let calculate = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(countries.Message);
        }

        this.calculate = calculate;
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
     *  Смена страны: загрузка справочника достуных типов виз
     *  TODO: разделить логику
     */
    async countryChange() {
      this.selectedCountryId = this.selectedCountry.codeA3;

      console.log('Изменилась страна ' + this.selectedCountryId);
      if (!this.selectedCountryId) {
        console.log('Страна не выбрана'); // TODO: что делаем?
        return
      }

      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSServices?clientId=${this.CONFIG.clientId}&countryA3=${this.selectedCountryId}`);
        let services = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(services.Message);
        }



        console.log('сервисы:');
        const srv = this.servicesPrepare(services.services)
        console.log(srv);

        console.log('группы:');
        const grp = this.servicesPrepare(services.serviceGroups)
        console.log(grp);

        console.log('группы + сервисы:');
        const grpServ = this.servicesGroupsPrepare(grp, srv);
        console.log(grpServ)

        this.services = srv;
        this.serviceGroups = grpServ;

        this.selectedServiceGroup = null;
        this.selectedService = null;

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }

    },


    updateNationality(data){
      console.log('Обновились данные 2 шага: нац');
      console.log(data)

      this.CONFIG.nationality = data;
      this.loadPrices();
    },

    updateResidenceRegions(data){
      console.log('Обновились данные 2 шага: место');
      console.log(data)
      this.CONFIG.residenceRegions = data;
      this.loadPrices();
    },

    updateDuration(data){
      console.log('Обновилась продолжительность:');
      console.log(data)
      this.selectedDuration = data;
    },


    updatePrice(data) {
      console.log('Обновилась цена:');
      console.log(data)
      this.selectedPrice = data
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

    /**
     * Выбор типа виз (группы или типа)
     */
    selectVisaType(item) {
      if (item.type === 'group') {
        console.log('Выбрана группа ' + item.id);
        this.selectedServiceGroup = item.id;
        this.selectedService = null;
      } else {
        console.log('Выбрана тип' + item.id);
        this.selectedService = item.id;
        this.selectedServiceGroup = item.srvGrpId;
      }

      this.serviceGroups.forEach(_ => {
        _.selected = false;
        if (item.id === _.id) {
          _.selected = true;
        }
      })

      this.services.forEach(_ => {
        _.selected = false;
        if (item.id === _.id) {
          _.selected = true;
        }
      })

    },

    /**
     * Выбор группы виз
     * TODO: DEL
     */
    selectServiceGroup(id) {
      this.selectedServiceGroup = id;
      console.log('Выбрана группа '+ id)
    },

    /**
     * Выбор типа виз
     * TODO: DEL
     */
    selectService(id) {
      this.selectedService = id;
      console.log('Выбран тип виз '+ id)
    },

    /**
     * Обновить массив туристов
     */
    updateTourists(data) {
      console.log('Туристы обновлены')
      this.tourists = data;
    },
    /**
     * Возращает информацию по туристу для корзины
     */
    touristInfo(i) {
      if (this.tourists.length) {
        const tourist = this.tourists[i];
        console.log('турист', i)
        console.log(tourist)
        return `${tourist.gender} ${tourist.sname} ${tourist.name}`
      }
    },

    /**
     * Смена способа доставки
     */
    postalChange(id) {
      this.postalService = id;
    }

  },
  computed: {

    /**
     * Возращает информацию по текущему шагу
     * @return {{crumb: string, icon: string, header: string}}
     */
    stepInfo() {
      return this.steps[this.currentStep - 1]
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
        if (this.selectedCountryId && this.selectedService) {
          return true
        }
      }

      // TODO: проверка
      if (this.currentStep === 2) {
        if (this.selectedPrice.price.price !== null) {
          return true
        }
      }
      // TODO: проверка
      if (this.currentStep === 3) {
        return true
      }

      // TODO: проверка
      if (this.currentStep === 4) {
        return true
      }

      // TODO: проверка
      if (this.currentStep === 5) {
        return true
      }
      // TODO: проверка
      if (this.currentStep === 6) {
        return true
      }
      // TODO: проверка
      if (this.currentStep === 7) {
        return true
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
     * Возращает название выбранного типа визы
     * @return {String}
     */
    serviceNameSelected() {
      const service = this.services.find(item => item.id == this.selectedService)
      return service ? service.name : ''
    },


    /**
     * Возращает подтипы виз по выбранному типу виз
     * @return {[]}
     */
    serviceGroupsSelected() {
      return this.services.filter(item => item.srvGrpId  && item.srvGrpId === this.selectedServiceGroup)
    },


    /* STEP 3 */

    totalAmount() {
      let amount = this.calculate.amount;
      if (amount !== null) {
        return amount
      } else {
        return this.constants.dashSymbol
      }
    }


  },
  mounted() {
    // 1. Инициировать виджет
    if (!this.initiateWidgete()) {
      return false
    }

    // 2. Загружаем справочники стран
    this.loadCountries()

    // Загрузка списка гражданств
    // TODO: вынос в mount шага 2, кеш
    //this.loadNationalities()


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

  }
}
</script>

<style>
#kv-app {
  --primary: #02a7f0;
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
.kv-app .kv-select .kv-select__input {
  padding: 0;
}
.kv-app .kv-select select.kv-select__input,
.kv-app .kv-select input.kv-select__input {
  padding: 7px 32px 7px 10px;
}
.kv-app .kv-select .vs__dropdown-toggle {
  border: none;
}
.kv-select__input .vs__selected {
  color: var(--c-second);
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

/* modal */
.vsm-modal-body {
  max-height: 88vh;
  overflow-y: auto;
}
.vsm-modal .btn-close span {
  font-size: 30px;
}


.kv-app .kv-form__item input:not(:placeholder-shown) ~ .kv-form__label {
  top: 7px;
  font-size: 14px;
  color: var(--c-disabled_dark);
}

</style>
