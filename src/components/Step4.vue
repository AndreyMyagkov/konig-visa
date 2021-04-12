<template>
  <div class="kv-content__body">
    <div class="kv-content__text" v-html="data.servicePackagesInfo"></div>
    <div class="kv-class-tabs">
      <div class="kv-class-tabs_right">
        <div class="kv-class-tabs__list">
          <!-- Class tab-->
          <div
              class="kv-class-tabs__item"
              v-for="(tab, index) in data.servicePackages"
              :key="index">

            <div class="kv-class-tab"
                 :class="{
                      'kv-class-tab_active': packageSelected.id === tab.id,
                 }"
              >
              <svg class="kv-class-tab__info" @click="$emit('showModal', tab.description, tab.name)">
                <use href="img/icons/icons.svg#info"></use>
              </svg>
              <div class="kv-class-tab__rate">
                <svg class="kv-class-tab__star" v-for="star in (index + 1)" :key="star">
                  <use href="img/icons/icons.svg#star"></use>
                </svg>
              </div>
              <div class="kv-class-tab__title">{{tab.name}}</div>
            </div>
          </div>

        </div>


        <div class="kv-tabs-tail kv-class-tabs__tail"
             :class="tabClasses"
        >
          <!-- Tabs tail-->
          <div class="kv-tabs-tail__inner"
               :style="`--kv-tabs-tail-width: calc(${tabTailLength}% + 7px); --kv-tabs-tail-offset: 50%`">
            <div class="kv-tabs-tail__line"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="kv-services">
      <!-- Services item-->
      <div class="kv-services__item" v-for="(item, i) in data.suppServices" :key="item.id">
        <div class="kv-service kv-services__item-inner">
          <div class="kv-service__main">
            <div class="kv-service__title">{{item.name}}</div>
            <div class="kv-service__text" v-html="item.description"></div>
          </div>
          <div class="kv-service__aside">
            <div class="kv-price kv-service__price">
              {{item.price}}
              <span class="kv-price__currency">€</span>
            </div>

            <div class="kv-service__caption">pro Person</div>
          </div>
        </div>
        <!-- Class-->
        <div class="kv-class">
          <!-- Class item-->
          <div
              class="kv-class__item"
              :class="{
                'kv-class__item_active': packageSelected.id === pcg.id,
                'kv-class__item_checked': serviceSelected.indexOf(item.id) !== -1,
                'kv-class__item_add': isIncluded(item.id, packageIndex)
              }"
               v-for="(pcg, packageIndex) in data.servicePackages" :key="packageIndex">

            <template v-if="isIncluded(item.id, packageIndex)">
              <div class="kv-class__caption">включено</div>
              <svg class="kv-class__check">
                <use href="img/icons/icons.svg#check"></use>
              </svg>
            </template>

            <template v-else>


                <label class="kv-switcher kv-class__switcher">
                  <input class="kv-switcher__input"
                         type="checkbox"
                         name="suppService"
                         :value="item.id"
                         v-model="serviceSelected"
                         @change="suppServiceChange"
                  >
                  <span class="kv-switcher__inner">
                      <div class="kv-switcher__caption kv-class__caption" data-kv_on="добавлено" data-kv_off="добавить"></div>
                      <div class="kv-switcher__box">
                         <svg class="kv-switcher__icon">
                            <use href="img/icons/icons.svg#check"></use>
                         </svg>
                         <div class="kv-switcher__mark"></div>
                      </div>
                   </span>
                </label>


            </template>

          </div>

        </div>
      </div>


      <div class="kv-services__footer">
        <div class="kv-services__prices">
          <!-- Class footer-->
          <div
              class="kv-services-price kv-services__price"
              :class="{
                'kv-services-price_active':  packageSelected.id === pcg.id
              }"
              v-for="(pcg, packageIndex) in data.servicePackages" :key="packageIndex"
          >
            <div class="kv-price kv-price_second kv-services-price__price">
              <template v-if="packageSelected.id !== pcg.id">+&nbsp;</template>
              {{getPackagePrice(packageIndex)}}
              <span class="kv-price__currency">€</span>
            </div>
            <div class="kv-services-price__person">pro Person</div>
            <div
                class="kv-services-price__btn"
                @click="selectPackage(pcg)"
                v-if="packageSelected.id !== pcg.id">Выбрать</div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import * as constants from "@/helpers/constants";
export default {
  name: "Step4",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      packageSelected: new constants.ServicePackage(),
      serviceSelected: []
    }
  },
  methods: {
    /**
     * Вкючена ли услуга по умолчанию в сервисный пакет
     *
     */
    isIncluded(serviceId, packageIndex) {
      return this.data.servicePackages[packageIndex].includedServices.indexOf(serviceId) >= 0
    },
    /**
     * Возращает цену сервис-пакета
     * @param {Number} packageIndex - порядковый номер пакета
     * @return {Decimal}
     */
    getPackagePrice(packageIndex) {
      if (packageIndex >= 0) {
        return this.data.servicePackages[packageIndex].price
      }
    },
    /**
     * Выбрать сервисный пакет
     * @param {Object} pcg - выбранный пакет
     */
    selectPackage(pcg) {
      this.packageSelected = pcg;
      this.$emit('changePackage',pcg);
      this.$emit('calculate');
    },
    /**
     * Выбрать услугу в  пакете
     * @param {Object} item
     */
    suppServiceChange() {
      const suppServices = this.data.suppServices.filter(_ => {
        return this.serviceSelected.indexOf(_.id) !== -1
      });

      this.$emit('changeSuppService',suppServices);
      this.$emit('calculate');
    }
  },
  computed: {
    selectedTabIndex() {
      let selectedTab = 1;
      if (this.packageSelected.id === null) {
        return 1
      }
      if (this.data.servicePackages !== null && this.data.servicePackages.length) {
        selectedTab = this.data.servicePackages.findIndex(item => item.id === this.packageSelected.id) + 1
      }
      return selectedTab
    },
    tabClasses() {
      if (this.data.servicePackages === null || !this.data.servicePackages.length) {
        return {
        }
      }

      let isLeft = false;
      let isRight = false;
      let isCenter = false;
      let tabsHalfIndex;

      const tabCount = this.data.servicePackages.length;
      const selectedTabIndex = this.selectedTabIndex;
      const isTabsEven = tabCount % 2 === 0;

      console.log('табы')
      console.log(selectedTabIndex)
      console.log(tabCount)
      // Четное кол-во табов
      if (isTabsEven) {
        let tabsHalfIndex = tabCount / 2;

        if (selectedTabIndex < tabsHalfIndex) {
          isLeft = true
        } else {
          isRight = true;
        }
      } else {
      // Нечетное кол-во табов
        let tabsHalfIndex = (tabCount / 2) + 0.5;
        if (selectedTabIndex < tabsHalfIndex) {
          isLeft = true
        }
        if (selectedTabIndex > tabsHalfIndex) {
          isRight = true;
        }
        if (selectedTabIndex === tabsHalfIndex) {
          isCenter = true;
        }
      }

      return {
        'kv-tabs-tail_left': isLeft,
        'kv-tabs-tail_right': isRight,
        'kv-tabs-tail_center': isCenter
      }
    },
    //Длинна стрелки под табами
    tabTailLength() {
      if (this.data.servicePackages === null || !this.data.servicePackages.length) {
        return 0
      }

      const tabCount = this.data.servicePackages.length;
      const selectedTabIndex = this.selectedTabIndex;
      const isTabsEven = tabCount % 2 === 0;
      let tabsHalfIndex;
      let offset;
      const tabWidth = 100 / tabCount;

      if (isTabsEven) {
        tabsHalfIndex = tabCount / 2;
        offset =  Math.abs(selectedTabIndex - tabsHalfIndex);
        return tabWidth * (0.5 + offset)
      } else {
        tabsHalfIndex = (tabCount / 2) + 0.5;
        offset =  Math.abs(selectedTabIndex - tabsHalfIndex);
        return tabWidth * offset
      }
    }
  },
  mounted(){
    // Выбор первого возможного сервис-пакета, если он еще не выбран
    if (this.data.servicePackages !== null && this.data.servicePackages.length && this.packageSelected.id === null) {
      this.selectPackage(this.data.servicePackages[0])
    }

  }
}
</script>

<style scoped>

</style>
