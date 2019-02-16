<template>
  <div>
      <b-container fluid>
        <b-row align-h="start">
          <b-col cols="6">
            <h1>Conta Caratteri</h1>
          </b-col>
          <b-col align-v="end">
            <b-button @click="colorize">colorize</b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <b-row>
          <b-col sm="10">
            <!--
            <b-form-textarea v-model="txtAreaContent"
              :rows="20"
              :max-rows="20"></b-form-textarea>
            -->
            <html-textarea v-model="txtAreaContent" ref="childComponent"></html-textarea>
          </b-col>
          <b-col sm="2">
            <b-row class="resume">
              <b-badge class="center">{{ charsCounter }}</b-badge>&nbsp;&nbsp;caratteri
            </b-row>
            <b-row class="resume">
              <b-badge class="center">{{ wordsCounterTotal }}</b-badge>&nbsp;&nbsp;parole
            </b-row>
            <b-row v-for="(item, index) in wordsList"
                   v-bind:key="item.word"
                   v-if="index <= 15"
                   class="resume">
              <b-badge class="center">{{ item.numb }} ({{ item.perc }} %) </b-badge>
                &nbsp;&nbsp;{{ item.word }}
            </b-row>
          </b-col>
        </b-row>
        <b-row>&nbsp;</b-row>
        <b-row>
          <b-col sm="3">
            <b-form-input v-model="txtKeyword"
                    type="text"
                    placeholder="Enter your keyword"></b-form-input>
          </b-col>
          <b-col sm="9">
            <b-badge class="center">{{ subwordCounter }}</b-badge>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<style>
.resume {
  padding: 2px;
}
.center {
  margin: 3px;
}
mark {
  border-radius: 3px;
  color: red;
  background-color: #b1d5e5;
}
</style>

<script>

import WordProcessor from '../utils/WordProcessor';
import HtmlTextarea from './HtmlTextarea.vue';

export default {
  name: 'CharCounter',
  components: {
    HtmlTextarea,
  },
  data() {
    return {
      txtAreaContent: '',
      txtKeyword: '',
    };
  },
  computed: {
    charsCounter() {
      const content = WordProcessor.sanitize(this.txtAreaContent);
      const chars = content.length;
      return chars;
    },
    wordsCounterTotal() {
      const content = this.txtAreaContent;
      const words = content.split(' ').length;
      return words;
    },
    wordsList() {
      const wp = new WordProcessor();
      wp.wordsCounter = WordProcessor.sanitize(this.txtAreaContent);
      return wp.wordsCounter;
    },
    subwordCounter() {
      return WordProcessor.subCount(WordProcessor.sanitize(this.txtAreaContent), this.txtKeyword);
    },
  },
  methods: {
    colorize() {
      this.txtAreaContent = this.txtAreaContent.replace(/[m|M]ela/g, '<mark>$&</mark>');
      this.$refs.childComponent.colorize(this.txtAreaContent);
    },
    strip_html_tags(str) {
      let content = '';
      content = str.toString();
      return content.replace(/<[^>]*>/g, ' ');
    },
  },
};
</script>
