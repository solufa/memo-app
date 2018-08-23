import firebase from 'firebase';

firebase.initializeApp(JSON.parse(process.env.FIREBASE_KEY));

const db = firebase.database();

export const state = () => ({
  colorList: [
    '#d00',
    '#cc0',
    '#0cc',
    '#0c0',
    '#c0c',
  ],
  memoData: [],
  boards: [],
  currentBoardId: null,
  boardsPath: '/boards',
});

// ページ初期化時に一回だけ呼ばれる
export const plugins = [
  (store) => {
    db.ref(store.state.boardsPath).on('value', (snapshot) => {
      store.commit('setBoards', snapshot.val() || []);
    });
  },
];

// index.vue の methods.onMove 内で使用している。メソッドスタイルgetterの書き方より使い方を意識する
// https://vuex.vuejs.org/ja/guide/getters.html#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9
export const getters = {
  getMemoById: (state) => (id) => {
    return state.memoData.find(memo => memo.id === id);
  },
  memoPath(state) {
    return state.currentBoardId ? `/memos/${state.currentBoardId}` : null;
  },
};

// stateは「必ず」mutationsの関数を通して更新する
// 呼び出しは $store.commit('関数名', 必要なら引数);
// mutationsに非同期処理を書いてはならない
// 非同期処理はactionを経由してmutationを呼ぶ
export const mutations = {
  setMemoData(state, memoData) {
    state.memoData = memoData;
  },
  setBoards(state, boards) {
    state.boards = boards;
  },
  setCurrentBoardId(state, id) {
    state.currentBoardId = id;
  },
};

// axiosなど非同期処理を挟んでstateを更新したい場合に使う
// 呼び出しは$store.dispatch('関数名', 必要なら引数)
// actionsの中で$store.commit を呼んでstateを更新する
export const actions = {
  async getBoards({ commit, state }) {
    const snapshot = await db.ref(state.boardsPath).once('value');
    commit('setBoards', snapshot.val() || []);
  },
  async createBoard({ state }, name) {
    const id = Math.max(...state.boards.map(board => board.id), 0) + 1;

    await db.ref(state.boardsPath).set([...state.boards, { name, id }]);

    return id;
  },
  async addMemo({ state, getters }) {
    await db.ref(getters.memoPath).set([
      ...state.memoData,
      {
        id: Math.max(...state.memoData.map(memo => memo.id), 0) + 1,
        left: 20, // 常に一番左に生成することにした
        top: 20,
        colorIndex: Math.floor(Math.random() * state.colorList.length), // 課題
        text: '',
        zIndex: Math.max(...state.memoData.map(memo => memo.zIndex), 0) + 1, // 新たに追加した
      },
    ]);
  },
  async updateMemo({ state, getters }, memo) {
    await db.ref(getters.memoPath).set(
      state.memoData.map(m => m.id === memo.id ? memo : m)
    );
  },
  async removeMemo({ state, getters }, id) {
    await db.ref(getters.memoPath).set(
      state.memoData.filter(memo => memo.id !== id)
    );
  },
};
