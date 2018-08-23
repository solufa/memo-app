<template>
  <!-- z-indexとbackground-colorを追加した -->
  <div
    class="memo"
    :style="`
      top: ${data.top}px;
      left: ${data.left}px;
      width: ${width}px;
      height: ${height}px;
      z-index: ${data.zIndex};
      background-color: ${$store.state.colorList[data.colorIndex]};
    `"
    @mousedown="putForward"
  >
    <div class="handle" @mousedown="$emit('start', $event)"/>

    <!-- 閉じるボタンを追加した -->
    <span class="trash" @click="$store.dispatch('removeMemo', data.id)">X</span>

    <!-- Editorはシンプルな機能のコンポーネントなのでstoreに関与させずpropsと$emitで値を受け渡しする -->
    <Editor :text="data.text" @input="onInput" :colorHeight="width / $store.state.colorList.length"/>
    <ColorSelector
      :colorList="$store.state.colorList"
      :colorIndex="data.colorIndex"
      @changeColor="changeColor"
    />
  </div>
</template>

<script>
import Editor from './Editor';
import ColorSelector from './ColorSelector';

export default {
  components: {
    Editor,
    ColorSelector,
  },
  props: ['data', 'width', 'height'], // dataにまとめたので注意
  methods: {
    onInput(text) {
      // 課題：現状だと文字は入力できるが、値が保存されないのでリロードすると消える
      // スプレッド演算子で連想配列のコピーを生成し、textのみ上書き
      this.$store.dispatch('updateMemo', {
        ...this.$store.getters.getMemoById(this.data.id),
        text,
      });
    },
    putForward() {
      // 課題：該当のメモのzIndexをmemoData配列の中の最大+1にして前面に出したい
      // pages/index.vue > methods.onMoveを参考に、getMemoByIdを使うこと
      // スプレッド演算子で連想配列のコピーを生成し、zIndexのみ上書き
      this.$store.dispatch('updateMemo', {
        ...this.$store.getters.getMemoById(this.data.id),
        zIndex: Math.max(...this.$store.state.memoData.map(memo => memo.zIndex)) + 1,
      });
    },
    changeColor(colorIndex) {
      // スプレッド演算子で連想配列のコピーを生成し、colorIndexのみ上書き
      this.$store.dispatch('updateMemo', {
        ...this.$store.getters.getMemoById(this.data.id),
        colorIndex,
      });
    },
  },
};
</script>

<style scoped>
.memo {
  position: absolute;
  top: 20px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.35);
}

.handle {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  cursor: move;
}

.trash {
  position: absolute;
  top: 2px;
  right: 5px;
  padding: 3px 10px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
}

.trash:hover {
  color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}
</style>
