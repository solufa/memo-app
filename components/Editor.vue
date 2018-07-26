<template>
  <textarea class="text" @input="onInput" :value="text"/>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onInput(e) {
      // 連想配列にせず直接文字を送るように少々書き換えた
      this.$emit('input', e.target.value);
    },
  },
}
</script>

<style scoped>
.text {
  width: 100%;
  height: 250px;
  background: transparent;
  color: #fff;
  font-size: 20px;
  border: none;
  outline: none;
  padding: 15px;
}
</style>
