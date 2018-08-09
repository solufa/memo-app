// ページ1つに巨大な連想配列1つを定義する
// コンポーネントをまたがる情報や保存しておきたい情報を集約する
// localStorageやFirebaseなどと連携出来るように、JSON化出来るデータのみセットする
// つまり、関数やDOMやインスタンスは極力置かない
// number, boolean, string, null, array, objectはJSON化可能

export const state = () => {
  const localData = localStorage.vuex;

  // localStorageのデータがあれば適用する
  if (localData) {
    return JSON.parse(localData);
  } else {
    return {
      colorList: [
        '#d00',
        '#cc0',
        '#0cc',
        '#0c0',
        '#c0c',
      ],
      memoData: [],
    };
  }
};

// ページ初期化時に一回だけ呼ばれる
export const plugins = [
  (store) => {
    // $store.commit が呼ばれるのを監視してlocalStorageに保存する
    store.subscribe(() => {
      localStorage.vuex = JSON.stringify(store.state);
    });
  },
];

// index.vue の methods.onMove 内で使用している。メソッドスタイルgetterの書き方より使い方を意識する
// https://vuex.vuejs.org/ja/guide/getters.html#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9
export const getters = {
  getMemoById: (state) => (id) => {
    return state.memoData.find(memo => memo.id === id);
  },
};

// stateは「必ず」mutationsの関数を通して更新する
// 呼び出しは $store.commit('関数名', 必要なら引数);
// mutationsに非同期処理を書いてはならない
// 非同期処理はactionを経由してmutationを呼ぶ
export const mutations = {
  addMemo(state) {
    // ...state.memoDataで配列の内容をコピーしたあとに、新しい連想配列を追加
    state.memoData = [...state.memoData, {
      id: Math.max(...state.memoData.map(memo => memo.id), 0) + 1,
      left: 20, // 常に一番左に生成することにした
      top: 20,
      colorIndex: Math.floor(Math.random() * state.colorList.length), // 課題
      text: '',
      zIndex: Math.max(...state.memoData.map(memo => memo.zIndex), 0) + 1, // 新たに追加した
    }];
  },
  updateMemo(state, memo) {
    // mapは関数の返り値で新しい配列を作るのでコピーしたことになる
    // 二つのidが一致したら差し替え
    state.memoData = state.memoData.map(m => m.id === memo.id ? memo : m);
  },
  removeMemo(state, id) {
    // 課題
    // filterはtrue/falseで判別して新しい配列を返す
    // id が一致したらfalseにして排除する
    state.memoData = state.memoData.filter(memo => memo.id !== id);
  },
};

// axiosなど非同期処理を挟んでstateを更新したい場合に使う
// 呼び出しは$store.dispatch('関数名', 必要なら引数)
// actionsの中で$store.commit を呼んでstateを更新する
export const actions = {

};
