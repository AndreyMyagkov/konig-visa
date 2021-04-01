<template>
  <div class="kv-content__body">
    <div class="kv-form">

      <!-- Form card-->
      <div class="kv-form-card kv-form-card_dis">
        <!-- From row-->
        <div class="kv-row kv-form__row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="checkbox" checked name="company" aria-label="company" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_chb"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Фирма</span> </label>
            </div>
          </div>

          <div class="kv-col-plug"></div>
          <div class="kv-col-plug"></div>
        </div>

        <!-- From row-->
        <div class="kv-row kv-form__row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="radio" checked name="gender" aria-label="Herr" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Herr</span>
              </label>

              <label class="kv-form-radio">
                <input type="radio" name="gender" aria-label="Frau" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Frau</span>
              </label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="sname1" name="sname1" aria-label="password" required>
              <label class="kv-form__label" for="sname1">Фамилия</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="name1" name="name1" aria-label="password" required>
              <label class="kv-form__label" for="name1">Имя</label>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="address1" name="address1" aria-label="address" required>
              <label class="kv-form__label" for="address1">Адресс</label>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="index1" name="index1" aria-label="index" required>
              <label class="kv-form__label" for="index1">Индекс</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="city1" name="city1" aria-label="city" required>
              <label class="kv-form__label" for="city1">Город</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="country1" name="country1" aria-label="country" required>
              <label class="kv-form__label" for="country1">Страна</label>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="tel" placeholder=" " id="phone1" name="phone1" aria-label="phone" required>
              <label class="kv-form__label" for="phone1">Телефон</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="tel" placeholder=" " id="cellphone1" name="cellphone1" aria-label="cellphone" required>
              <label class="kv-form__label" for="cellphone1">Мобильный телефон</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="email" placeholder=" " id="email1" name="email1" aria-label="email" required>
              <label class="kv-form__label" for="email1">email</label>
            </div>
          </div>
        </div>
      </div>
      <!-- Form card-->

      <div class="kv-form-card">
        <div class="kv-form__header">
          <!-- From row-->
          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-form__item-wrap_center kv-from__col">
              <div class="kv-form-title">Lieferanschrift</div>
            </div>
          </div>
          <!-- From row-->

          <div class="kv-form__row kv-row">
            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb">
                <label class="kv-form-radio">
                  <input type="radio" name="company2" aria-label="company" required>
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Lieferanschrift entspricht Auftraggeber</span>
                </label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb kv-form__item_border">
                <label class="kv-form-radio"> <input type="radio" checked name="company2" aria-label="company" required>
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">abweichende Lieferanschrift</span>
                </label>
              </div>
            </div>

            <div class="kv-form__item-wrap kv-from__col">
              <div class="kv-form__item kv-form__item_chb">
                <label class="kv-form-radio">
                  <input type="radio" name="company2" aria-label="company" required>
                  <span class="kv-form-radio__mark">
                    <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                  </span>
                  <span class="kv-form-radio__caption">Abholen</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-row kv-form__row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="checkbox" name="company3" aria-label="company" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_chb"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Фирма</span>
              </label>
            </div>
          </div>

          <div class="kv-col-plug"></div>
          <div class="kv-col-plug"></div>
        </div>
        <!-- From row-->

        <div class="kv-row kv-form__row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="radio" checked name="gender2" aria-label="Herr" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Herr</span>
              </label>
              <label class="kv-form-radio">
                <input type="radio" name="gender2" aria-label="Frau" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Frau</span>
              </label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="sname2" name="sname2" aria-label="password" required>
              <label class="kv-form__label" for="sname2">Фамилия</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="name2" name="name2" aria-label="password" required>
              <label class="kv-form__label" for="name2">Имя</label>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="address2" name="address2" aria-label="address" required>
              <label class="kv-form__label" for="address2">Адресс</label>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="index2" name="index2" aria-label="index" required>
              <label class="kv-form__label" for="index2">Индекс</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="city2" name="city2" aria-label="city" required>
              <label class="kv-form__label" for="city2">Город</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " id="country2" name="country2" aria-label="country" required>
              <label class="kv-form__label" for="country2">Страна</label>
            </div>
          </div>
        </div>
        <!-- From row-->

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="tel" placeholder=" " id="phone2" name="phone2" aria-label="phone" required>
              <label class="kv-form__label" for="phone2">Телефон</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="tel" placeholder=" " id="cellphone2" name="cellphone2" aria-label="cellphone" required>
              <label class="kv-form__label" for="cellphone2">Мобильный телефон</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="email" placeholder=" " id="email2" name="email2" aria-label="email" required>
              <label class="kv-form__label" for="email2">email</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Step5"
}
</script>

<style scoped>

</style>
