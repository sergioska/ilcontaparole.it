<template>
  <div contenteditable="true"
    v-once
    v-html="value"
    @input="updateHTML"
    @keydown="keyAction"
    @paste="onPaste"
    class="txtArea"
    data-text="use ctrl+v (cmd+v mac) to paste a text here"></div>
</template>

<style>
.txtArea {
  margin-top: 5px;
  padding: 5px 2px 5px 3px;
  height: 500px;
  border: 2px solid lightgrey;
  border-radius: 0.25rem;
  max-height: 500px;
  overflow-y: auto;
  white-space: nowrap!important;
  word-wrap: break-word!important;
  line-height: 27px;
}
span {
  white-space: nowrap!important;
  word-wrap: break-word!important;
}
[contentEditable=true]:empty:not(:focus):before{
    content:attr(data-text)
}
</style>

<script>

export default {
  name: 'HtmlTextarea',
  props: ['value'],
  mounted() {
    this.$el.innerHTML = this.value;
  },
  data() {
    return {
      textUtils: {},
      dc: {},
    };
  },
  methods: {
    updateHTML(e) {
      const html = e.target.innerHTML;
      this.$emit('input', html);
    },
    onPaste(e) {
      e.preventDefault();
      e.stopPropagation();
      let paste = (e.clipboardData || window.clipboardData).getData('text/plain');
      paste = paste.replace(/<[^>]*>/g, ' ');
      paste = paste.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      this.$el.innerHTML += paste;
      this.$emit('input', this.$el.innerHTML);
      this.$emit('colorize');
    },
    colorize(txt) {
      this.$el.innerHTML = txt;
    },
    keyAction(e) {
      if (e.code !== 'KeyV') {
        e.preventDefault();
        e.stopPropagation();
      } else {
        return true;
      }
    }
  },
};

</script>
