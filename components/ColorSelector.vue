<template>
  <div class="container">
    <!-- 何番目のボックスがクリックされたかという情報(index)だけを親に渡せば良い -->
    <div
      v-for="(color, index) in colorList"
      :key="color"
      :style="`
        background-color: ${color};
        width: ${100 / colorList.length}%;
        border-color: ${index === colorIndex ? '#fff' : color};
      `"
      @click="$emit('changeColor', index)"
    />
  </div>
</template>

<script>
// 全色分のボックス生成のためのcolorList,、選択中の枠を白くするためのcolorIndex
export default {
  props: ['colorList', 'colorIndex'],
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
}

.container > div {
  height: 40px;
  display: inline-block;
  box-sizing: border-box;
  border: 4px solid;
  cursor: pointer;
}
</style>
