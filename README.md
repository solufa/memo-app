# 最終課題の解答

## インストール手順

```bash
$ git clone https://github.com/m-mitsuhide/memo-app.git
$ cd memo-app
$ git checkout firebase
```

VS Codeの右下を見てブランチが「firebase」に変わっていることを確認してから  
firebase.key.json  
をルートディレクトリの直下に作る。  
自分のログイン情報を記入すること。  

```json:firebase.key.json
{
  "apiKey": "<YOUR KEY>",
  "authDomain": "<YOUR DOMAIN>",
  "databaseURL": "<YOUR URL>",
  "projectId": "<YOUR ID>",
  "storageBucket": "",
  "messagingSenderId": "<YOUR SENDING ID>"
}
```

通常通りインストールと起動

```bash
$ npm i
$ npm run dev
```

http://localhost:8080/  
を開く
