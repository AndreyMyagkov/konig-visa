<template>
  <div class="kv-content__body">
    <div class="kv-form">


      <!-- Form card-->
      <div class="kv-form-card">

        <div class="kv-form__row kv-row kv-row_rev">

          <div class="kv-form__item-wrap kv-form__item-wrap_center kv-from__col_2">
            <div class="kv-form-title">Участник №1</div>
          </div>
        </div>

        <div class="kv-form__row kv-row kv-row_rev">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item kv-form__item_chb">
              <label class="kv-form-radio">
                <input type="radio" checked name="checked" aria-label="checkbox" required>
                <span class="kv-form-radio__mark">
                      <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Herr</span>
              </label>
              <label class="kv-form-radio">
                <input type="radio" name="checked" aria-label="checkbox" required>
                <span class="kv-form-radio__mark">
                  <svg><use href="img/icons/icons.svg#form_radio"></use></svg>
                </span>
                <span class="kv-form-radio__caption">Frau</span>
              </label>
            </div>
          </div>

          <div class="kv-col-plug"></div>
          <div class="kv-form__item-wrap kv-form__item-wrap_right kv-from__col">
            <div class="kv-form-title kv-form-title_hv">Удалить</div>
          </div>
        </div>

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder="" value="Ivanov" id="sname" name="sname" aria-label="password" required>
              <label class="kv-form__label" for="sname">Фамилия</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " value="Ivan" id="name" name="name" aria-label="password" required>
              <label class="kv-form__label" for="name">Имя</label>
            </div>
          </div>
        </div>

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " value="Germany" id="sname" name="sname" aria-label="password" required>
              <label class="kv-form__label" for="sname">Гражданство</label>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " value="Russia" id="name" name="name" aria-label="password" required>
              <label class="kv-form__label" for="name">Место жительства</label>
            </div>
          </div>
        </div>

        <div class="kv-form__row kv-row">
          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <select class="kv-form__sel" name="form[]" id="select" required>
                <option value="" selected="selected" label="Скидка"></option>
                <option value="2">option 1 Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Tempore consequatur, minima nesciunt aspernatur ipsam maxime fugit
                facilis vitae non nisi! Perferendis autem natus suscipit vel expedita quos
                dolore explicabo quia!</option>
                <option value="3">option 2</option>
                <option value="4">option 3</option>
                <option value="5">option 4</option>
                <option value="6">option 5</option>
              </select>
              <svg class="kv-form__sel-arrow">
                <use href="img/icons/icons.svg#select"></use>
              </svg>
            </div>
          </div>

          <div class="kv-form__item-wrap kv-from__col">
            <div class="kv-form__item">
              <input type="text" placeholder=" " value="Дата рождения" id="name" name="name" aria-label="password" required>
              <label class="kv-form__label" for="name">11.02.2010</label>
            </div>
          </div>
        </div>
      </div>
      <!-- Form card-->

      <div class="kv-add">
        <svg><use href="img/icons/icons.svg#plus"></use></svg>
        Добавить туриста
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Step3"
}
</script>

<style scoped>

</style>
