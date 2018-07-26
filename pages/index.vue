<template>
  <!-- handlerから外れてもドラッグを止められるように
    mouseupもcontainerに当てることにした -->
  <div
    class="container"
    @mousemove="onMove"
    @mouseup="dragEnd"
  >

    <!-- 属性名dataで連想配列ごと渡すことにした -->
    <!-- @start="dragStart($event, data)"のように連想配列ごと渡す方式では移動できないので注意 -->
    <!-- $eventは子コンポーネントがemitした値 -->
    <Memo
      v-for="data in $store.state.memoData"
      :key="data.id"
      :data="data"
      @start="dragStart($event, data.id)"
    />

    <AddBtn @add="$store.commit('addMemo')"/>
  </div>
</template>

<script>
import Memo from '~/components/Memo';
import AddBtn from '~/components/AddBtn'; 

export default {
  components: {
    Memo,
    AddBtn,
  },
  data() {
    // このコンポーネントでしか使わない値や、storeに保存するほどでもない値はdataを使う
    return {
      draggingId: null, // targetId から名称変更、永続化する意味がないのでstoreに保存しないことにした
      prevX: null,
      prevY: null,
    };
  },
  mounted() {
    // メモが1枚も無いなら＋ボタンを押すのと同じメソッドを呼んで生成
    if (this.$store.state.memoData.length === 0) {
      this.$store.commit('addMemo');
    }
  },
  methods: {
    dragStart(e, id) {
      this.draggingId = id;

      // startの度にマウス位置を初期化するとonMoveの処理がすっきり書けることに気付いた
      this.prevX = e.pageX;
      this.prevY = e.pageY;
    },
    dragEnd() {
      this.draggingId = null;
    },
    onMove(e) {
      const { draggingId } = this; // const draggingId = this.draggingId; と同じ
      if (draggingId === null) return;

      const x = e.pageX;
      const y = e.pageY;
      const targetMemo = {
        // store/index.jsのgetters.getMemoByIdを参照
        // 重要なのはここの使い方、computedに似ているかも
        // storeにdraggingIdを渡す⇒該当するメモを計算して返してもらう
        // ...スプレッド演算子で連想配列のコピーを作る
        ...this.$store.getters.getMemoById(draggingId),
      };

      // 現在のマウス位置から直前(prev)のマウス位置を引いた差分
      targetMemo.left += x - this.prevX;
      targetMemo.top += y - this.prevY;

      this.prevX = x;
      this.prevY = y;

      this.$store.commit('updateMemo', targetMemo);
    },
  },
}
</script>

<style scoped>
.container {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: center/cover url('~/assets/bricks.jpg');
}
</style>
