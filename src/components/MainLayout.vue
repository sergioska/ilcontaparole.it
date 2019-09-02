<template>
  <div>
    <b-container fluid>
      <b-row align-h="start">
        <b-col cols="11" sm="11" xs="12">
          <b-col cols="12" sm="3" xs="12" class="col-zero-px">
            <h1>Conta Parole</h1>
          </b-col>
          <b-col cols="12" sm="9" xs="12" class="col-zero-px">
            <vue-goodshare-facebook 
              page_url="https://sergioska.github.io/vue-word-counter"
              has_counter
              has_icon>
              </vue-goodshare-facebook>
            <vue-goodshare-linkedin
              page_url="https://sergioska.github.io/vue-word-counter"
              has_counter
              has_icon>
              </vue-goodshare-linkedin>
            <vue-goodshare-reddit
              page_url="https://sergioska.github.io/vue-word-counter"
              has_counter
              has_icon>
              </vue-goodshare-reddit>
            <vue-goodshare-twitter 
              page_url="https://sergioska.github.io/vue-word-counter"
              has_counter
              has_icon>
              </vue-goodshare-twitter>
          </b-col>
        </b-col>
        <b-col cols="1" sm="1" align-self="end" class="on-right-side">
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
.counter-facebook {
  color: white;
}
.counter-linkedin {
  color: white;
}
.counter-reddit {
  color: white;
}
.icon-facebook {
  color: white;
}
.icon-linkedin {
  color: white;
}
.icon-reddit {
  color: white;
}
.icon-twitter {
  color: white;
}
.col-zero-px {
  float:left;
  padding-left: 0px!important;
}
.on-right-side {
  padding-right: 0px!important;
}
.vertical {
  -moz-transform:rotate(-90deg);
  -ms-transform:rotate(-90deg);
  -o-transform:rotate(-90deg);
  -webkit-transform:rotate(-90deg);
  float: right!important;
}

@media only screen and (max-width: 767px) {
  .on-right-side {
    display: none;
  }
}
</style>

<script>

import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";
import VueGoodshareLinkedin from "vue-goodshare/src/providers/LinkedIn.vue";
import VueGoodshareReddit from "vue-goodshare/src/providers/Reddit.vue";
import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue";
import CharCounter from './CharCounter.vue';

export default {
  name: 'MainLayout',
  components: {
    VueGoodshareFacebook,
    VueGoodshareLinkedin,
    VueGoodshareReddit,
    VueGoodshareTwitter,
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
