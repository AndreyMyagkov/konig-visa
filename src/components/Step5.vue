<template>
  <div class="kv-content__body">

    <button @click='
    customer = {
      isCompany: false,
      addressingCountry: {codeA2: "DE", codeA3: "DEU", name: "Deutschland"},
      gender: "Frau",
      sname: "Иванов",
      name: "2",
      address: "3",
      zip: "4",
      city: "5",
      tel: "6",
      mobile: "77777777777",
      email: "qw@qw.ru",
      companyName: "8",
    };
    delivery = {
      type: 2,
      isCompany: false,
      addressingCountry: {codeA2: "DE", codeA3: "DEU", name: "Deutschland"},
      gender: "Frau",
      sname: "Петров",
      name: "2",
      address: "3",
      zip: "4",
      city: "5",
      tel: "6",
      mobile: "77777777777",
      email: "qw@qw.ru",
      companyName: "8",
    };
    $v.customer.$touch();
    $v.delivery.$touch();
    $v.$touch();
    isFormCorrect()'>Тестовые данные</button>
    <div class="kv-form">

      <!-- Customer-->
      <div class="kv-form-card kv-form-card_dis" id="kv-customer">
        <!-- From row-->
        <div class="kv-row kv-form__row">
          <!-- company -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="checkbox" aria-label="company" v-model="customer.isCompany" @change="$v.customer.companyName.$reset; isFormCorrect()">
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
              <input type="text" id="companyname" placeholder=" " v-model="$v.customer.companyName.$model"  @input="isFormCorrect">
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
                <input type="radio" name="gender" aria-label="Herr" value="Herr" v-model="$v.customer.gender.$model"  @change="isFormCorrect">
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Herr</span>
              </label>

              <label class="kv-form-radio">
                <input type="radio" name="gender" aria-label="Frau" value="Frau"  v-model="$v.customer.gender.$model"  @change="isFormCorrect">
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
              <input type="text" placeholder=" " id="sname1" v-model.trim="$v.customer.sname.$model" @input="isFormCorrect">
              <label class="kv-form__label" for="sname1">Фамилия</label>
            </div>
          </div>
          <!-- /sname -->

          <!-- name -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item"  :class="{ 'kv-form__item_error': $v.customer.name.$error }">
              <input type="text" placeholder=" " id="name1" v-model.trim="$v.customer.name.$model"  @input="isFormCorrect">
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
              <input type="text" placeholder=" " id="address1"  v-model.trim="$v.customer.address.$model"  @input="isFormCorrect">
              <label class="kv-form__label" for="address1">Адрес</label>
            </div>
          </div>
          <!-- /address -->
        </div>


        <!-- From row-->
        <div class="kv-form__row kv-row">

          <!-- index -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.zip.$error }">
              <input type="text" placeholder=" " id="zip1" v-model.trim="$v.customer.zip.$model"  @input="isFormCorrect">
              <label class="kv-form__label" for="zip1">Индекс</label>
            </div>
          </div>
          <!-- /index -->

          <!-- city -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.city.$error }">
              <input type="text" placeholder=" " id="city1" v-model.trim="$v.customer.city.$model"  @input="isFormCorrect">
              <label class="kv-form__label" for="city1">Город</label>
            </div>
          </div>
          <!-- /city -->

          <!-- country -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv_is-focused-"
                 ref="addressingCountries"
                 :class="{
                    'kv-form__item_error': $v.customer.addressingCountry.$error,
                     'kv_is-focused': $v.customer.addressingCountry.$model.codeA3 !== null,
                }"

            >
              <div class="kv-form__sel-custom">
                <v-select
                    :options="addressingCountries"
                    label="name"
                    placeholder=" "
                    inputId="customer-addressingCountry"
                    v-model="$v.customer.addressingCountry.$model"
                    :clearable="false"
                    @option:selected="$refs.addressingCountries.classList.add('kv_is-focused');isFormCorrect()"
                    @search:focus="$refs.addressingCountries.classList.add('kv_is-focused')"
                    @search:blur="$v.customer.addressingCountry.$touch()"
                />

                <label class="kv-form__label" for="customer-addressingCountry">Страна</label>
                <svg class="kv-form__sel-arrow"><use href="img/icons/icons.svg#select"></use></svg>
              </div>
            </div>
          </div>
          <!-- /country -->
        </div>

        <!-- From row-->
        <div class="kv-form__row kv-row">
          <!-- phone -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <!-- mask="# (###) ### ## ##" -->
              <!--<the-mask mask="# (###) ### ## ##" type="tel" :masked="false" placeholder=" " id="phone1" v-model="customer.tel"  @input="isFormCorrect"></the-mask>-->
              <input type="text" placeholder=" " id="phone1" v-model="customer.tel"  @input="isFormCorrect">

              <label class="kv-form__label" for="phone1">
                <template v-if="!customer.tel">Телефон <!--(если есть)--></template>
                <template v-else>Телефон</template>
              </label>
              <div
                  class="kv-form__sublabel"
                  v-if="!customer.tel"
              >
                (если есть)
              </div>
            </div>
          </div>
          <!-- /phone -->

          <!-- mphone -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item"  :class="{ 'kv-form__item_error': $v.customer.mobile.$error }">
              <input type="text" placeholder=" " id="cellphone1"  v-model="$v.customer.mobile.$model"  @input="isFormCorrect">
              <!--<the-mask mask="# (###) ### ## ##" type="tel" :masked="false" placeholder=" " id="cellphone1" v-model="$v.customer.mobile.$model"  @input="isFormCorrect"></the-mask>-->
              <label class="kv-form__label" for="cellphone1">Мобильный телефон</label>
            </div>
          </div>
          <!-- /mphone -->

          <!-- email -->
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.customer.email.$error }">
              <input type="email" placeholder=" " id="email1"  v-model.trim="$v.customer.email.$model"  @input="isFormCorrect">
              <label class="kv-form__label" for="email1">email</label>
            </div>
          </div>
          <!-- /email -->
        </div>
      </div>


      <!-- Delivery-->
      <div class="kv-form-card" v-if="!isDeliveryByEmail" id="kv-delivery">
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
                  <input type="radio" name="type" v-model="delivery.type" value="1"  @change="isFormCorrect">
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
                  <input type="radio" v-model="delivery.type" value="2"  @change="isFormCorrect">
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
                  <input type="radio" v-model="delivery.type" value="3"  @change="isFormCorrect">
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
                  <input type="checkbox" v-model="delivery.isCompany"  @change="$v.delivery.companyName.$reset; isFormCorrect()">
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
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.companyName.$error }">
                <input type="text" id="companyname2" placeholder=" " v-model.trim="$v.delivery.companyName.$model"  @input="isFormCorrect">
                <label class="kv-form__label" for="companyname2">Название фирмы</label>
              </div>
            </div>
            <!-- company name -->
          </div>


          <!-- From row-->
          <div class="kv-row kv-form__row">
            <!--  gender -->
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb" :class="{ 'kv-form__item_error': $v.delivery.gender.$error }">
                <label class="kv-form-radio">
                  <input type="radio" name="gender2" value="Herr"  v-model="$v.delivery.gender.$model"  @change="isFormCorrect">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Herr</span>
                </label>
                <label class="kv-form-radio">
                  <input type="radio" name="gender2" value="Frau" v-model="$v.delivery.gender.$model"  @change="isFormCorrect">
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Frau</span>
                </label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.sname.$error }">
                <input type="text" placeholder=" " id="sname2" name="sname2" v-model.trim="$v.delivery.sname.$model"  @change="isFormCorrect">
                <label class="kv-form__label" for="sname2">Фамилия</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.name.$error }">
                <input type="text" placeholder=" " id="name2" name="name2" v-model.trim="$v.delivery.name.$model"  @input="isFormCorrect">
                <label class="kv-form__label" for="name2">Имя</label>
              </div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.address.$error }">
                <input type="text" placeholder=" " id="address2" name="address2" v-model.trim="$v.delivery.address.$model"  @input="isFormCorrect">
                <label class="kv-form__label" for="address2">Адрес</label>
              </div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.zip.$error }">
                <input type="text" placeholder=" " id="zip2" name="zip2" v-model.trim="$v.delivery.zip.$model"  @input="isFormCorrect">
                <label class="kv-form__label" for="zip2">Индекс</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.city.$error }">
                <input type="text" placeholder=" " id="city2" name="city2" v-model.trim="$v.delivery.city.$model"  @input="isFormCorrect">
                <label class="kv-form__label" for="city2">Город</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item"
                   ref="addressingCountries2"
                   :class="{
                      'kv-form__item_error': $v.delivery.addressingCountry.$error,
                      'kv_is-focused': $v.delivery.addressingCountry.$model.codeA3 !== null,
                   }">
                <div class="kv-form__sel-custom">
                  <v-select
                      :options="addressingCountries"
                      label="name"
                      placeholder=" "
                      inputId="deliveryaddressingCountry"
                      v-model="$v.delivery.addressingCountry.$model"
                      :clearable="false"
                      @option:selected="$refs.addressingCountries2.classList.add('kv_is-focused');isFormCorrect()"
                      @search:focus="$refs.addressingCountries2.classList.add('kv_is-focused');"
                      @search:blur="$v.delivery.addressingCountry.$touch()"
                  />
                  <label class="kv-form__label" for="deliveryaddressingCountry">Страна</label>
                  <svg class="kv-form__sel-arrow"><use href="img/icons/icons.svg#select"></use></svg>
                </div>
              </div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item">
                <!--<the-mask mask="# (###) ### ## ##" type="tel"
                          :masked="false" placeholder=" " id="phone2" v-model="delivery.tel"  @input="isFormCorrect"></the-mask> -->
                <input type="text" placeholder=" " id="phone2"  v-model="delivery.tel"  @input="isFormCorrect">
                <label class="kv-form__label" for="phone2">
                  <template v-if="!delivery.tel">Телефон</template>
                  <template v-else>Телефон</template>
                </label>
                <div class="kv-form__sublabel" v-if="!delivery.tel">
                  (если есть)
                </div>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.mobile.$error }">
                <input type="text" placeholder=" " id="cellphone2" name="cellphone2" v-model="$v.delivery.mobile.$model" @input="isFormCorrect">
                <!--<the-mask mask="# (###) ### ## ##" type="tel"
                          :masked="false" placeholder=" " id="cellphone2" v-model="$v.delivery.mobile.$model"  @input="isFormCorrect"></the-mask> -->
                <label class="kv-form__label" for="cellphone2">Мобильный телефон</label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item" :class="{ 'kv-form__item_error': $v.delivery.email.$error }">
                <input type="email" placeholder=" " id="email2" name="email2"  v-model="$v.delivery.email.$model"  @input="isFormCorrect">
                <label class="kv-form__label" for="email2">email</label>
              </div>
            </div>
          </div>
        </template>

        <template  v-if="delivery.type == 3">

          <div class="kv-row kv-form__row" v-for="(row, i) in preparedPickupPoints" :key="i">

            <div class="kv-form__item-wrap kv-from__col"  v-for="item in row" :key="item.id">
              <div class="kv-form__item kv-form__item_chb" :data-i="item.id"  :data-vue="delivery.branch.id"
                   :class="{
                'kv-form__item_border': item.id === delivery.branch.id
              }">
                <label class="kv-form-radio">
                  <!-- :checked="item.id === customer.branch.id" -->
                  <!--<input type="radio" name="branch" v-model="delivery.branch" :value="item.id"  @change="isFormCorrect">-->
                  <input type="radio" name="branch" :checked="item.id === delivery.branch.id"  :value="item.id"  @change="changeBranch(item)">
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

      <div class="kv-alert kv-alert_center" v-if="isDeliveryByEmail">
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

const isCountrySelected = (value) => !Array.isArray(value);
const checkCompany = (value, vm) => !vm.isCompany || (vm.isCompany && value.length > 0);


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
    },
    showBlock: {

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
    }
  },
  validations: {

    customer: {
      companyName: {
        //required,
        //minLength: minLength(1)
        checkCompany

        /*checkCompany:  (value, vm) => {
          return !vm.isCompany || (vm.isCompany && value.length > 0)
        }
        */
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
      mobile: {
        required,
        //minLength: minLength(11)
        minLength: minLength(1)
      },
      email: {
        email,
        required,
        minLength: minLength(1)
      },

    },

    delivery: {
      companyName: {
        checkCompany
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
      mobile: {
        required,
        //minLength: minLength(11)
        minLength: minLength(1)
      },
      email: {
        email,
        required,
        minLength: minLength(1)
      },

    }

  },
  methods: {
    /**
     * Смена офиса доставки
     */
    changeBranch(value){
      console.log('бранч')
      console.log(value)
      this.delivery.branch = value;
      //this.$v.delivery.branch.$model = value;
      this.$v.delivery.$touch();
      this.isFormCorrect();
    },
    isFormCorrect() {
      console.log('Валидация')

      //const customerIsValid = this.$v.customer.$anyDirty &&  !this.$v.customer.$invalid;
      //const deliveryIsValid = this.$v.delivery.$anyDirty &&  !this.$v.delivery.$invalid;

      const customerIsValid = this.$v.$anyDirty &&  !this.$v.customer.$invalid;
      const deliveryIsValid = this.$v.$anyDirty &&  !this.$v.delivery.$invalid;

      let isValid = false;

      // Адрес доставки совпадает с заказчиком или Электронная доставка
      if (this.delivery.type == 1) {
        isValid = customerIsValid;
      }
      // Адрес доставки отличается от заказчика
      if (this.delivery.type == 2) {
        isValid = customerIsValid && deliveryIsValid;
      }
      if (this.delivery.type == 3) {
        isValid = customerIsValid && this.delivery.branch.id !== null;
      }

      this.$emit('isValid', isValid)
      return isValid
    }
  },
  computed: {

    preparedPickupPoints() {
      return arrayHelper.arrayToSubArrays(this.pickupPoints, 2)
    },

  },
  mounted() {
    this.$emit('active');
    /*
    if (this.showBlock === "delivery") {
      console.log('старт')
      setTimeout(
          () => {
              console.log('енд')
              document.querySelector('#form-delivery').scrollIntoView({
                block: "start",
                behavior: "smooth"
              });
            },
          1000
      )

    }*/
  },
  beforeDestroy() {
    // Отправка формы в корень
    this.$emit('update', {
      customer: this.customer,
      delivery: this.delivery
    })
  }
}
</script>

<style scoped>

</style>

