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

        <!-- Staying list -->
        <div class="kv-staying__list">

          <!-- item -->
          <div class="kv-staying__item" v-for="(item, index) in serviceDetails.durations" :key="item.name" @click="selectDurations(item, index)">
            <div class="kv-staying-chb" :class="{'kv-staying-chb__active' : item.name === selectedDuration.name}">
              <div class="kv-staying-chb__text" v-html="item.nameHTML"></div>
              <div class="kv-staying-chb__info">
                <svg class="kv-staying-chb__info-icon"><use href="img/icons/icons.svg#info"></use></svg>
              </div>
            </div>
          </div>
          <!-- /item -->

        </div>
        <!-- /Staying list -->

        <div class="kv-staying__info" v-if="selectedDuration.description">
          <svg class="kv-staying__info-icon"><use href="img/icons/icons.svg#info"></use></svg>

          <div class="kv-staying__text" v-html="selectedDuration.description"></div>
        </div>

      </div>
      <!-- /Staying-->

      <!-- Processing-->
      <div class="kv-processing" v-if="selectedDuration.name">
        <div class="kv-processing__caption">

          <div class="kv-processing__btn">

            <div class="kv-btn-info"> <svg>
              <use href="img/icons/icons.svg#ask"></use>
            </svg>Инфо-кнопка </div>
          </div>

          <div class="kv-processing__text">

            <span class="kv-processing__text_bold">СРОК ОБРАБОТКИ</span> статический текст is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </div>

          <div class="kv-processing__text">Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.</div>
        </div>


        <!-- selects -->
        <div class="kv-processing__row">
          <div class="kv-processing__item">
            <div class="kv-processing__label">Гражданство:</div>

            <div class="kv-processing__select kv-select">
              <div class="kv-select__badge">
                <svg class="kv-select__icon"><use href="img/icons/icons.svg#home"></use></svg>
              </div>
              <select class="kv-select__input" v-model="nationalitiesModel" >
                <option value="null" label="Выберите"></option>
                <option :value="item.codeA2" v-for="item in nationalities" :key="item.codeA3">{{item.name}}</option>
              </select>
              <svg class="kv-selct__arrow"><use href="img/icons/icons.svg#arrow_down"></use></svg>
            </div>
          </div>

          <!-- Место жительства -->
          <div class="kv-processing__item" v-if="serviceDetails.servedResidenceRegions !== null">
            <div class="kv-processing__label">Место жительства:</div>
            <div class="kv-processing__select kv-select">

              <div class="kv-select__badge">
                <svg class="kv-select__icon"><use href="img/icons/icons.svg#pin"></use></svg>
              </div>
              <select class="kv-select__input" v-model="residenceRegionsModel">
                <option value="null" selected="selected" label="Выберите"></option>
                <option :value="item.code" v-for="item in serviceDetails.servedResidenceRegions" :key="item.code">{{item.name}}</option>
              </select>
              <svg class="kv-selct__arrow"><use href="img/icons/icons.svg#arrow_down"></use></svg>
            </div>
          </div>
        </div>
        <!-- /selects -->

      </div >
      <!-- /Processing-->

      <!-- Processing days-->
      <div class="kv-processing-days"  v-if="selectedDuration.name && prices.state === 0">

        <!-- day -->
        <div class="kv-processing-days__item" v-for="(item, i) in prepareProductsPricesArr" :key="i">
          <div class="kv-processing-day" :class="{
            'kv-processing-day__active': isActiveCurrentPriceBlock(i),
            'kv-processing-day__disabled': !isEnabledCurrentPriceBlock(i)
          }">

            <div class="kv-processing-day__header">
              <div class="kv-processing-day__title">Bearbeitungszeit</div>
              <div class="kv-processing-day__nuber">{{item.info.quantity}}</div>
              <div class="kv-processing-day__subtitle">{{item.info.duration}}</div>
            </div>

            <div class="kv-processing-day__body">

              <!-- item -->
              <div class="kv-processing-day__item" v-for="(price, j) in item.prices" :key="`price-${j}`">
                <label class="kv-processing-day-chb" @click="selectPrice(price)">
                  <input type="radio"
                         name="kv-processing-day-chb"
                         aria-label="checkbox"
                         :checked="price.id === selectedPriceId"
                         :disabled="price.price === null"
                  >
                  <span class="kv-processing-day-chb__inner">
                    <span class="kv-processing-day-chb__box">
                      <svg><use href="img/icons/icons.svg#radio"></use></svg>
                    </span>
                    <span class="kv-processing-day-chb__caption">
                      <span class="kv-processing-day-chb__text">{{price.m}}-malige Einreise</span>
                      <span class="kv-processing-day-chb__title">
                        <template  v-if="price.price !== null">{{price.price}}</template>
                        <template v-else>- </template>
                        <span> €</span>
                      </span>
                    </span>
                  </span>
                </label>

              </div>
              <!-- /item -->

              <div class="kv-processing-day__text kv-user-text" v-html="prices.stateDescription" v-if="!isEnabledCurrentPriceBlock(i)"></div>


            </div>

          </div>
        </div>
        <!-- day -->


      </div>
      <!-- /Processing days-->

      <div class="kv-alert"
           style="padding: 20px; margin: 20px 0; background-color: var(--c-prim_light)"
           v-if="prices.state !== 0 && selectedDurationIndex !== null"
           v-html="prices.stateDescription"
      >
      </div>


      <!-- Calc bloc info-->
      <div class="kv-calc-block__info"  v-if="selectedDuration.name">

        <div class="kv-calc-info">

          <div class="kv-calc-info__icon">
            <svg>
              <use href="img/icons/icons.svg#surface"></use>
            </svg>
          </div>

          <div class="kv-calc-info__text">В стоимость входит:
            <span class="kv-calc-info__text_bold"> консульский сбор, сервисный сбор, сбор за приглашение</span>
          </div>

        </div>
      </div>
      <!-- /Calc bloc info-->
    </div>


  </div>
</template>

<script>
export default {
  name: "Step2",
  props: {
    serviceDetails: {
      type: Object,
      required: true
    },
    nationalities: {
      type: Array,
      required: true
    },
    nationality: {
      type: String,
      required: true
    },
    residenceRegions: {
      type: String,
      required: true
    },
    prices: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // Выбранная продолжительность
      selectedDuration: {
        name: '',
        description: '',
        multiplicities: []
      },
      // Индекс выбранной продолжительности
      selectedDurationIndex: null,
      selectedPriceId: null,

      //selectedNationalities: null,
     // selectedResidenceRegions: ''
    }
  },
  methods: {
    /**
     * Выбрать длительность пребывания
     * @param item - объект выбранной продолжительности
     * @param index - индекс
     */
    selectDurations(item, index) {
      this.selectedDuration = item;
      this.selectedDurationIndex = index;


     // this.selectedPriceId = null;
      this.selectPrice(
  {
          id: null,
          m: '',
          price: ''
        }
      )
      //this.update();
      this.$emit('update:duration',
          {
            duration: this.selectedDuration.name,
            //nationalities: this.selectedNationalities,
            //residenceRegions: this.selectedResidenceRegions
          }
      );
      //this.$emit('load:prices');

    },

    /**
     * Выбрать id цены
     * @param id - id процесса
     */
    selectPrice(price) {
      this.selectedPriceId = price.id;
      this.$emit('update:price', price)
    },

    /**
     * Текщий блок активный?
     * @param {integer} index - индекс блока процесса
     */
    isActiveCurrentPriceBlock(index) {
      if (!this.selectedPriceId) {
        return false
      }
      const prices = this.prepareProductsPricesArr[index].prices;
      console.log('цены блока');
      console.log(prices);
      console.log('Выбранный процесс')
      console.log(this.selectedPriceId);
      return prices.findIndex(_ => {
        return _.id === this.selectedPriceId
      }) >= 0;
    },

    /**
     * Текущий блок цен доступен для выбора?
     */
    isEnabledCurrentPriceBlock(index) {
      const pricesBlock = this.prepareProductsPricesArr[index];
      console.log(pricesBlock);
      return !(this.prices.minProcessDuration > 0 && pricesBlock.info.hours < this.prices.minProcessDuration)
    },

    /**
     * Продолжительность обработки словами
     * @param {char} code - код продолжительности
     */
    processDurationsToWords(code) {
      return {
        h: "Stunden",
        d: "Werktage",
        m: "Monat"
      }[code]
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


/*
    update() {
      this.$emit('updateStep2Data',
          {
            duration: this.selectedDuration.name,
            //nationalities: this.selectedNationalities,
            //residenceRegions: this.selectedResidenceRegions
          }
      )
    }*/

  },
  computed: {

    // v-model для селекта национальности
    nationalitiesModel: {
      get () {
        return this.nationality
      },
      set (value) {
        this.$emit('update:nationality', value);
        this.$emit('load:prices');
      },
    },

    // v-model для селекта региона жительства
    residenceRegionsModel: {
      get () {
        return this.residenceRegions
      },
      set (value) {
        this.$emit('update:residenceRegions', value)
      },
    },

    /**
     * Возвращает кол-во кратностей выбранной продолжительности
     */
    selectedDurationsMultipliciesLength() {
      if (this.selectedDurationIndex === null) {
        return 0
      }
      return this.selectedDuration.multiplicities.length
    },

    /**
     * Возращает массив id цен для выбранных параметров
     */
    processesArr() {
      return this.serviceDetails.products[this.selectedDurationIndex] || []
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
                m: this.selectedDuration.multiplicities[m]
              }
          )
        }
        tmpArr.push({
              info: {
                ...this.serviceDetails.processDurations[d],
                duration: this.processDurationsToWords(this.serviceDetails.processDurations[d].dimension)
              },
              prices: tmpArr2
            }
        )
      }

      return tmpArr.reverse();
    },
/*
    durationDescription() {
      return this.serviceDetails.durations
    }//
    */

  },
  mounted() {

    this.$emit('active')
  }

}
</script>

<style scoped>

</style>
