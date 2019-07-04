<template>
  <div>
    <b-container fluid>
      <b-row align-h="start">
        <b-col cols="11">
          <h1>Conta Parole</h1>
        </b-col>
        <b-col cols="1" sm="1" align-self="end">
          <b-button class="vertical" @click="split">{{ splitButton }}</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col v-bind:class="nCols">
          <char-counter></char-counter>
        </b-col>
        <b-col v-bind:class="nCols" v-show="splitButton == 'unsplit'">
          <char-counter></char-counter>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.vertical {
  -moz-transform:rotate(-90deg);
  -ms-transform:rotate(-90deg);
  -o-transform:rotate(-90deg);
  -webkit-transform:rotate(-90deg);
  float: right!important;
}
</style>

<script>

import CharCounter from './CharCounter.vue';

export default {
  name: 'MainLayout',
  components: {
    CharCounter,
  },
  data() {
    return {
      nCols: 'col-sm-12',
      splitButton: 'split',
    };
  },
  methods: {
    split() {
      if (this.nCols === 'col-sm-12') {
        this.nCols = 'col-sm-6';
        this.splitButton = 'unsplit';
      } else {
        this.nCols = 'col-sm-12';
        this.splitButton = 'split';
      }
    },
  },
};

</script>
