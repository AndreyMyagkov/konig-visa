<template>
  <div  class="kv-content__body">

    <div class="kv-calc-block" v-if="serviceDetails.id">
      <!-- Staying-->
      <div class="kv-staying">

        <!-- text -->
        <div class="kv-staying__text">
          <span class="kv-user-text" v-html="serviceDetails.durationsInfo"></span>
        </div>
        <!-- /text -->

        <!-- Duration list -->
        <div class="kv-staying__list">

          <!-- item -->
          <div class="kv-staying__item" v-for="(item) in serviceDetails.durations" :key="item.name">
            <div class="kv-staying-chb" :class="{'kv-staying-chb__active' : item.name === setup.duration.name}"  @click="selectDurations(item)">
              <div class="kv-staying-chb__text" v-html="item.nameHTML"></div>
              <div class="kv-staying-chb__info" @click.stop="$emit('showModal', item.description, item.name)">
                <svg class="kv-staying-chb__info-icon"><use href="#kv-icons_info"></use></svg>
              </div>
            </div>
          </div>
          <!-- /item -->

        </div>
        <!-- /Staying list -->

        <div class="kv-staying__info" v-if="setup.duration.description">
          <svg class="kv-staying__info-icon"><use href="#kv-icons_info"></use></svg>

          <div class="kv-staying__text" v-html="setup.duration.description"></div>
        </div>

      </div>
      <!-- /Staying-->

      <!-- Processing-->
      <div class="kv-processing" v-if="setup.duration.index !== null">
        <p class="kv-processing__caption">

        <!--
          <div class="kv-processing__btn">

            <div class="kv-btn-info"
                 @click="$emit(
                     'showModal',
                      'Тут перевода нет <b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.<p><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.</p> <br><br><br><br><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book. <b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.<p><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.</p> <br><br><br><br><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book. <b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.<p><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.</p> <br><br><br><br><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book. <b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.<p><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.</p> <br><br><br><br><b>СРОК ОБРАБОТКИ</b> статический текст is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy  it to make a type specimen book.',
                       $lng('step2.modalInfoHeader'))">
              <svg><use href="#kv-icons_ask"></use></svg>{{ $lng('step2.btnInfo') }}
            </div>

          </div>
          -->

          <div class="kv-processing__text kv-user-text" v-html="$lng('step2.processingText')">

        </div>


        <!-- selects -->
        <div class="kv-processing__row">
          <div class="kv-processing__item">
            <div class="kv-processing__label">{{ $lng('step2.nationalitiesLabel') }}</div>

            <div class="kv-processing__select kv-select">
              <div class="kv-select__badge">
                <svg class="kv-select__icon"><use href="#kv-icons_home"></use></svg>
              </div>
              <div class="kv-select__input">
                <v-select
                    :options="nationalities"
                    label="name"
                    :placeholder="$lng('step2.nationalitiesPlaceholder')"
                    v-model="nationalitiesModel"
                    :clearable="false"
                />
              </div>
            </div>

          </div>

          <!-- Место жительства -->
          <div class="kv-processing__item">
            <template  v-if="serviceDetails.servedResidenceRegions !== null">
              <div class="kv-processing__label">{{ $lng('step2.residenceRegionsLabel') }}</div>

              <div class="kv-processing__select kv-select">
                <div class="kv-select__badge">
                  <svg class="kv-select__icon"><use href="#kv-icons_pin"></use></svg>
                </div>
                <div class="kv-select__input">
                  <v-select
                      :options="serviceDetails.servedResidenceRegions"
                      label="name"
                      :placeholder="$lng('step2.residenceRegionsPlaceholder')"
                      v-model="residenceRegionsModel"
                      :clearable="false"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- /selects -->

      </div >
      <!-- /Processing-->

      <!-- Processing days-->
      <div class="kv-processing-days kv-processing-days_slide"  v-if="setup.duration.name && prices.state === 0">
        <div class="kv-processing-days__inner kv-processing-days__inner-showed-action-label-">
          <!-- day -->
          <div class="kv-processing-days__item" v-for="(item, i) in prepareProductsPricesArr" :key="i">
            <div class="kv-processing-day" :class="{
              'kv-processing-day_active': isActiveCurrentPriceBlock(i),
              'kv-processing-day_disabled': !isDisabledCurrentPrice(i),
              'kv-processing-day_blocked': isBlockedCurrentPrice(i)
            }">

              <div class="kv-processing-day__header">
                <div class="kv-processing-day__title">{{ $lng('step2.processingDuration') }}</div>
                <div class="kv-processing-day__nuber">{{item.info.quantity}}</div>
                <div class="kv-processing-day__subtitle">{{ $lng('step2.dimension')[item.info.dimension] }}</div>
              </div>

              <div class="kv-processing-day__body">

                <!-- item -->
                <div class="kv-processing-day__item" v-for="(price, j) in item.prices" :key="`price-${j}`">

                  <div class="kv-processing-day-chb" @click="setPrice({price: price, info: item.info})">
                    <input type="radio"
                           name="kv-processing-day-chb"
                           aria-label="checkbox"
                           :checked="price.id === setup.price.price.id"
                           :disabled="price.price === null"
                    >
                    <span class="kv-processing-day-chb__inner">
                      <span class="kv-processing-day-chb__box">
                        <svg><use href="#kv-icons_radio"></use></svg>
                      </span>
                      <span class="kv-processing-day-chb__caption">
                        <span class="kv-processing-day-chb__text">{{price.m}}-{{ $lng('step2.multiplicity') }}</span>
                        <span class="kv-processing-day-chb__title">
                          <template  v-if="price.price !== null">{{formatter.priceFormat(price.price)}}</template>
                          <!-- &minus -->
                          <template v-else><span v-html="constants.dashSymbol"></span> </template>
                          <span> €</span>
                        </span>
                      </span>
                    </span>
                  </div>

                </div>
                <!-- /item -->

                <a class="kv-processing-day__action-label" href="#">{{ $lng('step2.order') }}</a>

                <div
                    class="kv-processing-day__text kv-user-text"
                    v-html="prices.stateDescription"
                    v-if="!isDisabledCurrentPrice(i)">
                </div>


              </div>

            </div>
          </div>
          <!-- day -->
        </div>
      </div>
      <!-- /Processing days-->

      <div class="kv-alert kv-alert_center"
           v-if="prices.state !== 0 && setup.duration.index !== null"
           v-html="prices.stateDescription"
      >
      </div>


      <!-- Calc bloc info-->
      <div class="kv-calc-block__info"  v-if="setup.duration.name  && prices.state === 0">

        <div class="kv-calc-info">

          <div class="kv-calc-info__icon">
            <svg><use href="#kv-icons_surface"></use></svg>
          </div>

          <div class="kv-calc-info__text kv-user-text" v-html="$lng('step2.included')"></div>

        </div>
      </div>
      <!-- /Calc bloc info-->
    </div>


  </div>
</template>

<script>
import vSelect from "vue-select";
import * as constants from "@/helpers/constants";
import * as formatter from "@/helpers/format";


export default {
  name: "Step2",
  components: {
    vSelect
  },
  props: {
    serviceDetails: {
      type: Object,
      required: true
    },
    nationalities: {
      type: Array,
      required: true
    },
    prices: {
      type: Object,
      required: true
    },
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      constants,
      formatter,
      // Выбранная продолжительность
      //selectedDuration: Object.assign({}, this.setup.duration),
      //selectedDuration: this.setup.duration,
      //selectedPriceId: this.setup.price.price.id, // null
    }
  },
  methods: {
    /**
     * Сбрасывает цену
     */
    /*
    resetPrice() {
      this.selectedPriceId = null;
      this.$emit('update:price', new constants.PriceDefault())
    },
*/
    /**
     * Устанавливает цену
     * @param data
     */
    setPrice(data) {
      // Если цены нет
      if (data.price.price === null) {
        return
      }
      //this.selectedPriceId = data.price.id;
      this.$emit('update:price', data)
    },

    /**
     * Выбрать длительность пребывания
     * @param item - объект выбранной продолжительности
     */
    selectDurations(item) {
      //this.resetPrice();
      this.$emit('update:duration', item);
    },


    /**
     * Текщий блок процесса активный?
     * @param {integer} index - индекс блока процесса
     */
    isActiveCurrentPriceBlock(index) {
      if (!this.setup.price.price.id) {
        return false
      }
      const prices = this.prepareProductsPricesArr[index].prices;
      return prices.findIndex(_ => {
        return _.id === this.setup.price.price.id
      }) >= 0;
    },

    /**
     * Текущий блок цен доступен для выбора по сроку обработки
     */
    isDisabledCurrentPrice(index) {
      const pricesBlock = this.prepareProductsPricesArr[index];
      return !(this.prices.minProcessDuration > 0 &&
              pricesBlock.info.hours < this.prices.minProcessDuration
              )
    },

    /**
     * Текущий блок цен заблокирован для выбора по текущей цене = null
     */
    isBlockedCurrentPrice(index) {
      if (this.setup.price.price.id === null) {
        return false
      }

      const pricesBlock = this.prepareProductsPricesArr[index];
      const blockedIndex =  pricesBlock.prices.findIndex(item => {
        if (item.id === this.setup.price.price.id && item.price == null) {
          return true
        }
      })
      return blockedIndex >= 0

    },

    /**
     *  Возращает Цену по id продукта
     *  TODO: подгрузить цену
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


  },
  computed: {
    priceModel: {
      get() {
        return this.setup.price.price.id
      },
      set (value) {

        //this.setPrice({"info":{"dimension":"d","duration":"Werktage","hours":120,"quantity":5},"price":{"id":"bb39fd21-0180-0002-005d-660d98f98164","m":"2","price":285}});

      },
    },

    // v-model для селекта национальности
    nationalitiesModel: {
      get () {
        return this.nationalities.find(item => item.codeA2 === this.setup.nationality)
      },
      set (value) {
        //this.resetPrice();
        this.$emit('update:nationality', value.codeA2);
       // this.$emit('load:prices');
      },
    },

    residenceRegionsModel: {
      get () {
        return this.serviceDetails.servedResidenceRegions ? this.serviceDetails.servedResidenceRegions.find(item => item.code === this.setup.residenceRegions) : []
      },
      set (value) {
        //this.resetPrice();
        this.$emit('update:residenceRegions', value.code)
      },
    },

    /**
     * Возвращает кол-во кратностей выбранной продолжительности
     */
    selectedDurationsMultipliciesLength() {
      if (this.setup.duration.index === null) {
        return 0
      }
      return this.setup.duration.multiplicities.length
    },

    /**
     * Возращает массив id цен для выбранных параметров
     */
    processesArr() {
      return this.serviceDetails.products[this.setup.duration.index] || []
    },

    /**
     * Возращает готовый массив процессов с ценами
     */
    prepareProductsPricesArr() {
      const tmpArr = [];
      // Цикл по кратности
      for (let d = 0; d < this.serviceDetails.processDurations.length; d++) {

        const tmpArr2 = [];
        // Цикл по длительности обработки
        for (let m = 0; m < this.selectedDurationsMultipliciesLength; m++) {
          const product = this.processesArr[m][d];
          tmpArr2.push(
              {
                id: product,
                price: this.getPriceByProductId(product),
                m: this.setup.duration.multiplicities[m]
              }
          )
        }
        //FIXME:
        tmpArr.push({
              info: {
                ...this.serviceDetails.processDurations[d],
                //duration: this.constants.processDurationsToWords(this.serviceDetails.processDurations[d].dimension)
                //duration: this.$lng("step2.dimension." + this.serviceDetails.processDurations[d].dimension)
                //duration: this.$lng("step2.dimension." + this.serviceDetails.processDurations[d].dimension)
              },
              prices: tmpArr2
            }
        )
      }

      return tmpArr.reverse();
    },

  },
  mounted() {

    this.$emit('active')
  }

}
</script>

<style scoped>
/*
FIXME: не надо, удалить 28 апр
.kv-app .kv-processing-day.kv-processing-day_disabled.kv-processing-day_active .kv-processing-day__body {
  border: 3px solid var(--c-disabled_dark);
}

.kv-app .kv-staying .kv-staying__list {
  flex-wrap: nowrap;
  overflow: auto;
}
*/

/*
FIXME: отдал в верстку, удалить
.kv-app .kv-processing-day-chb input[disabled]:checked ~ .kv-processing-day-chb__inner {
  background-color: hsl(0deg 0% 0% / 10%);
}
*/

</style>
