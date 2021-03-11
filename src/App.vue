<template>
  <div id="kv-app" class="kv-app" notranslate>

    <!-- Bread Crumbs -->
    <BreadCrumbs :crumbs="crumbs"/>
    <!-- /Bread Crumbs -->

    <!-- InfoBar -->
    <!-- /InfoBar -->

    <!-- ProgressBar -->
    <ProgressBar :now="stepPercentage"/>
    <!-- ProgressBar -->

    <!-- Step Header -->
    <StepHeader :icon="stepInfo.icon" :text="stepInfo.header"/>
    <!-- /Step Header -->

    <br><br>
    <!-- STEP 1 -->
    <!-- TODO: в компонент -->
      Выберите страну назначения: <br>
    <select v-model="selectedCountry" @change="countryChange">
      <option value="0">Не выбрано</option>
      <option :value="item.codeA3" v-for="item in countries" :key="item.codeA3">{{item.name}}</option>
    </select>

    <br><br>

    Выберите тип визы:<br>
    <div v-for="item in serviceGroups" :key="item.id" @click="selectServiceGroup(item.id)" style="border:solid 1px blue; margin-bottom: 20px">{{item.name}}<br> <div v-html="item.description"></div><br></div>
    <br><br>

    Выберите подтип визы:<br>
    <div v-for="item in serviceGroupsSelected" :key="item.serviceId" @click="selectService(item.serviceId)"  style="border:solid 1px blue; margin-bottom: 20px">{{item.name}}<br> <div v-html="item.description"></div></div>
    <br><br>

    <!-- /STEP 1 -->


    <!-- STEP 2 -->
    <div ></div>
    <!-- /STEP 2 -->





    <loading :active.sync="isLoading"
             :can-cancel="false"
             :is-full-page="true">

    </loading>
  </div>
</template>

<script>
import BreadCrumbs from './components/BreadCrumbs.vue'
import ProgressBar from './components/ui/ProgressBar.vue'
import StepHeader from './components/ui/StepHeader'

import Loading from 'vue-loading-overlay'

// TODO: стили изолировать
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    BreadCrumbs,
    ProgressBar,
    StepHeader,
    Loading
  },
  data() {
    return {
      steps: [
        {
          crumb: 'Страница 1',
          header: 'Страница 1 Страница 1',
          icon: 'icon'
        },
        {
          crumb: 'Страница 2',
          header: 'Страница 2 Страница 2',
          icon: 'icon 2'
        },
        {
          crumb: 'Страница 3',
          header: 'Страница 3 Страница 3',
          icon: 'icon 3'
        }
      ],
      currentStep: 2,
      isLoading: false,

      countries: [],
      services: [],
      serviceGroups: [],

      selectedCountry: null,
      selectedServiceGroup: null,
      selectedService: null,

      CONFIG: {
        clientId: '',
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
        this.CONFIG.clientId = __KV_CONFIG.clientId;
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
     *  Смена страны: загрузка справочника достуных типов виз
     */
    async countryChange() {
      console.log('Изменилась страна ' + this.selectedCountry);
      if (!this.selectedCountry) {
        console.log('Страна не выбрана'); // TODO: что делаем?
      }

      try {
        this.isLoading = true;
        let response = await fetch(`${this.CONFIG.API_URL}getCSServices?clientId=${this.CONFIG.clientId}&countryA3=${this.selectedCountry}`);
        let services = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(services.Message);
        }
        this.services = services.services;
        this.serviceGroups = services.serviceGroups;
        this.selectedServiceGroup = null;
        this.selectedService = null;

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err)
      }

    },

    /**
     * Выбор группы виз
     */
    selectServiceGroup(id) {
      this.selectedServiceGroup = id;
      console.log('Выбрана группа '+ id)
    },

    /**
     * Выбор типа виз
     */
    selectService(id) {
      this.selectedService = id;
      console.log('Выбран тип виз '+ id)
    }

  },
  computed: {
    /**
     * Возращает информацию по текущему шагу
     * @return {{crumb: string, icon: string, header: string}}
     */
    stepInfo() {
      return this.steps[this.currentStep]
    },

    /**
     * Возращает текущий шаг в процентах
     * @return {number}
     */
    stepPercentage() {
      return Math.ceil(this.currentStep * 100 / this.steps.length)
    },

    // Функцию возращает цепочку по текущему шагу
    crumbs() {
      return this.steps.slice(0, this.currentStep + 1).map(el => el.crumb )
    },

    /**
     * Возращает подтипы виз по выбранному типу виз
     * @return {[]}
     */
    serviceGroupsSelected() {
      return this.services.filter(item => item.srvGrpId === this.selectedServiceGroup)
    }


  },
  mounted() {
    // 1. Инициировать виджет
    if (!this.initiateWidgete()) {
      return false
    }

    // 2. Загружаем справочники стран
    this.loadCountries()


    // 3. Отобразить нужный шаг
    // 4. Как ввели данные по шагу 1 - открываем шаг 2 и тд


  }
}
</script>

<style lang="scss">
#kv-app {
  --primary: #02a7f0;
}
</style>
