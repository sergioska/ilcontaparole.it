<template>
  <div contenteditable="true"
    v-once
    v-html="value"
    @input="updateHTML"
    @paste="onPaste"
    class="txtArea"></div>
</template>

<style>
.txtArea {
  padding: 5px 2px 5px 5px;
  height: 500px;
  border: 1px solid lightgrey;
  max-height: 500px;
  overflow-y: auto;
  white-space: nowrap!important;
}
span {
  white-space: nowrap!important;
}
</style>

<script>

export default {
  name: 'HtmlTextarea',
  props: ['value'],
  mounted() {
    this.$el.innerHTML = this.value;
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
      paste = paste.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      const selection = window.getSelection();
      this.$el.innerHTML += paste;
      this.$emit('input', this.$el.innerHTML);
    },
    colorize(txt) {
      this.$el.innerHTML = txt;
    },
  },
};

</script>
