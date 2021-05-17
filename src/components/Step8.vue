<template>
  <div class="kv-content__body kv-payment">
    <div class="kv-payment__col">

      <!-- item Vorkasse -->
      <div class="kv-payment__item" v-if="isAllow('prepayment')">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <label class="kv-form-radio">
              <input
                  type="radio"
                  name="payment"
                  value="prepayment"
                  v-model="paymentType"
                  @change="changePaymentType">
              <span class="kv-form-radio__mark">
                <svg><use href="#kv-icons_form_radio"></use></svg>
              </span>
              <picture>
                <!--<source :srcset="require('@/assets/img/payment/payment_1.webp')" type="image/webp">-->
                <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_1.png')" alt="img">
              </picture>
              <div class="kv-payment-chb__title">Vorkasse</div>
            </label>
          </div>
        </div>
      </div>
      <!-- /item Vorkasse -->


      <!-- item Sofortüberweisung -->
      <!--
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source :srcset="require('@/assets/img/payment/payment_2.webp')" type="image/webp">
              <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_2.png')" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Sofortüberweisung</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment" value="Sofortuberweisung"  v-model="paymentType">
              <span class="kv-checkbox__box">
              <svg><use href="#kv-icons_check"></use></svg>
            </span>
            </label>
          </div>
        </div>
      </div>
      -->
      <!-- item Sofortüberweisung -->

      <!-- item Visa -->
      <!--
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source :srcset="require('@/assets/img/payment/payment_3.webp')" type="image/webp">
              <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_3.png')" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Visa</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment"  value="Visa"  v-model="paymentType">
              <span class="kv-checkbox__box">
              <svg><use href="#kv-icons_check"></use></svg>
            </span>
            </label>
          </div>
        </div>
      </div>
      -->
      <!-- /item Visa -->

    </div>


    <div class="kv-payment__col">

      <!-- item Kontoeinzug (SEPA Lastschrift) -->
      <div class="kv-payment__item"  v-if="isAllow('SEPA direct debit')">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <label class="kv-form-radio">
              <input
                  type="radio"
                  name="payment"
                  aria-label="payment"
                  value="SEPA direct debit"
                  v-model="paymentType"
                  @change="changePaymentType"
              >
              <span class="kv-form-radio__mark">
                <svg><use href="#kv-icons_form_radio"></use></svg>
              </span>
              <picture>
                <!--<source :srcset="require('@/assets/img/payment/payment_4.webp')">-->
                <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_4.png')" alt="img">
              </picture>
              <div class="kv-payment-chb__title">Kontoeinzug (SEPA Lastschrift)</div>
            </label>
          </div>
          <div class="kv-payment-chb__drop" :class="{
            'kv-payment-chb__drop_active': paymentType === 'SEPA direct debit'
          }">
            <input
                class="kv-payment-chb__input"
                :class="{
                  'kv-payment-chb__input_error': $v.iban.$error
                }"
                type="text"
                placeholder="IBAN"
                v-model.trim="$v.iban.$model"
                @input="isFormCorrect"
            >
            <input
                class="kv-payment-chb__input"
                :class="{
                  'kv-payment-chb__input_error': $v.bic.$error
                }"
                type="text"
                placeholder="BIC"
                v-model.trim="$v.bic.$model"
                @input="isFormCorrect"
            >
          </div>
        </div>
      </div>
      <!-- /item Kontoeinzug (SEPA Lastschrift) -->

      <!-- Mastercard -->
      <!--
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source :srcset="require('@/assets/img/payment/payment_5.webp')" type="image/webp">
              <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_5.png')" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Mastercard</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment"  value="Mastercard" v-model="paymentType">
              <span class="kv-checkbox__box">
              <svg><use href="#kv-icons_check"></use></svg>
            </span>
            </label>
          </div>
        </div>
      </div>
      -->
      <!-- /Mastercard -->

    </div>

  </div>
</template>

<script>
import { required, minLength} from 'vuelidate/lib/validators';
export default {
  name: "Step8",
  props: {
    paymentMethods: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      paymentType: null,
      iban: '',
      bic: ''
    }
  },
  validations: {
    iban: {
      required,
     minLength: minLength(5)
    },
    bic: {
      required,
      minLength: minLength(5)
    },
  },
  methods: {
    changePaymentType() {
      this.isFormCorrect()
      this.$emit('update:paymentType', this.paymentType);
    },
    changePaymentData() {
      this.$emit('update:paymentData', {
        iban: this.iban,
        bic: this.bic
      });
    },
    /**
     * Показывать ли текущий метод оплаты
     * @param method
     * @return {boolean}
     */
    isAllow(method) {
      return this.paymentMethods.some(_ => _.method === method)
    },
    /**
     * Валидация формы
     * @return {boolean}
     */
    isFormCorrect() {
      this.changePaymentData();

      let isValid = false;

      if (this.paymentType === "prepayment") {
        isValid = true
      }
      if (this.paymentType === "SEPA direct debit") {
        isValid = !this.$v.iban.$invalid && !this.$v.bic.$invalid
      }
      console.log('валидность ' + isValid);
      this.$emit('isValid', isValid)

      return isValid
    }
  },
  mounted() {
    this.$emit('active');
  }
}
</script>

<style scoped>
.kv-payment-chb__input_error {
  border: solid 1px var(--c-error);
}
</style>

