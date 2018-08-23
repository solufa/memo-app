<template>
  <div
    class="main"
    :style="`left: ${sideBarWidth}px`"
    @mousemove="onMove"
    @mouseup="dragEnd"
  >
    <div class="memo-area">
      <Memo
        v-for="data in $store.state.memoData"
        :key="data.id"
        :data="data"
        :width="memoWidth"
        :height="memoHeight"
        @start="dragStart($event, data.id)"
      />
    </div>

    <AddBtn @add="$store.dispatch('addMemo')"/>

    <SideBar
      :width="sideBarWidth"
      :boards="$store.state.boards"
      :currentId="$store.state.currentBoardId"
      @inputName="inputName"
    />
  </div>
</template>

<script>
import Memo from '~/components/Memo';
import AddBtn from '~/components/AddBtn';
import SideBar from '~/components/SideBar';
import firebase from 'firebase';

const db = firebase.database();

export default {
  components: {
    Memo,
    AddBtn,
    SideBar,
  },
  watchQuery: ['id'],
  async fetch({ store, route }) {
    if (store.getters.memoPath !== null) {
      db.ref(store.getters.memoPath).off('value');
    }

    store.commit('setCurrentBoardId', +route.query.id);
    await store.dispatch('getBoards');

    const dbRef = db.ref(store.getters.memoPath);
    const snapshot = await dbRef.once('value');
    store.commit('setMemoData', snapshot.val() || []);

    if (store.state.memoData.length === 0) store.dispatch('addMemo');

    dbRef.on('value', snapshot => store.commit('setMemoData', snapshot.val() || []));
  },
  data() {
    // このコンポーネントでしか使わない値や、storeに保存するほどでもない値はdataを使う
    return {
      draggingId: null, // targetId から名称変更、永続化する意味がないのでstoreに保存しないことにした
      prevX: null,
      prevY: null,
      sideBarWidth: 180,
      memoWidth: 225,
      memoHeight: 340,
    };
  },
  beforeDestroy() {
    db.ref(this.$store.getters.memoPath).off('value');
  },
  methods: {
    async inputName(name) {
      const targetBoard = this.$store.state.boards.find(board => board.name === name);

      if (!targetBoard) {
        const id = await this.$store.dispatch('createBoard', name);
        this.$router.push(`/board/?id=${id}`);
      } else {
        this.$router.push(`/board/?id=${targetBoard.id}`);
      }
    },
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

      if (targetMemo.left <= 0) {
        targetMemo.left = 0;
      } else if (targetMemo.left > window.innerWidth - this.sideBarWidth - this.memoWidth) {
        targetMemo.left = window.innerWidth - this.sideBarWidth - this.memoWidth;
      } else {
        this.prevX = x;
      }

      if (targetMemo.top <= 0) {
        targetMemo.top = 0;
      } else if (targetMemo.top > window.innerHeight - this.memoHeight) {
        targetMemo.top = window.innerHeight - this.memoHeight;
      } else {
        this.prevY = y;
      }

      this.$store.dispatch('updateMemo', targetMemo);
    },
  },
}
</script>

<style scoped>
.main {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: center/cover url('~/assets/bricks.jpg');
}

.memo-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
  z-index: -1;
}
</style>
