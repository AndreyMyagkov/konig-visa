<template>
  <!-- Success Page-->
  <div class="kv-content">
    <div class="kv-result kv-success">
      <div class="kv-result__main-icon kv-text-center">
        <svg>
          <use href="#kv-icons_check-success"></use>
        </svg>
      </div>
      <div class="kv-result__title kv-text-center kv-text-uppercase kv-text-bold">
        Спасибо</div>
      <div class="kv-result__subtitle kv-text-center kv-text-uppercase kv-text-bold">
        за Вашу заявку</div>
      <div class="kv-result__maintext kv-text-center">
        <p>Ваша заявка <b>№ {{order}} </b>принята в обработку, мы свяжемся с Вами в
          ближайшее время!</p>
        <p>Статус заказа можно отследить в <a href="#">Личном кабинете</a>
        </p>
      </div>
      <div class="kv-result__text">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          commodi ipsam natus earum id fuga esse deleniti soluta assumenda libero,
          doloribus, molestiae explicabo accusamus quasi impedit asperiores
          aperiam placeat accusantium.</p>
        <p>Dolor sit amet consectetur adipisicing elit. Consequuntur commodi ipsam
          natus earum id fuga esse deleniti soluta assumenda libero, doloribus,
          molestiae explicabo accusamus quasi impedit asperiores aperiam placeat
          accusantium.</p>
        <p>Amet consectetur adipisicing elit. Consequuntur commodi ipsam natus earum
          id fuga esse deleniti soluta assumenda libero, doloribus, molestiae
          explicabo accusamus quasi impedit asperiores aperiam placeat
          accusantium.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: {
    order: {}
  }
}
</script>

<style scoped>

</style>
