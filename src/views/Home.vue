<template>
  <div class="home">
    <char-counter></char-counter>
  </div>
</template>

<script>

import CharCounter from '../components/CharCounter.vue';

export default {
  name: 'home',
  components: {
    CharCounter,
  },
};
</script>
