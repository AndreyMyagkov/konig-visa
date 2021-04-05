<template>
  <div class="kv-content__body kv-payment">
    <div class="kv-payment__col">
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source srcset="/img/payment/payment_1.webp" type="image/webp">
              <img class="kv-payment-chb__icon" src="/img/payment/payment_1.png" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Vorkasse</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment" required>
              <span class="kv-checkbox__box">
              <svg>
                <use href="img/icons/icons.svg#check"></use>
              </svg>
            </span>
            </label>
          </div>
          <div class="kv-payment-chb__drop">
            <input class="kv-payment-chb__input" type="text" name="payment" placeholder="IBAN">
            <input class="kv-payment-chb__input" type="text" name="payment" placeholder="IBAN">
          </div>
        </div>
      </div>
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source srcset="img/payment/payment_2.webp" type="image/webp">
              <img class="kv-payment-chb__icon" src="img/payment/payment_2.png" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Sofortüberweisung</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment" required>
              <span class="kv-checkbox__box">
              <svg>
                <use href="img/icons/icons.svg#check"></use>
              </svg>
            </span>
            </label>
          </div>
          <div class="kv-payment-chb__drop"> <input class="kv-payment-chb__input" type="text" name="payment"
                                                    placeholder="IBAN"> <input class="kv-payment-chb__input" type="text" name="payment"
                                                                               placeholder="IBAN"> </div>
        </div>
      </div>
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source srcset="img/payment/payment_3.webp" type="image/webp">
              <img class="kv-payment-chb__icon" src="img/payment/payment_3.png" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Visa</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment" required>
              <span class="kv-checkbox__box">
              <svg>
                <use href="img/icons/icons.svg#check"></use>
              </svg>
            </span>
            </label>
          </div>
          <div class="kv-payment-chb__drop"> <input class="kv-payment-chb__input" type="text" name="payment"
                                                    placeholder="IBAN"> <input class="kv-payment-chb__input" type="text" name="payment"
                                                                               placeholder="IBAN"> </div>
        </div>
      </div>
    </div>
    <div class="kv-payment__col">
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source srcset="img/payment/payment_1.webp" type="image/webp">
              <img class="kv-payment-chb__icon" src="img/payment/payment_1.png" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Kontoeinzug (SEPA Lastschrift)</div>
            <label
                class="kv-payment-chb__item">
              <input type="radio" checked name="payment" aria-label="payment"
                     required>
              <span class="kv-checkbox__box">
              <svg>
                <use href="img/icons/icons.svg#check"></use>
              </svg>
            </span>
            </label>
          </div>
          <div class="kv-payment-chb__drop kv-payment-chb__drop_active"> <input class="kv-payment-chb__input"
                                                                                type="text" name="payment" placeholder="IBAN"> <input class="kv-payment-chb__input" type="text"
                                                                                                                                      name="payment" placeholder="IBAN"> </div>
        </div>
      </div>
      <div class="kv-payment__item">
        <div class="kv-payment-chb">
          <div class="kv-payment-chb__top">
            <picture>
              <source srcset="img/payment/payment_2.webp" type="image/webp">
              <img class="kv-payment-chb__icon" src="img/payment/payment_2.png" alt="img">
            </picture>
            <div class="kv-payment-chb__title">Mastercard</div>
            <label class="kv-payment-chb__item">
              <input type="radio" name="payment" aria-label="payment" required>
              <span class="kv-checkbox__box">
              <svg>
                <use href="img/icons/icons.svg#check"></use>
              </svg>
            </span>
            </label>
          </div>
          <div class="kv-payment-chb__drop"> <input class="kv-payment-chb__input" type="text" name="payment"
                                                    placeholder="IBAN"> <input class="kv-payment-chb__input" type="text" name="payment"
                                                                               placeholder="IBAN"> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Step8"
}
</script>

<style scoped>

</style>
