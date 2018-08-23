<template>
  <textarea
    class="text"
    @input="onInput"
    :value="text"
    spellcheck="false"
    :style="`bottom: ${colorHeight}px`"
  />
</template>

<script>
export default {
  props: ['text', 'colorHeight'],
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
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  display: block;
  background: transparent;
  color: #fff;
  font-size: 20px;
  border: none;
  outline: none;
  box-sizing: border-box;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  resize: none;
}
</style>
