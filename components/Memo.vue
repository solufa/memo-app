<template>
  <!-- z-indexとbackground-colorを追加した -->
  <div
    class="memo"
    :style="`
      top: ${data.top}px;
      left: ${data.left}px;
      z-index: ${data.zIndex};
      background-color: ${$store.state.colorList[data.colorIndex]};
    `"
    @mousedown="putForward(data.id)"
  >
    <div class="handle" @mousedown="$emit('start', $event)"/>

    <!-- 閉じるボタンを追加した -->
    <span class="close" @click="$store.commit('removeMemo', data.id)">X</span>

    <!-- Editorはシンプルな機能のコンポーネントなのでstoreに関与させずpropsと$emitで値を受け渡しする -->
    <Editor :text="data.text" @input="onInput"/>
  </div>
</template>

<script>
import Editor from './Editor';

export default {
  components: {
    Editor,
  },
  props: ['data'], // dataにまとめたので注意
  methods: {
    onInput(text) {
      // 課題：現状だと文字は入力できるが、値が保存されないのでリロードすると消える
    },
    putForward(id) {
      // 課題：該当のメモのzIndexをmemoData配列の中の最大+1にして前面に出したい
      // pages/index.vue > methods.onMoveを参考に、getMemoByIdを使うこと
    },
  },
};
</script>

<style scoped>
.memo {
  position: absolute;
  top: 20px;
  width: 200px;
  height: 300px;
}

.handle {
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  cursor: move;
}

.close {
  color: #fff;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}
</style>
