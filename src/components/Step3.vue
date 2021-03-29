<template>
  <div class="kv-content__body">

    <!--
    <div class="container" style="padding-top:50px;">
      <autocomplete  >      </autocomplete>
    </div>
    -->

    <div class="kv-form">


      <!-- Form card-->
      <div class="kv-form-card" v-for="(item, index) in tourists" :key="index">

        <div class="kv-form__row kv-row kv-row_rev">
          <div class="kv-form__item-wrap kv-form__item-wrap_center kv-from__col_2">
            <div class="kv-form-title">Участник №{{index+1}}</div>
          </div>
        </div>

        <div class="kv-form__row kv-row kv-row_rev">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="radio" aria-label="checkbox" v-model="tourists[index].gender"  value="herr">
                <span class="kv-form-radio__mark">
                   <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Herr</span>
              </label>
              <label class="kv-form-radio">
                <input type="radio" aria-label="checkbox" v-model="tourists[index].gender"   value="frau">
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Frau</span>
              </label>
            </div>
          </div>

          <div class="kv-col-plug"></div>
          <div class="kv-form__item-wrap kv-form__item-wrap_right kv-from__col">
            <div class="kv-form-title kv-form-title_hv" @click="deleteTourist(index)" v-if="index">Удалить</div>
          </div>
        </div>

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" id="sname" v-model="tourists[index].sname">
              <label class="kv-form__label" for="sname">Фамилия</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" id="name" v-model="tourists[index].name">
              <label class="kv-form__label" for="name">Имя</label>
            </div>
          </div>
        </div>

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <select class="kv-form__sel" v-model="tourists[index].nationality" @change="calculateAndValidate">
                  <option value="null" label="Выберите"></option>
                  <option :value="item.codeA2" v-for="item in nationalities" :key="item.codeA3">{{item.name}}</option>
                </select>

              <label class="kv-form__label" for="name">Гражданство</label>
              <svg class="kv-form__sel-arrow">
                <use href="img/icons/icons.svg#select"></use>
              </svg>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" v-if="productDetails.servedResidenceRegions !== null">
              <input list="nationalities" v-model="tourists[index].residenceRegions" @input="calculateAndValidate"/>
              <datalist id="nationalities">
                <option :value="item.name" v-for="item in productDetails.servedResidenceRegions" :key="item.code"></option>
              </datalist>


              <!--
              <select class="kv-form__sel" v-model="tourists[index].residenceRegions">
                <option value="null" label="Место жительства"></option>
                <option value="2">option 1 Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Tempore consequatur, minima nesciunt aspernatur ipsam maxime fugit
                  facilis vitae non nisi! Perferendis autem natus suscipit vel expedita quos
                  dolore explicabo quia!</option>
                <option value="3">option 2</option>
                <option value="4">option 3</option>
                <option value="5">option 4</option>
                <option value="6">option 5</option>
              </select>
              -->
              <label class="kv-form__label" for="name">Место жительства</label>
              <svg class="kv-form__sel-arrow">
                <use href="img/icons/icons.svg#select"></use>
              </svg>

            </div>
          </div>
        </div>

        <div class="kv-form__row kv-row">

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" v-if="productDetails.discounts !== null">
              <select class="kv-form__sel" v-model="tourists[index].discount" @change="calculateAndValidate">
                <option value="null" label="Скидка"></option>
                <option :value="item.code" v-for="item in productDetails.discounts" :key="`${item.code}-${index}`">{{item.name}}</option>
              </select>
              <svg class="kv-form__sel-arrow">
                <use href="img/icons/icons.svg#select"></use>
              </svg>

            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" v-if="isRequireBirthDate(index)">
              <input type="date" v-model="tourists[index].birthDate">
              <label class="kv-form__label" for="name">Дата рождения</label>
            </div>
            <div class="" v-else v-html="getDiscountDescription(index)"></div>
          </div>
        </div>
      </div>
      <!-- Form card-->

      <div class="kv-add" @click="addTourist">
        <svg><use href="img/icons/icons.svg#plus"></use></svg>
        Добавить туриста
      </div>

    </div>
  </div>
</template>

<script>
import Autocomplete from '@/components/ui/Autocomplete';
class Toursit {
  constructor() {
    //this.gender = ['herr', 'frau'];
    this.gender = '';
    this.name = '';
    this.sname = '';
    this.nationality = null;
    this.residenceRegions = null;
    this.discount = null;
    this.birthDate = '';
  }
}
export default {
  name: "Step3",
  components: {
    Autocomplete
  },
  props: {
    tourists: {
      type: Array,
      required: true
    },
    nationalities: {
      type: Array,
      required: true
    },
    productDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    /**
     * Добавляет туриста
     */
    addTourist() {
      this.$emit('update:tourists', [...this.tourists, new Toursit()]);
      this.calculateAndValidate();
    },
    deleteTourist() {
      //this.tourists = this.tourists.slice(0,-1);
      this.$emit('update:tourists', this.tourists.slice(0,-1));
      this.calculateAndValidate();
    },
    /**
     * Требуется ли вывод поля даты рождения, на основе выбранной скидки
     * @param index
     */
    isRequireBirthDate(index) {
      /*
      const discountCode = this.tourists[index].discount;
      if (this.productDetails.discounts !== null && discountCode !== null) {
        const discountItem = this.productDetails.discounts.find(_ => _.code === discountCode);
        return discountItem.isBirthdateReq
      }
      return false
      */
      const discount = this.getTouristDiscountData(index);
      if (discount) {
        return discount.isBirthdateReq
      } else {
        return false
      }
    },
    getDiscountDescription(index) {
      const discount = this.getTouristDiscountData(index);
      if (discount) {
        return discount.description
      } else {
        return null
      }
    },
    /**
     * Информация по скидке туриста
     * @param index
     */
    getTouristDiscountData(index) {
      const discountCode = this.tourists[index].discount;
      if (this.productDetails.discounts !== null && discountCode !== null) {
        return this.productDetails.discounts.find(_ => _.code === discountCode);
      } else {
        return null
      }
    },
    /**
     * Проверяет данные и калькулирует стоимость виз
     */
    calculateAndValidate() {
      this.$emit('change');
    }
  },
  computed: {

  },
  mounted() {
    this.$emit('active');
    // Создаем первого туриста, если их нет вообще
    if (!this.tourists.length) {
      this.addTourist();
    }
  }
}
</script>

<style scoped>

</style>
