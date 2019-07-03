<template>
  <div>
      <b-container fluid>
        <b-row align-h="start">
              <b-col cols="3" sm="3" xs="3">
                <switches v-model="color" @input="colorize" theme="bulma" color="green" label="colorize" type-bold="true" :disabled="colorizeDisabled"></switches>
              </b-col>
              <b-col cols="3" sm="1" xs="3">
                <switches v-model="multiTextX1" theme="default" color="red" label="x1" type-bold="true"></switches>
              </b-col>
              <b-col cols="3" sm="1" xs="3">
                <switches v-model="multiTextX2" theme="default" color="red" label="x2" type-bold="true"></switches>
              </b-col>
              <b-col cols="3" sm="1" xs="3">
                <switches v-model="multiTextX3" theme="default" color="red" label="x3" type-bold="true"></switches>
              </b-col>
              <b-col cols="6" sm="1" xs="6">
                <switches v-model="stopOptionSelector" theme="default" color="orange" label="stop words" type-bold="true"></switches>
              </b-col>
              <b-col cols="6" sm="2" xs="6">
                <b-form-select v-model="selector" :options="options" class="fix-select-component" :disabled="stopOptionDisabled"></b-form-select>
              </b-col>
              <b-col sm="3" xs="hidden">
              </b-col>
            </b-row>
        </b-row>
      </b-container>
      <b-container fluid>
        <b-row>
          <b-col sm="9">
            <html-textarea v-model="txtAreaContent"
              ref="childComponent"></html-textarea>
          </b-col>
          <b-col sm="3">
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
                &nbsp;&nbsp;<span v-on:click="oneWordHighlighter(item.word)">{{ item.word }}</span>
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
.single-check-selection {
  background-color: #c87777!important;
}
.fix-select-component {
    vertical-align: middle;
    margin-top: 19px;
}
</style>

<script>

import Switches from 'vue-switches';
import WordProcessor from '../utils/WordProcessor';
import HtmlTextarea from './HtmlTextarea.vue';

export default {
  name: 'CharCounter',
  components: {
    HtmlTextarea,
    Switches,
  },
  data() {
    return {
      txtAreaContent: '',
      txtKeyword: '',
      markColor: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'],
      color: false,
      originTextArea: '',
      x1: true,
      x2: false,
      x3: false,
      multiple: 1,
      stopUpdateWordList: false,
      colorizeDisabled: false,
      stopOption: true,
      stopOptionDisabled: false,
      selected: 'it',
      options: [
        { value: 'it', text: 'it' },
        { value: 'en', text: 'en' },
      ]
    };
  },
  computed: {
    multiTextX1: {
      get: function() {
        return this.x1;
      },
      set: function(value) {
        if (value === true) {
          this.x1 = true;
          this.x2 = false;
          this.x3 = false;
          this.color = true;
          this.colorizeDisabled = false;
          this.multiple = 1;
          this.txtAreaContent = this.originTextArea;
          this.colorize();
        }
      },
    },
    multiTextX2: {
      get: function() {
        return this.x2;
      },
      set: function(value) {
        if (value === true) {
          this.x1 = false;
          this.x2 = true;
          this.x3 = false;
          this.color = false;
          this.colorizeDisabled = true;
          this.multiple = 2;
          this.txtAreaContent = this.originTextArea;
          this.colorize();
        }
      },
    },
    multiTextX3: {
      get: function() {
        return this.x3;
      },
      set: function(value) {
        if (value === true) {
          this.x1 = false;
          this.x2 = false;
          this.x3 = true;
          this.color = false;
          this.colorizeDisabled = true;
          this.multiple = 3;
          this.txtAreaContent = this.originTextArea;
          this.colorize();
        }
      },
    },
    stopOptionSelector: {
      get: function() {
        return this.stopOption;
      },
      set: function(value) {
        if (!value) {
          this.stopOptionDisabled = true;
        } else {
          this.stopOptionDisabled = false;
        }
        this.stopOption = value;
        this.txtAreaContent = this.originTextArea;
        this.colorize();
      },
    },
    selector: {
      get: function() {
        return this.selected;
      },
      set: function(value) {
        this.selected = value;
        this.txtAreaContent = this.originTextArea;
        this.colorize();
      },
    },
    charsCounter() {
      const content = WordProcessor.sanitizeChars(this.txtAreaContent);
      const chars = content.length;
      return chars;
    },
    wordsCounterTotal() {
      if (this.txtAreaContent === '') {
        return 0;
      }
      const content = this.originTextArea;
      let word = content;
      word = WordProcessor.sanitize(word);
      word = word.trim().split(/[\s]+/);
      const words = word.length;
      return words;
    },
    wordsList() {
      let stop;
      if (this.stopOptionSelector) {
        stop = this.selector;
        console.log(stop);
      }
      const wp = new WordProcessor(this.multiple, stop);
      if (!this.stopUpdateWordList) {
        wp.wordsCounter = this.txtAreaContent;
      } else {
        wp.wordsCounter = this.originTextArea;
      }
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
      return WordProcessor.subCount(this.txtAreaContent, this.txtKeyword);
    },
  },
  mounted() {
    this.color = false;
    this.$refs.childComponent.$on('colorize', this.eventHandler);
  },
  methods: {
    oneWordHighlighter(value) {
      let output = this.originTextArea;
      const aWords = value.split(" ");
      const pattern = `\\b${aWords[0]}\\s(\\w+\\s){0,}${aWords[1]}\\b`;
      const regex = new RegExp(pattern, 'gi');
      const strMark = `<mark class="single-check-selection">$&</mark>`;
      output = output.replace(regex, strMark);
      this.txtAreaContent = output;
      this.color = false;
      this.stopUpdateWordList = true;
      this.$refs.childComponent.colorize(this.txtAreaContent);
    },
    colorize() {
      if (this.color === true) {
        if (this.wordsList.length > 0) {
          this.originTextArea = this.txtAreaContent;
          this.txtAreaContent = this.colorOnText(this.wordsList, this.txtAreaContent);
        }
      } else {
        this.color = false;
        this.txtAreaContent = this.originTextArea;
      }
      this.$refs.childComponent.colorize(this.txtAreaContent);
    },
    colorOnText(aWordList, sContent) {
      console.log("COLORONTEXT");
      let output = sContent;
      let j = 0;
      let limit = aWordList.length;
      if (limit < 15) {
        limit = aWordList.length;
      } else {
        limit = 15;
      }
      for (let i = 0; i < limit; i += 1) {
        aWordList[i].word = aWordList[i].word.trim();
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
    eventHandler() {
      this.color = true;
      this.colorize();
    },
  },
};
</script>
