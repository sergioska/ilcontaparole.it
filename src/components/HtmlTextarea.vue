<template>
  <div contenteditable="true"
    v-once
    v-html="value"
    @input="updateHTML"
    class="txtArea"></div>
</template>

<style>
.txtArea {
  height: 500px;
  border: 1px solid lightgrey;
  max-height: 500px;
  overflow-y: auto;
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
      this.$emit('input', e.target.innerHTML);
    },
    colorize(txt) {
      this.$el.innerHTML = txt;
    },
  },
};

</script>
