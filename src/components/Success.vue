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
        {{ $lng('success.thanks') }}
      </div>
      <div class="kv-result__subtitle kv-text-center kv-text-uppercase kv-text-bold">
        {{ $lng('success.forOrder') }}
      </div>
      <div class="kv-result__maintext kv-text-center">
        <p>{{ $lng('success.yourOrder') }} <b>№ {{order}}</b> {{ $lng('success.orderProcessing') }}</p>

        <p>{{ $lng('success.statusText') }} <a href="#">{{ $lng('success.cabinet') }}</a></p>
      </div>

      <div class="kv-result__text kv-user-text" v-html="$lng('success.bottomText')"></div>
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
