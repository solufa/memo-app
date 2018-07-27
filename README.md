# 07/26~08/09の課題

## インストール手順

```bash
$ git clone https://github.com/m-mitsuhide/memo-app.git
$ cd memo-app
$ npm i
$ npm run dev
```

http://localhost:8080/  
を開く

可読性向上のため授業の時から大幅に書き換えたので注意  
上書きしないでbranchをdevelopなどに変えるか自分のソースコードを少しずつ置き換えていくと良い  
masterに上書きすると次回pullするときに競合しますよ

### Gitでdevelopブランチを新規作成
```bash
$ git branch develop
```

### Gitでブランチをdevelopに変更 (VSCode左下の隅がdevelopに変わるはず)
```bash
$ git checkout develop
```

### Gitでブランチをmasterに変更 (VSCode左下の隅がmasterに変わるはず)
```bash
$ git checkout master
```

## おおよそ難易度順、好きな順番で
- store/index.js > mutations.addMemo - colorIndex をstate.colorList.lengthを使用してランダムに設定
- store/index.js > mutations.removeMemo を完成（4行くらい）
- components/Memo.vue > methods.onInputを完成（5行くらい）
- components/Memo.vue > methods.putForwardを完成（10～15行くらい）
- それぞれのメモの下の方にstate.colorListから好きな色を選べる小さな正方形ボタンを全色分コンポーネントで配置する（ヒント無しの最難関、ファイル増えるし何行になるかわからん）

### store(Vuex)を正しく扱えているかどうかは開発者ツールVueタブでタイムトラベルが正常に動くかどうかで確かめる

### エラーが起きたあとにアプリの動作が元に戻らない場合の対処
コードのエラー部分を修正したあとにChromeのDEVツールでlocalStorageの値を消すと大抵動くようになる