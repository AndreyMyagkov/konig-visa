<template>
  <div class="kv-content__body">

    <button @click="
      $v.tourists.$each.$iter[0].gender.$model= 'Herr';
      $v.tourists.$each.$iter[0].name.$model= 'Иван';
      $v.tourists.$each.$iter[0].sname.$model= 'Иванов';
      $v.tourists.$each.$iter[0].discount.$model= null;
      $v.tourists.$each.$iter[0].birthDate.$model= '';

      $v.tourists.$each.$iter[0].nationality.$model = {
        codeA2:'RU',
        codeA3:'RUS',
        name:'Russian Federation'
      };
      $v.tourists.$each.$iter[0].residenceRegion.$model = {
        code:'DEU\\BW',
        name:'Deutschland, Baden-Württemberg'
      }; isValid();
    ">Тестовые данные</button>


    <div class="kv-form">


      <!-- Form card-->
      <div class="kv-form-card"
           :class="{
              'kv-form-card_error': (item.$anyDirty && item.$anyError) || (item.$model.state !== 0 && item.$model.nationality.codeA3)
          }"
           :id="`kv-tourist-${index}`"
           v-for="(item, index) in $v.tourists.$each.$iter"
           :key="index">

        <div class="kv-alert" v-if="(item.$model.state !== 0 && item.$model.nationality.codeA3)" v-html="item.$model.stateDescription">

        </div>

        <div class="kv-form__row kv-row kv-row_rev">

          <div class="kv-form__item-wrap kv-form__col">
            <div class="kv-form__item kv-form__item_chb" :class="{ 'kv-form__item_error': item.gender.$error }">
              <label class="kv-form-radio">
                <input type="radio" aria-label="checkbox" v-model="item.gender.$model" value="Herr" @change="isValid">
                <span class="kv-form-radio__mark">
                   <svg><use href="#kv-icons_form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">{{ $lng('step3.gender.male') }}</span>
              </label>
              <label class="kv-form-radio">
                <input type="radio" aria-label="checkbox" v-model="item.gender.$model"  value="Frau" @change="isValid">
                <span class="kv-form-radio__mark">
                  <svg><use href="#kv-icons_form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">{{ $lng('step3.gender.female') }}</span>
              </label>
            </div>
          </div>

          <div class="kv-col-plug">
            <div class="kv-form-title">{{ $lng('step3.participant') }} №{{parseInt(index)+1}}</div>
          </div>

          <div class="kv-form__item-wrap kv-form__item-wrap_right kv-form__col">
            <div class="kv-form-title_hv" @click="deleteTourist(index)" v-if="tourists.length > 1">{{ $lng('step3.delete') }}</div>
          </div>

        </div>

        <div class="kv-form__row kv-row">

          <!-- Name -->
          <div class="kv-form__item-wrap kv-form__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': item.name.$error }">
              <input
                  type="text"
                  :id="`name-${index}`"
                  placeholder=" "
                  v-model.trim="item.name.$model"
                  @input="isValid"
              >
              <label class="kv-form__label" :for="`name-${index}`">{{ $lng('step3.name') }}</label>
            </div>
          </div>
          <!-- /Name -->

          <!-- SName -->
          <div class="kv-form__item-wrap kv-form__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': item.sname.$error }">
              <input
                  type="text"
                  :id="`sname-${index}`"
                  placeholder=" "
                  v-model.trim="item.sname.$model"
                  @input="isValid"
              >
              <label class="kv-form__label" :for="`sname-${index}`">{{ $lng('step3.sname') }}</label>
            </div>
          </div>
          <!-- /SName -->



        </div>



        <div class="kv-form__row kv-row">
          <!-- Nationality -->
          <div class="kv-form__item-wrap kv-form__col">
            <div class="kv-form__item kv_is-focused-"
                 ref="nationality"
                 :class="{
                    'kv_is-focused': item.nationality.$model.codeA3 !== null,
                    'kv-form__item_error': item.nationality.$error || item.$model.state === -2
                 }"
            >
              <div class="kv-form__sel-custom">
              <v-select
                  :options="nationalities"
                  label="name"
                  :inputId="`nationality-${index}`"
                  placeholder=" "
                  v-model="item.nationality.$model"
                  :clearable="false"
                  @option:selected="$refs.nationality[index].classList.add('kv_is-focused');calculateAndValidate(index);scrollTo(`#kv-residence-${index}`)"
                  @search:focus="$refs.nationality[index].classList.add('kv_is-focused')"
              />
              <svg class="kv-form__sel-arrow"><use href="#kv-icons_select"></use></svg>
<!-- @search:focus="tourists[index].nationalityIsFocused = true" -->
              <label class="kv-form__label" :for="`nationality-${index}`">{{ $lng('step3.nationality') }}</label>
              </div>

            </div>
          </div>
          <!-- Nationality -->

          <!-- Residence -->
          <div class="kv-form__item-wrap kv-form__col" :id="`kv-residence-${index}`">
            <div
                class="kv-form__item kv_is-focused-"
                ref="residenceRegion"
                :class="{
                    'kv_is-focused': item.residenceRegion.$model.code !== null,
                    'kv-form__item_error': item.residenceRegion.$error || item.$model.state === -3
                 }"
                 v-if="productDetails.servedResidenceRegions !== null"
            >
              <div class="kv-form__sel-custom">
                <v-select
                    :options="productDetails.servedResidenceRegions"
                    label="name"
                    :inputId="`residenceRegion-${index}`"
                    placeholder=" "
                    v-model="item.residenceRegion.$model"
                    :clearable="false"
                    @option:selected="$refs.residenceRegion[index].classList.add('kv_is-focused');calculateAndValidate();"
                    @search:focus="$refs.residenceRegion[index].classList.add('kv_is-focused');"
                    @search:focusDEL="item.residenceRegionsFocused = true"
                    @search:blur="item.residenceRegionsFocused = false"
                    @option:selecting=""
                />
                <label class="kv-form__label" :for="`residenceRegion-${index}`">{{ $lng('step3.residenceRegions') }}</label>
                <svg class="kv-form__sel-arrow"><use href="#kv-icons_select"></use></svg>
              </div>
            </div>
          </div>
          <!-- /Residence -->
        </div>

        <div class="kv-form__row kv-row">

          <!-- Discounts -->
          <div class="kv-form__item-wrap kv-form__col">
            <!--   item.discount != null && item.discount != 'null' && item.discount.$model != 'null' -->
            <div class="kv-form__item" :class="{
              'kv_is-focused': ['c', 'r', 'd'].indexOf(item.discount.$model) >= 0
            }"
                 v-if="productDetails.discounts !== null">
              <select
                  class="kv-form__sel"
                  v-model="item.discount.$model"
                  @change="calculateAndValidate"
                  :id="`discount-${index}`">
                <option value="null" label=" "></option>
                <option :value="item.code" v-for="item in productDetails.discounts" :key="`${item.code}-${index}`">{{item.name}}</option>
              </select>
              <label class="kv-form__label" :for="`discount-${index}`" style="pointer-events: none">{{ $lng('step3.discount') }}</label>
              <svg class="kv-form__sel-arrow">
                <use href="#kv-icons_select"></use>
              </svg>

            </div>

            <div class="kv-form__msg kv-form__msg_label" v-if="!isRequireBirthDate(index)"  v-html="getDiscountDescription(index)">
            </div>
          </div>
          <!-- /Discounts -->

          <!-- BirthDate -->
          <div class="kv-form__item-wrap kv-form__col">
            <template  v-if="isRequireBirthDate(index)">
              <div class="kv-form__item"
                   :class="{ 'kv-form__item_error': item.birthDate.$error }"
              >
                <input type="date" id="birthDate" v-model.trim="item.birthDate.$model" @input="isValid">
                <label class="kv-form__label" for="birthDate">{{ $lng('step3.birthDate') }}</label>
              </div>
              <div class="kv-form__msg kv-form__msg_label">
                <div v-html="getDiscountDescription(index)"></div>
              </div>
            </template>

          </div>

          <!-- kv-form__item-wrap kv-form__msg kv-form__col -->

          <!-- /BirthDate -->

        </div>

      </div>
      <!-- Form card-->

      <div class="kv-add" @click="addTourist">
        <svg><use href="#kv-icons_plus"></use></svg>
        {{ $lng('step3.btnAdd') }}
      </div>

    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { required, minLength } from 'vuelidate/lib/validators';


const isNationalitySelected = (value) => value.codeA3 !== null;
const isResidenceRegionSelected = (value, vm) => !vm.residenceRegionsRequired || (vm.residenceRegionsRequired && (value.code  !== null));

const isBirthDateValid = (value, vm) => {
  return vm.discount !== "c" ||  (vm.discount === "c"  && value.length === 10)}


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
    residenceRegionsRequired: {},
    tourists: {
      required,
      minLength: minLength(1),
      $each: {
        gender: {
          required,
        },
        sname: {
          required,
          minLength: minLength(1)
        },
        name: {
          required,
          minLength: minLength(1)
        },
        nationality: {
          isNationalitySelected
        },
        nationalityIsFocused: {

        },
        residenceRegion: {
          isResidenceRegionSelected
        },
        discount: {

        },
        birthDate: {
          isBirthDateValid
        },
      }
    }
  },
  methods: {
    /**
     * Прокрутка
     */
    scrollTo(element) {
      this.$emit('scroll-to', element, true);
    },
    /**
     * Обновляет поле для туриста
     */
    setField(index, field, value) {
      const textFields = ['name', 'sname'];
      if (textFields.indexOf(field) !== -1) {
        value = value.trim();
      }

      this.$emit('update:field', {
        index,
        field,
        value
      })

      //this.tourists[field] = value;
      //this.$v.tourists[field].$touch();
    },

    /**
     * Добавляет туриста
     */
    addTourist() {
      this.$emit('addTourist');
      this.isValid();
    },
    /**
     * Удаляет участника под номером Index
     * @param {Number} index
     */
    deleteTourist(index) {
      this.$emit('deleteTourist', index);
      if (!this.$v.tourists.$anyDirty) {this.$v.$touch();}
      this.isValid();
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
     * @param {number} index -  индекс редактируемого туриста
     */
    calculateAndValidate(index) {
      this.$emit('change', index);
      this.isValid();
    },

    isValid() {
      console.log('тест валидация')
      let isValid = false;

      // Если форма валидна
      //const isFormValid = this.$v.tourists.$anyDirty &&  !this.$v.tourists.$invalid;
      const isFormValid =   !this.$v.tourists.$invalid;

      // Калькуляция валидна
      //const isCalculateValid = this.tourists.every(item => item.state === 0);

      isValid = isFormValid; // && isCalculateValid;
      console.log('Проверка фомы')
      console.log(isFormValid);
     // console.log(isCalculateValid);

      this.$emit('isValid', isValid)
      return isValid
    },

    // Выбрана ли национальность
    isNatFocused(index) {
      return this.$v.tourists.$each.$iter[index].nationality.isNationalitySelected
    },
    // Выбрано ли место жительства
    isRegFocused(index) {
      return this.$v.tourists.$each.$iter[index].residenceRegion.isResidenceRegionSelected
    },

  },
  computed: {

  },
  mounted() {
    this.$emit('active');
    setTimeout(() => {this.isValid();}, 100)

    // Создаем первого туриста, если их нет вообще
    /*
    if (!this.tourists.length) {
      this.addTourist();
    }*/
  }
}
</script>

<style >
.kv-form__item .vs__dropdown-toggle,
.vs__dropdown-toggle {
  border: none;
}

/* .kv_is-focused .kv-form__sel {
  padding-top: 10px;
} */

/*
FIXME: del 28 апреля
.kv-app .kv-form__item input:focus ~ .kv-form__label,
.kv-app .kv-form__item.kv_is-focused .kv-form__label {
  top: 7px;
  font-size: 14px;
  color: var(--c-disabled_dark);
}
*/


</style>
