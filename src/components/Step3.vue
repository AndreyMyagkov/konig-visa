<template>
  <div class="kv-content__body">

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
            <div class="kv-form-title kv-form-title_hv" @click="deleteTourist(index)" v-if="tourists.length > 1">Удалить</div>
          </div>
        </div>

        <div class="kv-form__row kv-row">
          <!-- SName -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" id="sname" v-model="tourists[index].sname">
              <label class="kv-form__label" for="sname">Фамилия</label>
            </div>
          </div>
          <!-- /SName -->

          <!-- Name -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" id="name" v-model="tourists[index].name">
              <label class="kv-form__label" for="name">Имя</label>
            </div>
          </div>
          <!-- /Name -->
        </div>

        <div class="kv-form__row kv-row">
          <!-- Nationality -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv_is-focused"
                 :class="{
                    'kv_is-focused-': tourists[index].nationalityIsFocused,
                 }"
            >
              <v-select
                  :options="nationalities"
                  label="name"
                  placeholder="Выберите"
                  v-model="tourists[index].nationality"
                  :clearable="false"
                  @option:selected="calculateAndValidate"
                  @search:focus="tourists[index].nationalityIsFocused = true"
                  @search:blur="tourists[index].nationalityIsFocused = false"
              />
<!-- @search:focus="tourists[index].nationalityIsFocused = true" -->
              <label class="kv-form__label" for="name">Гражданство</label>
            </div>
          </div>
          <!-- Nationality -->

          <!-- Residence -->
          <div class="kv-form__item-wrap kv-from__col">
            <div
                class="kv-form__item kv_is-focused"
                :class="{
                    'kv_is-focused-': tourists[index].residenceRegionsFocused,
                 }"
                 v-if="productDetails.servedResidenceRegions !== null"
            >

              <v-select
                  :options="productDetails.servedResidenceRegions"
                  label="name"
                  placeholder="Выберите"
                  v-model="tourists[index].residenceRegion"
                  :clearable="false"
                  @option:selected="calculateAndValidate"
                  @search:focus="tourists[index].residenceRegionsFocused = true"
                  @search:blur="tourists[index].residenceRegionsFocused = false"
              />

              <label class="kv-form__label" for="name">Место жительства</label>
            </div>
          </div>
          <!-- /Residence -->
        </div>

        <div class="kv-form__row kv-row">

          <!-- Discounts -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv_is-focused" v-if="productDetails.discounts !== null">
              <select class="kv-form__sel" v-model="tourists[index].discount" @change="calculateAndValidate">
                <option value="null" label="Нет"></option>
                <option :value="item.code" v-for="item in productDetails.discounts" :key="`${item.code}-${index}`">{{item.name}}</option>
              </select>
              <label class="kv-form__label" for="name">Скидка</label>
              <svg class="kv-form__sel-arrow">
                <use href="img/icons/icons.svg#select"></use>
              </svg>

            </div>
          </div>
          <!-- /Discounts -->

          <!-- BirthDate -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" v-if="isRequireBirthDate(index)">
              <input type="date" v-model="tourists[index].birthDate">
              <label class="kv-form__label" for="name">Дата рождения</label>
            </div>
            <div class="" v-html="getDiscountDescription(index)"></div>
          </div>
          <!-- /BirthDate -->

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
import vSelect from "vue-select";
import { required, minLength } from 'vuelidate/lib/validators';
class Toursit {
  constructor(nationality = []) {
    //this.gender = ['herr', 'frau'];
    this.gender = '';
    this.name = '';
    this.sname = '';
    this.nationality = nationality;
    this.residenceRegion = [];
    this.discount = null;
    this.birthDate = '';

    this.nationalityIsFocused = true;
    this.residenceRegionsFocused = true;
  }
}
export default {
  name: "Step3",
  components: {
    vSelect
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
    // nationality: {
    //   type: String,
    //   required: true
    // },
    // residenceRegions: {
    //   type: String,
    //   required: true
    // },
    productDetails: {
      type: Object,
      required: true
    },

  },
  data() {
    return {

    }
  },
  validations: {

  },
  methods: {
    /**
     * Добавляет туриста
     */
    addTourist() {
      // Национальность по умолчанию
      //const nationality = this.nationalities.find(item => item.codeA2 === this.nationality);

      this.$emit('update:tourists',
          [
            ...this.tourists,
            new Toursit()
          ]);
      this.calculateAndValidate();
    },
    /**
     * Удаляет участника под номером Index
     * @param {Number} index
     */
    deleteTourist(index) {
      this.tourists.splice(index, 1);
      this.$emit('update:tourists', this.tourists);
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

<style >
.kv-form__item .vs__dropdown-toggle,
.vs__dropdown-toggle {
  border: none;
}

.kv-app .kv-form__item input:focus ~ .kv-form__label,
.kv-app .kv-form__item select:focus ~ .kv-form__label,
.kv-app .kv-form__item.kv_is-focused .kv-form__label {
  top: 7px;
  font-size: 14px;
  color: var(--c-disabled_dark);
}

</style>
