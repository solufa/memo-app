<template>
  <div class="color-frame">
    <!-- 何番目のボックスがクリックされたかという情報(index)だけを親に渡せば良い -->
    <div
      class="color-box"
      v-for="(color, index) in colorList"
      :key="color"
      :style="`
        background-color: ${color};
        width: ${100 / colorList.length}%;
        border-color: ${index === colorIndex ? '#fff' : color};
      `"
      @click="$emit('changeColor', index)"
    >
      <div/>
    </div>
  </div>
</template>

<script>
// 全色分のボックス生成のためのcolorList,、選択中の枠を白くするためのcolorIndex
export default {
  props: ['colorList', 'colorIndex'],
}
</script>

<style scoped>
.color-frame {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.color-box {
  display: inline-block;
  box-sizing: border-box;
  border: 4px solid;
  cursor: pointer;
  vertical-align: bottom;
}

.color-box > div {
  padding-top: 100%;
}
</style>
