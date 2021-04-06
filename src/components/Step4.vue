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
                'kv-class-tab_active': packageSelected === tab.id
              }">
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


        <div class="kv-tabs-tail kv-tabs-tail_center kv-class-tabs__tail">
          <!-- Tabs tail-->
          <div class="kv-tabs-tail__inner"
               style="--kv-tabs-tail-width: calc(33% + 7px); --kv-tabs-tail-offset: 50%">
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
              class="kv-class__item kv-class__item_add"
              :class="{
                'kv-class__item_active': packageSelected === pcg.id
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
                'kv-services-price_active':  packageSelected === pcg.id
              }"
              v-for="(pcg, packageIndex) in data.servicePackages" :key="packageIndex"
          >
            <div class="kv-price kv-price_second kv-services-price__price">
              <template v-if="packageSelected !== pcg.id">+</template> 30
              <span class="kv-price__currency">€</span>
            </div>
            <div class="kv-services-price__person">pro Person</div>
            <div
                class="kv-services-price__btn"
                @click="packageSelected = pcg.id"
                v-if="packageSelected !== pcg.id">Выбрать</div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
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
      packageSelected: null,
      serviceSelected: ['11fe6093-69cc-4bea-aaf6-e2e128eccb5c']
    }
  },
  methods: {
    isIncluded(serviceId, packageIndex) {
      console.log('включен?')
      console.log(serviceId);
      console.log(packageIndex)
      return this.data.servicePackages[packageIndex].includedServices.indexOf(serviceId) >= 0
    }
  }
}
</script>

<style scoped>

</style>
