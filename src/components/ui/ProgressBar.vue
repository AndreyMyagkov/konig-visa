<template>
  <div class="k-progress-bar__wr">
    <div class="k-progress-bar__value">{{ now }}%</div>
    <div class="k-progress" :class="`k-progress-${type}`">
      <div
          class="k-progress-bar"
          role="progressbar"
          :class="`bg-${type}`"
          :style="{width: now + '%'}"
          :aria-valuenow="now"
          aria-valuemin="0"
          aria-valuemax="100">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    now: {
      type: Number,
      required: true
    }

  }
};
</script>

<style scoped>
.k-progress-bar__wr {
  display: flex;
  justify-content: space-between;
}
.k-progress-bar__value {
  margin-right: 20px;
}
.k-progress-bar {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: var(--primary);
  transition: width 0.6s ease;
  border-radius: 16px;
  min-width: 14px;
  position: relative;
  left:-1px;
}
.k-progress-primary {
  border:solid 1px var(--primary);
}
.k-progress {
  display: -ms-flexbox;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #fff;
  border-radius: 1em;
  min-width: 100px;
}
@media (prefers-reduced-motion: reduce) {
  .k-app .k-progress-bar {
    transition: none;
  }
}
</style>
