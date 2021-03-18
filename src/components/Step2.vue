<template>
  <div  class="kv-content__body">

    <div class="kv-calc-block" v-if="serviceDetails.id">
      <!-- Staying-->
      <div class="kv-staying">

        <!-- text -->
        <div class="kv-staying__text">
          <span class="kv-staying__text_bold">СРОК ПРЕБЫВАНИЯ</span> <span v-html="serviceDetails.durationsInfo"></span>
        </div>
        <!-- /text -->

        <!-- Staying list -->
        <div class="kv-staying__list">

          <!-- item -->
          <div class="kv-staying__item" v-for="item in serviceDetails.durations" :key="item.name" @click="selectDurations(item)">
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
              <select class="kv-select__input" v-model="nationalitiesModel" @change="update">
                <option value="null" label="Выберите"></option>
                <option :value="item.codeA3" v-for="item in nationalities" :key="item.codeA3">{{item.name}}</option>
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
              <select class="kv-select__input" v-model="residenceRegionsModel" @change="update">
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
      <div class="kv-processing-days"  v-if="selectedDuration.name">

         <!-- day -->
        <div class="kv-processing-days__item" v-for="item in serviceDetails.processDurations" :key="item.hours">
          <div class="kv-processing-day">

            <div class="kv-processing-day__header">
              <div class="kv-processing-day__title">Bearbeitungszeit</div>
              <div class="kv-processing-day__nuber">{{item.quantity}}{{item.dimension}}</div>
              <div class="kv-processing-day__subtitle">Werktage</div>
            </div>

            <div class="kv-processing-day__body">

              <!-- item -->
              <div class="kv-processing-day__item">
                <label class="kv-processing-day-chb">
                  <input type="radio" name="kv-processing-day-chb" aria-label="checkbox">
                  <span class="kv-processing-day-chb__inner">
                    <span class="kv-processing-day-chb__box">
                      <svg><use href="img/icons/icons.svg#radio"></use></svg>
                    </span>
                    <span class="kv-processing-day-chb__caption">
                      <span class="kv-processing-day-chb__text">1-malige Einreise</span>
                      <span class="kv-processing-day-chb__title">135 <span>€</span></span>
                    </span>
                  </span>
                </label>
              </div>
              <!-- /item -->

              <!-- item -->
              <div class="kv-processing-day__item">
                <label class="kv-processing-day-chb">
                  <input type="radio" name="kv-processing-day-chb" aria-label="checkbox">
                  <span class="kv-processing-day-chb__inner">
                    <span class="kv-processing-day-chb__box">
                      <svg><use href="img/icons/icons.svg#radio"></use></svg>
                    </span>
                    <span class="kv-processing-day-chb__caption">
                      <span class="kv-processing-day-chb__text">1-malige Einreise</span>
                      <span class="kv-processing-day-chb__title">135 <span>€</span></span>
                    </span>
                  </span>
                </label>
              </div>
              <!-- /item -->

              <!-- item -->
              <div class="kv-processing-day__item">
                <label class="kv-processing-day-chb">
                  <input type="radio" name="kv-processing-day-chb" aria-label="checkbox">
                  <span class="kv-processing-day-chb__inner">
                    <span class="kv-processing-day-chb__box">
                      <svg><use href="img/icons/icons.svg#radio"></use></svg>
                    </span>
                    <span class="kv-processing-day-chb__caption">
                      <span class="kv-processing-day-chb__text">1-malige Einreise</span>
                      <span class="kv-processing-day-chb__title">135 <span>€</span></span>
                    </span>
                  </span>
                </label>
              </div>
              <!-- /item -->

              <!-- item -->
              <div class="kv-processing-day__item">
                <label class="kv-processing-day-chb">
                  <input type="radio" name="kv-processing-day-chb" aria-label="checkbox">
                  <span class="kv-processing-day-chb__inner">
                    <span class="kv-processing-day-chb__box">
                      <svg><use href="img/icons/icons.svg#radio"></use></svg>
                    </span>
                    <span class="kv-processing-day-chb__caption">
                      <span class="kv-processing-day-chb__text">1-malige Einreise</span>
                      <span class="kv-processing-day-chb__title">135 <span>€</span></span>
                    </span>
                  </span>
                </label>
              </div>
              <!-- /item -->
            </div>

          </div>
        </div>
        <!-- day -->


      </div>
      <!-- /Processing days-->

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
    }
  },
  data() {
    return {
      // Выбранная продолжительность
      selectedDuration: {
        name: '',
        description: ''
      },

      //selectedNationalities: null,
      //selectedResidenceRegions: null
    }
  },
  methods: {
    /**
     * Выбрать длительность пребывания
     * @param item
     */
    selectDurations(item) {
      this.selectedDuration = item;
      this.update();
    },

    update() {
      this.$emit('updateStep2Data',
          {
            duration: this.selectedDuration.name,
            nationalities: this.nationalitiesModel, //selectedNationalities,
            residenceRegions: this.residenceRegionsModel //selectedResidenceRegions
          }
      )
    }
  },
  computed: {

    nationalitiesModel: {
      get () {
        return this.nationality
      },
      set (value) {
        this.selectedNationalities = value
      },
    },

    residenceRegionsModel: {
      get () {
        return this.residenceRegions
      },
      set (value) {
        this.selectedResidenceRegions = value
      },
    },

    durationDescription() {
      return this.serviceDetails.durations
    }//
  },
  mounted() {

    this.$emit('active')
  }

}
</script>

<style scoped>

</style>
