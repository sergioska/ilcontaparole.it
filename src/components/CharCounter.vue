<template>
  <div>
      <b-container fluid>
        <b-row align-h="start">
          <b-col align-v="end">
            <b-button @click="colorize">colorize</b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <b-row>
          <b-col sm="10">
            <html-textarea v-model="txtAreaContent"
              ref="childComponent"></html-textarea>
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
              <b-badge class="center"
                       v-bind:class="item.color">{{ item.numb }} ({{ item.perc }} %) </b-badge>
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
  padding: 1px 3px 1px 3px!important;
  margin: 3px 1px 3px 1px!important;
  color: white;
}
.c1 {
  background-color: #006400!important;
}
.c2 {
  background-color: #008000!important;
}
.c3 {
  background-color: #228B22!important;
}
.c4 {
  background-color: #2E8B57!important;
}
.c5 {
  background-color: #3CB371!important;
}
.c6 {
  background-color: #00FF7F!important;
}
.c7 {
  background-color: #00FA9A!important;
}
.c8 {
  background-color: #90EE90!important;
}
.c9 {
  background-color: #9ACD32!important;
}
.c10 {
  background-color: #98FB98!important;
}
.c11 {
  background-color: #32CD32!important;
}
.c12 {
  background-color: #00FF00!important;
}
.c13 {
  background-color: #7CFC00!important;
}
.c14 {
  background-color: #7FFF00!important;
}
.c15 {
  background-color: #ADFF2F!important;
}
.c16 {
  background-color: #ADFF2F!important;
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
      markColor: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'],
      color: false,
    };
  },
  computed: {
    charsCounter() {
      const content = WordProcessor.sanitizeChars(this.txtAreaContent);
      const chars = content.length;
      return chars;
    },
    wordsCounterTotal() {
      if (this.txtAreaContent === '') {
        return 0;
      }
      const content = this.txtAreaContent;
      const words = content.split(' ').length;
      return words;
    },
    wordsList() {
      const wp = new WordProcessor();
      wp.wordsCounter = WordProcessor.sanitize(this.txtAreaContent);
      if (wp.wordsCounter.length > 0 && this.color === true) {
        wp.wordsCounter.map((item, index) => {
          item.color = this.markColor[index];
          return item;
        }, this);
      }
      return wp.wordsCounter;
    },
    subwordCounter() {
      if (this.txtKeyword === '') {
        return 0;
      }
      return WordProcessor.subCount(WordProcessor.sanitize(this.txtAreaContent), this.txtKeyword);
    },
  },
  methods: {
    colorize() {
      this.color = true;
      this.txtAreaContent = this.colorOnText(this.wordsList, this.txtAreaContent);
      console.log(this.txtAreaContent);
      this.$refs.childComponent.colorize(this.txtAreaContent);
    },
    colorOnText(aWordList, sContent) {
      let output = sContent;
      let j = 0;
      let limit = aWordList.length;
      if (limit < 15) {
        limit = aWordList.length;
      } else {
        limit = 15;
      }
      for (let i = 0; i < limit; i += 1) {
        const firstLetter = aWordList[i].word.substr(0, 1);
        const restWord = aWordList[i].word.substr(1);
        const regex = new RegExp(`\\b[${firstLetter.toLowerCase()}|${firstLetter.toUpperCase()}]${restWord}\\b`, 'g');
        const color = this.markColor[j];
        const strMark = `<mark class="${color}">$&</mark>`;
        output = output.replace(regex, strMark);
        if (j >= this.markColor.length) {
          j = 0;
        } else {
          j += 1;
        }
      }
      return output;
    },
  },
};
</script>
