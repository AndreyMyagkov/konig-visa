<template>
  <div  class="kv-content__body">

    <div class="kv-calc-block" v-if="serviceDetails.id">
      <!-- Staying-->
      <div class="kv-staying">

        <!-- text -->
        <div class="kv-staying__text">
          <div class="kv-user-text"><b>{{$lng('step2.modalDefaultInfo')}}</b> <span v-html="serviceDetails.durationsInfo"></span></div>
        </div>
        <!-- /text -->




        <hooper
            :settings="hooperDurations"
            class=" kv-staying__list-">

            <!-- item -->
            <slide class="story-carousel__slide" v-for="(item, index) in serviceDetails.durations" :key="item.name" :index="index">
              <div class="kv-staying__item">
                <div class="kv-staying-chb"
                     :class="{
                        'kv-staying-chb__active' : item.name === setup.duration.name,
                        'kv-form__item_error': error.duration
                     }"
                     @click="selectDurations(item)"
                >
                  <div class="kv-staying-chb__text" v-html="item.nameHTML"></div>
                  <div class="kv-staying-chb__info"
                       @click.stop="$emit('showModal', item.description, item.name)"
                        v-if="item.description"
                  >
                    <svg class="kv-staying-chb__info-icon"><use href="#kv-icons_info"></use></svg>
                  </div>
                </div>
              </div>
            </slide>
            <!-- /item -->

          <hooper-navigation slot="hooper-addons"></hooper-navigation>
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>

        <!-- Duration list -->
        <!--
        <div class="kv-staying__list">

           item
          <div class="kv-staying__item" v-for="(item) in serviceDetails.durations" :key="item.name">
            <div class="kv-staying-chb" :class="{'kv-staying-chb__active' : item.name === setup.duration.name}"  @click="selectDurations(item)">
              <div class="kv-staying-chb__text" v-html="item.nameHTML"></div>
              <div class="kv-staying-chb__info" @click.stop="$emit('showModal', item.description, item.name)">
                <svg class="kv-staying-chb__info-icon"><use href="#kv-icons_info"></use></svg>
              </div>
            </div>
          </div>
           /item

        </div>
      -->
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
            <div class="kv-processing__item-wr">
            <div class="kv-processing__label">{{ $lng('step2.nationalitiesLabel') }}</div>

            <div class="kv-processing__select kv-select">
              <div class="kv-select__badge">
                <svg class="kv-select__icon"><use href="#kv-icons_home"></use></svg>
              </div>
              <div class="kv-select__input  kv-select_hide-arrow">
                <v-select
                    :options="nationalities"
                    label="name"
                    :placeholder="$lng('step2.nationalitiesPlaceholder')"
                    v-model="nationalitiesModel"
                    :clearable="false"
                />
                <svg class="kv-form__sel-arrow"><use href="#kv-icons_select"></use></svg>
              </div>
            </div>
            </div>
          </div>

          <!-- Место жительства -->
          <div class="kv-processing__item" id="kv-residence-regions">
            <template  v-if="serviceDetails.servedResidenceRegions !== null">
              <div class="kv-processing__label">{{ $lng('step2.residenceRegionsLabel') }}</div>

              <div class="kv-processing__select kv-select">
                <div class="kv-select__badge">
                  <svg class="kv-select__icon"><use href="#kv-icons_pin"></use></svg>
                </div>
                <div class="kv-select__input kv-select_hide-arrow">
                  <v-select
                      :options="serviceDetails.servedResidenceRegions"
                      label="name"
                      :placeholder="$lng('step2.residenceRegionsPlaceholder')"
                      v-model="residenceRegionsModel"
                      :clearable="false"
                  />
                  <svg class="kv-form__sel-arrow"><use href="#kv-icons_select"></use></svg>
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- /selects -->

      </div >
      <!-- /Processing-->

      <!-- Processing days-->
      <div
          class="kv-processing-days kv-processing-days_slide-"
          v-if="setup.duration.name && prices.state === 0">
        <hooper
            :settings="hooperPrice"
            trimWhiteSpace
            class="kv-processing-days__inner-"
            :class="{
              'kv-processing-days__inner-showed-action-label': setup.redirectUrl && setup.mode === 'price' && setup.price.price.id
          }">

          <!-- day -->
          <slide
               v-for="(item, i) in prepareProductsPricesArr"
               :key="i"
               :index="i"
          >
            <div class="kv-processing-days__item">
              <div class="kv-processing-day" :class="{
                'kv-processing-day_active': isActiveCurrentPriceBlock(i),
                'kv-processing-day_disabled': !isDisabledCurrentPrice(i),
                'kv-processing-day_blocked': isBlockedCurrentPrice(i),
                'kv-processing-day_error': error.price
              }">

                <div class="kv-processing-day__header">
                  <div class="kv-processing-day__title">{{ $lng('step2.processingDuration') }}</div>
                  <div class="kv-processing-day__nuber">{{item.info.quantity}}</div>
                  <div class="kv-processing-day__subtitle">{{ $lng('step2.dimension')[item.info.dimension] }}</div>
                </div>

                <div class="kv-processing-day__body">

                  <!-- item -->
                  <div class="kv-processing-day__item" v-for="(price, j) in item.prices" :key="`price-${j}`">

                    <div class="kv-processing-day-chb" @click="setPrice({price: price, info: item.info, index: i})">
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
                          <span class="kv-processing-day-chb__text">
                            <template v-if="price.m !== 'm'">{{price.m}}-{{ $lng('step2.multiplicity') }}</template>
                            <template v-else>{{ $lng('step2.multiplicities') }}</template>
                          </span>
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

                  <a
                      class="kv-processing-day__action-label"
                      :href="`${setup.redirectUrl}?product=${setup.price.price.id}`"
                      v-if="isActiveCurrentPriceBlock(i)"
                  >
                    {{ $lng('step2.order') }}
                  </a>

                  <div
                      class="kv-processing-day__text kv-user-text"
                      v-html="prices.stateDescription"
                      v-if="!isDisabledCurrentPrice(i)">
                  </div>


                </div>

              </div>
            </div>
          </slide>
          <!-- day -->
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>
      </div>
      <!-- /Processing days-->

      <div class="kv-alert kv-alert_center"
           v-if="prices.state !== 0 && setup.duration.index !== null"
           v-html="prices.stateDescription"
      >
      </div>


      <!-- Calc block info-->
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


import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination
//} from 'hooper';
} from '@/components/ui/hooper/hooper.esm.js';
//import 'hooper/dist/hooper.css';
import '@/components/ui/hooper/hooper.css';


export default {
  name: "Step2",
  components: {
    vSelect,
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination
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
      hooperDurations: {
        initialSlide: this.setup.duration.index === null ? 0 : this.setup.duration.index,
        itemsToShow: 1,
        trimWhiteSpace:true,
        wheelControl: false,
        breakpoints: {
          500: {itemsToShow: 2},
          600: {itemsToShow: 3},
          800: {itemsToShow: 4},
          1000: {itemsToShow: 6}
        }
      },
      hooperPrice: {
        initialSlide: this.setup.price.index === null ? 0 : this.setup.price.index,
        itemsToShow: 1,
        trimWhiteSpace:true,
        wheelControl: false,
        breakpoints: {
          500: {itemsToShow: 1, trimWhiteSpace:true},
          600: {itemsToShow: 2, trimWhiteSpace:true},
          900: {itemsToShow: 3, trimWhiteSpace:true},
          1100: {itemsToShow: 4, trimWhiteSpace:true}
        }
      },
      // Флаги ошибок
      error: {
        duration: false,
        price: false
      }
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
      this.error.price = false;
      this.$emit('update:price', data);
    },

    /**
     * Выбрать длительность пребывания
     * @param item - объект выбранной продолжительности
     */
    selectDurations(item) {
      //this.resetPrice();
      this.error.duration = false;
      this.$emit('update:duration', item);
    },


    /**
     * Текущий блок процесса активный?
     * @param {Number} index - индекс блока процесса
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
     *  Возвращает Цену по id продукта
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

    /**
     * Проверка шага на заполненность срока пребывания и цены
     */
    checkForm() {
      this.error.duration = this.setup.duration.index === null;
      this.error.price = this.setup.price.index === null && this.setup.duration.index !== null;
    },

    /**
     * Возвращает id единственно возможной цены для выбора, либо false, если доступно несколько вариантов цен
     */
    isSinglePrice() {
      let priceCount = 0;
      let id = null;
      let priceObject = {
        info: {},
        price: {},
        index: null
      };

      for(let i = 0; i < this.prepareProductsPricesArr.length; i++) {
        // Не проверяем блоки цен недоступные по сроку обработки
        if (this.prepareProductsPricesArr[i].info.hours < this.prices.minProcessDuration) {
          continue
        }
        // Считаем кол-во доступных цен и id первой
        this.prepareProductsPricesArr[i].prices.forEach((prices, idx) => {
          if (prices.price) {
            priceCount++;
            if (!id) {
              id = prices.id
              priceObject = {
                price: this.prepareProductsPricesArr[i].prices[idx],
                info: this.prepareProductsPricesArr[i].info,
                index: i
              }
            }
          }
        });

        // Если нашли больше одной - это не наш случай
        if (priceCount > 1) {
          break
        }
      }
      if (priceCount === 1) {
        console.log(priceObject)
        this.setPrice(priceObject);
      }
      return (priceCount === 1) ? id : false
    }


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
     * Возвращает массив id цен для выбранных параметров
     */
    processesArr() {
      return this.serviceDetails.products[this.setup.duration.index] || []
    },

    /**
     * Возвращает готовый массив процессов с ценами
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

<style>
.hooper {
  height: auto;
}
.hooper:not(.is-empty) {
  margin: 0 auto;
  max-width: calc(100% - 90px);
}
.hooper-slide {
  height: auto;
}
.kv-app .kv-processing-days__item {
  height: 100%;
}

.hooper-prev {
  left: -45px;
}
.hooper-next {
  right: -45px;
}
.is-empty .hooper-navigation {
  display: none;
}

.is-empty .hooper-pagination {
  display: none;
}

.hooper-next.is-disabled,
.hooper-prev.is-disabled {
  opacity: 1;
}
.hooper-navigation .hooper-next svg,
.hooper-navigation .hooper-prev svg{
  fill: var(--c-second);
}
.hooper-navigation .hooper-next *,
.hooper-navigation .hooper-prev * {
  cursor: pointer ;
}

.hooper-next.is-disabled svg,
.hooper-prev.is-disabled svg {
  opacity: .6;
}

.hooper-next.is-disabled *,
.hooper-prev.is-disabled * {
  cursor: not-allowed;
}


.hooper-indicators li {
  list-style-type: none;
}
.kv-staying .hooper-indicator {
  background-color: var(--c-second);
  cursor: pointer;
}

.kv-staying .hooper-indicator:hover,
.kv-staying .hooper-indicator.is-active {
  background-color: var(--c-prim);
}

.kv-staying .hooper-pagination {
  bottom: -12px;
}

/* поправить в исходнике на */
.kv-app .kv-processing-days__item {
  flex: 1 0 auto;
  padding: 0 5px;
}

.kv-app .kv-processing-days__item:first-child:last-child {
  max-width: 100%;
}
.kv-app .kv-processing-days__inner {

}
/* /поправить в исходнике на */

/* hooper process */
.kv-processing-days .hooper-indicator {
  background-color: var(--c-second);
  cursor: pointer;
}

.kv-processing-days .hooper-indicator:hover,
.kv-processing-days .hooper-indicator.is-active {
  background-color: var(--c-prim);
}

.kv-processing-days .hooper-pagination {
  bottom: -25px;
}
.kv-processing-days .hooper-navigation .hooper-prev,
.kv-processing-days .hooper-navigation .hooper-next {
  height: 100%;
  padding: 0;
  background: whitesmoke;
  border-radius: 6px;
  width: 35px;
  text-align: center;
}
/* /hooper process */


.kv-app .kv-staying-chb {
  width: 100%;
  justify-content: space-between;
}

.kv-app[cq-max-w-991] .hooper {
  max-width: 100%;
  margin-bottom: 30px;
}
.kv-app[cq-max-w-991] .hooper-navigation {
  display: none;
}
/*
.kv-app[cq-min-w-991] .hooper-pagination {
  display: none;
}
*/

.kv-app .hooper-pagination {
  display: none;
}
.kv-app[cq-max-w-991] .hooper-pagination {
  display: block
}


.vs-carousel {
  position: relative;
}

.vs-carousel__wrapper {
  display: flex;
   overflow-x: scroll;
  /* overflow-y: hidden;
   scroll-snap-type: x mandatory;
   scroll-behavior: smooth;
   scrollbar-width: none;
   -webkit-overflow-scrolling: touch;
   -ms-overflow-style: none;*/
  list-style: none;
  margin: 0;
  padding: 0;
}

.vs-carousel__wrapper::-webkit-scrollbar {
  display: none;
}

.vs-carousel__slide {
  flex: 0 0 100%;
  height: 100%;
  /*scroll-snap-align: start;*/
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}

.vs-carousel__arrows {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 48px;
  height: 48px;
  padding: 0;
  cursor: pointer;
}

.vs-carousel__arrows:disabled {
  cursor: not-allowed;
}

.vs-carousel__arrows--left {
  left: 0;
}

.vs-carousel__arrows--right {
  right: 0;
}



.vs-carousel__arrows--left {
  left: 0;
}
.vs-carousel__arrows--right {
  right: 0;
}

.kv-app .vs-carousel__wrapper {
  max-width: calc(100% - 100px);
  margin: 0 auto;
}
.kv-app[cq-max-w-991] .vs-carousel__wrapper {
  max-width: 100%;
}
.kv-app[cq-max-w-991] .vs-carousel__arrows {
  display: none;
}

.kv-app .vs-carousel__arrows {
  padding: 8px 12px;
  border-radius: 6px;
  height: 40px;
  background-color: var(--c-success);
  color:#fff;
}
.kv-app .vs-carousel__arrows[disabled] {
  background-color: var(--c-disabled);
  color:#fff;
}
.story-carousel--non-regular .vs-carousel__slide {
  flex: 0 0 auto;
}
.story-carousel--multiple .story-carousel__slide{flex:0 0 100%}
@media(min-width: 500px){
  .story-carousel--multiple .story-carousel__slide{flex:0 0 50%}
}
@media(min-width: 768px){
  .story-carousel--multiple .story-carousel__slide{flex:0 0 33.33%}
}
@media(min-width: 1024px){
  .story-carousel--multiple .story-carousel__slide{flex:0 0 25%}
}
@media(min-width: 1280px) {
  .story-carousel--multiple .story-carousel__slide{
    flex:0 0 20%;
    height: 200px;
  }
}
</style>
