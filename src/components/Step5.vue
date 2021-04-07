<template>
  <div class="kv-content__body">

    Трогали поля  {{$v.$anyDirty}}<br>
    Есть ошибки  {{$v.$anyError}}<br>
    Успех {{ $v.$anyDirty &&  !$v.$invalid }}
    <div class="kv-form">

      <!-- Customer-->
      <div class="kv-form-card kv-form-card_dis">
        <!-- From row-->
        <div class="kv-row kv-form__row">
          <!-- company -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="checkbox" aria-label="company" v-model="customer.isCompany" @change="$v.customer.companyName.$reset">
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_chb"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Фирма</span> </label>
            </div>
          </div>
          <!-- /company -->
          <div class="kv-col-plug"></div>
          <div class="kv-col-plug"></div>
        </div>

        <div class="kv-form__row kv-row" v-if="customer.isCompany">
          <!-- company name -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item"  :class="{ 'kv-form__item_error': $v.customer.companyName.$error }">
              <input type="text" id="companyname" placeholder=" " v-model="$v.customer.companyName.$model">
              <label class="kv-form__label" for="companyname">Название фирмы</label>
            </div>
          </div>
          <!-- company name -->
        </div>

        <!-- From row-->
        <div class="kv-row kv-form__row">
          <!-- gender -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb" :class="{ 'kv-form__item_error': $v.customer.gender.$error }">
              <label class="kv-form-radio">
                <input type="radio" name="gender" aria-label="Herr" value="herr" v-model="$v.customer.gender.$model">
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Herr</span>
              </label>

              <label class="kv-form-radio">
                <input type="radio" name="gender" aria-label="Frau" required value="frau" v-model="customer.gender">
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Frau</span>
              </label>
            </div>
          </div>
          <!-- /gender -->

          <!-- sname -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.sname.$error }">
              <input type="text" placeholder=" " id="sname1" v-model.trim="$v.customer.sname.$model">
              <label class="kv-form__label" for="sname1">Фамилия</label>
            </div>
          </div>
          <!-- /sname -->

          <!-- name -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item"  :class="{ 'kv-form__item_error': $v.customer.name.$error }">
              <input type="text" placeholder=" " id="name1" v-model="$v.customer.name.$model">
              <label class="kv-form__label" for="name1">Имя</label>
            </div>
          </div>
          <!-- /name -->

        </div>

        <!-- From row-->
        <div class="kv-form__row kv-row">
          <!-- address -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.address.$error }">
              <input type="text" placeholder=" " id="address1"  v-model="$v.customer.address.$model">
              <label class="kv-form__label" for="address1">Адресс</label>
            </div>
          </div>
          <!-- /address -->
        </div>


        <!-- From row-->
        <div class="kv-form__row kv-row">

          <!-- index -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.zip.$error }">
              <input type="text" placeholder=" " id="zip1" v-model="$v.customer.zip.$model">
              <label class="kv-form__label" for="zip1">Индекс</label>
            </div>
          </div>
          <!-- /index -->

          <!-- city -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.city.$error }">
              <input type="text" placeholder=" " id="city1" v-model="$v.customer.city.$model">
              <label class="kv-form__label" for="city1">Город</label>
            </div>
          </div>
          <!-- /city -->

          <!-- country -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv_is-focused" ref="addressingCountries" :class="{ 'kv-form__item_error': $v.customer.addressingCountry.$error }">
              <v-select
                  :options="addressingCountries"
                  label="name"
                  placeholder="Выберите"
                  v-model="$v.customer.addressingCountry.$model"
                  :clearable="false"
                  @option:selected=""
                  @search:focus="$refs.addressingCountries.classList.add('test')"
                  @search:blur="$v.customer.addressingCountry.$touch()"
              />

              <label class="kv-form__label">Страна</label>
            </div>
          </div>
          <!-- /country -->
        </div>

        <!-- From row-->
        <div class="kv-form__row kv-row">
          <!-- phone -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
             <!-- <input type="tel" placeholder=" " id="phone1" v-model="customer.tel">-->
              <the-mask mask="# (###) ### ## ##" type="tel" :masked="false" placeholder=" " id="phone1" v-model="customer.tel"></the-mask>

              <label class="kv-form__label" for="phone1">Телефон</label>
            </div>
          </div>
          <!-- /phone -->

          <!-- mphone -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <!--<input type="tel" placeholder=" " id="cellphone1"  v-model="customer.mobile">-->
              <the-mask mask="# (###) ### ## ##" type="tel" :masked="false" placeholder=" " id="cellphone1" v-model="customer.mobile"></the-mask>
              <label class="kv-form__label" for="cellphone1">Мобильный телефон</label>
            </div>
          </div>
          <!-- /mphone -->

          <!-- email -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.email.$error }">
              <input type="email" placeholder=" " id="email1"  v-model="$v.customer.email.$model">
              <label class="kv-form__label" for="email1">email</label>
            </div>
          </div>
          <!-- /email -->
        </div>
      </div>


      <!-- Delivery-->
      <div class="kv-form-card" v-if="!isDeliveryByEmail">
        <div class="kv-form__header">

          <!-- From row-->
          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-form__item-wrap_center kv-from__col">
              <div class="kv-form-title">Lieferanschrift</div>
            </div>
          </div>

          <!-- From row-->
          <div class="kv-form__row kv-row">
            <!-- Адрес доставки соответствует заказчику -->
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb"
                   :class="{
                    'kv-form__item_border': delivery.type == 1
                  }"
              >
                <label class="kv-form-radio">
                  <input type="radio" name="type" v-model="delivery.type" value="1">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Lieferanschrift entspricht Auftraggeber</span>
                </label>
              </div>
            </div>
            <!-- / Адрес доставки соответствует заказчику -->

            <!-- другой адрес доставки -->
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb"
                   :class="{
                    'kv-form__item_border': delivery.type == 2
                  }"
              >
                <label class="kv-form-radio">
                  <input type="radio" v-model="delivery.type" value="2">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">abweichende Lieferanschrift</span>
                </label>
              </div>
            </div>
            <!-- другой адрес доставки  -->

            <!-- самовывоз -->
            <div class="kv-form__item-wrap kv-from__col" v-if="preparedPickupPoints !== null && preparedPickupPoints.length > 0">
              <div class="kv-form__item kv-form__item_chb"
                   :class="{
                    'kv-form__item_border': delivery.type == 3
                  }"
              >
                <label class="kv-form-radio">
                  <input type="radio" v-model="delivery.type" value="3">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Abholen</span>
                </label>
              </div>
            </div>
            <!-- /самовывоз -->
          </div>
        </div>

        <template v-if="delivery.type == 2">
        <!-- From row-->
          <div class="kv-row kv-form__row">
            <!--  company -->
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb">
                <label class="kv-form-radio">
                  <input type="checkbox" v-model="delivery.isCompany">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_chb"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Фирма</span>
                </label>
              </div>
            </div>
            <!--  /company -->

            <div class="kv-col-plug"></div>
            <div class="kv-col-plug"></div>
          </div>


          <div class="kv-form__row kv-row" v-if="delivery.isCompany">
            <!-- company name -->
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="text" id="companyname2" placeholder=" " v-model="delivery.companyName">
                <label class="kv-form__label" for="companyname2">Название фирмы</label>
              </div>
            </div>
            <!-- company name -->
          </div>


          <!-- From row-->
          <div class="kv-row kv-form__row">
            <!--  company -->
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb">
                <label class="kv-form-radio">
                  <input type="radio" name="gender2" v-model="delivery.gender" value="herr">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Herr</span>
                </label>
                <label class="kv-form-radio">
                  <input type="radio" name="gender2" v-model="delivery.gender" value="frau">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Frau</span>
                </label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="text" placeholder=" " id="sname2" name="sname2" v-model="delivery.sname">
                <label class="kv-form__label" for="sname2">Фамилия</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="text" placeholder=" " id="name2" name="name2"  v-model="delivery.name">
                <label class="kv-form__label" for="name2">Имя</label>
              </div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="text" placeholder=" " id="address2" name="address2" v-model="delivery.address">
                <label class="kv-form__label" for="address2">Адресс</label>
              </div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="text" placeholder=" " id="zip2" name="zip2" v-model="delivery.zip">
                <label class="kv-form__label" for="zip2">Индекс</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="text" placeholder=" " id="city2" name="city2" v-model="delivery.city">
                <label class="kv-form__label" for="city2">Город</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv_is-focused" ref="addressingCountries2">
                <v-select
                    :options="addressingCountries"
                    label="name"
                    placeholder="Выберите"
                    v-model="delivery.addressingCountry"
                    :clearable="false"
                    @option:selected=""
                    @search:focus="$refs.addressingCountries2.classList.add('test')"
                    @search:blur="$refs.addressingCountries2.classList.remove('test')"
                />
                <label class="kv-form__label">Страна</label>
              </div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="tel" placeholder=" " id="phone2"  v-model="delivery.tel">
                <label class="kv-form__label" for="phone2">Телефон</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="tel" placeholder=" " id="cellphone2" name="cellphone2" v-model="delivery.mobile">
                <label class="kv-form__label" for="cellphone2">Мобильный телефон</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <input type="email" placeholder=" " id="email2" name="email2"  v-model="delivery.email">
                <label class="kv-form__label" for="email2">email</label>
              </div>
            </div>
          </div>
        </template>

        <template  v-if="delivery.type == 3">

          <div class="kv-row kv-form__row" v-for="(row, i) in preparedPickupPoints" :key="i">

            <div class="kv-form__item-wrap kv-from__col"  v-for="item in row" :key="item.id">
              <div class="kv-form__item kv-form__item_chb"
                   :class="{
                'kv-form__item_border': item.id ===delivery.branch
              }">
                <label class="kv-form-radio">
                  <input type="radio" name="branch" v-model="delivery.branch" :value="item.id">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span>
                  <div class="kv-form-radio__title">{{item.name}}</div>
                  <div class="kv-form-radio__text">{{item.address}}</div>
                  <div class="kv-form-radio__text">Время работы: <b>{{item.workingTime}}</b></div>
                </span>
                </label>
              </div>
            </div>

          </div>



        </template>

      </div>

      <div class="kv-alert" v-if="isDeliveryByEmail">
        Документы будут доставлены на электронный адрес клиента
      </div>

    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { TheMask } from 'vue-the-mask';
import { required, minLength, email } from 'vuelidate/lib/validators';
import * as arrayHelper from '@/helpers/array';

const isCountrySelected = (value) => !Array.isArray(value)
export default {
  name: "Step5",
  props: {
    addressingCountries: {
      type: Array,
      required: true
    },
    pickupPoints: {
      type: Array,
      required: true
    },
    customerDefault: {
      type: Object,
      required: true
    },
    deliveryDefault: {
      type: Object,
      required: true
    },
    isDeliveryByEmail: {
      type: Boolean,
      required: false
    }
  },
  components: {
    vSelect,
    TheMask
  },
  data() {
    return {
      customer: Object.assign({}, this.customerDefault),
      delivery: Object.assign({}, this.deliveryDefault),

      /*
      customer: {
        isCompany: false,
        addressingCountry: [],
        gender: '',
        sname: '',
        name: '',
        address: '',
        zip: '',
        city: '',
        tel: '',
        mobile: '',
        email: '',
        companyName: ''
      },
      delivery: {
        type: 1, // TODO: по справочнику
        isCompany: false,
        gender: '',
        addressingCountry: [],
        sname: '',
        name: '',
        address: '',
        zip: '',
        city: '',
        tel: '',
        mobile: '',
        email: '',
        companyName: '',
        branch: ''
      }
*/

    }
  },
  validations: {

    customer: {
      companyName: {
        //required,
        //minLength: minLength(1)

        checkCompany:  (value, vm) => {
          return !vm.isCompany || (vm.isCompany && value.length > 0)
        }

      },
      gender: {
        required,
        minLength: minLength(1)
      },
      sname: {
        required,
        minLength: minLength(1)
      },
      name: {
        required,
        minLength: minLength(1)
      },
      address: {
        required,
        minLength: minLength(1)
      },
      zip: {
        required,
        minLength: minLength(1)
      },
      city: {
        required,
        minLength: minLength(1)
      },
      addressingCountry: {
        isCountrySelected
      },
      email: {
        email,
        minLength: minLength(1)
      },

    }

  },
  computed: {

    preparedPickupPoints() {
      return arrayHelper.arrayToSubArrays(this.pickupPoints, 2)
    }
  },
  mounted() {
    this.$emit('active');
  }
}
</script>

<style scoped>

</style>

