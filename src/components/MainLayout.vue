<template>
  <div>
    <b-container fluid>
      <b-row align-h="start">
        <b-col cols="11">
          <h1>Conta Caratteri</h1>
        </b-col>
        <b-col cols="1">
          <b-button @click="split">{{ splitButton }}</b-button>
        </b-col>
      </b-row>
    </b-container>
    <Split>
      <SplitArea :size="nSize">
        <char-counter></char-counter>
      </SplitArea>
      <SplitArea :size="nSize" v-show="nSize == 50">
        <char-counter></char-counter>
      </SplitArea>
    </Split>
  </div>
</template>

<script>

import CharCounter from './CharCounter.vue';

export default {
  name: 'MainLayout',
  components: {
    CharCounter,
  },
  data() {
    return {
      nSize: 100,
      splitButton: 'split',
    };
  },
  methods: {
    split() {
      if (this.nSize === 100) {
        this.nSize = 50;
        this.splitButton = 'unsplit';
      } else {
        this.nSize = 100;
        this.splitButton = 'split';
      }
    },
  },
};

</script>
