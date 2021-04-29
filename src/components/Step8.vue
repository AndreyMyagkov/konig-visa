<template>
  <div class="kv-content__body kv-payment">
    <div class="kv-payment__col">

      <!-- item Vorkasse -->
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <!--<source :srcset="require('@/assets/img/payment/payment_1.webp')" type="image/webp">-->
              <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_1.png')" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Vorkasse</div>
            <label class="kv-payment-chb__item">
              <input
                  type="radio"
                  name="payment"
                  value="Vorkasse"
                  v-model="paymentType"
                  @change="changePaymentType">
              <span class="kv-checkbox__box">
              <svg><use href="#kv-icons_check"></use></svg>
            </span>
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
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <!--<source :srcset="require('@/assets/img/payment/payment_4.webp')">-->
              <img class="kv-payment-chb__icon" :src="require('@/assets/img/payment/payment_4.png')" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Kontoeinzug (SEPA Lastschrift)</div>
            <label class="kv-payment-chb__item">
              <input
                  type="radio"
                  name="payment"
                  aria-label="payment"
                  value="Kontoeinzug"
                  v-model="paymentType"
                  @change="changePaymentType"
              >
              <span class="kv-checkbox__box">
              <svg><use href="#kv-icons_check"></use></svg>
            </span>
            </label>
          </div>
          <div class="kv-payment-chb__drop" :class="{
            'kv-payment-chb__drop_active': paymentType === 'Kontoeinzug'
          }">
            <input
                class="kv-payment-chb__input"
                type="text"
                placeholder="IBAN"
                v-model="iban"
                @input="changePaymentData"
            >
            <input
                class="kv-payment-chb__input"
                type="text"
                placeholder="BIC"
                v-model="bic"
                @input="changePaymentData"
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
export default {
  name: "Step8",
  data() {
    return {
      paymentType: null,
      iban: '',
      bic: ''
    }
  },
  methods: {
    changePaymentType() {
      this.$emit('update:paymentType', this.paymentType);
    },
    changePaymentData() {
      this.$emit('update:paymentData', {
        iban: this.iban,
        bic: this.bic
      });
    }
  }
}
</script>

