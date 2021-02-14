# GAS + Vue + Vuetify + VueRouter による掲示板もどき

## 構成
- server.gs
  - index.htmlを読み込むためのGASの処理
- index.html
  - 起点となるHTMLファイル
  -  (各ライブラリおよびユーザスクリプトのインポートを行う)
- main.html
  - VueRouterの設定およびルートVueインスタンスの作成をする
- App.html
  - アプリケーションヘッダおよび起点コンポーネントの作成を行う
- BoardList.html
  - 投稿一覧を表示する
- BoardForm.html
  - 投稿処理を行う

## 画面を追加する際の手順
- 画面の新規ファイルを`html`ファイルとして作成する
  - ファイル名はパスカルケースで作成 (PascalCase)

- ファイルにベーススクリプトを記述する
  ```html
  <script>
    const PascalCase = {
      template: '\
        <v-container>\
          <h1 class="grey--text text-darken-3">Hello new screen</h1>\
        </v-container>\
      `
    }
  </script>
  ```
  ※ 注意点<br/>
  `template`を記載するときは各行の末尾に必ず`\`を記載する.<br/>
  空白だけの行があった場合にも必ず`\`を記述する.

- index.htmlの`User script`と`End user script`の間でファイルを読み込む
  ```html
    <!-- User script -->
    <?!= include('PascalCase'); ?>
    <?!= include('BoardList'); ?>
    <?!= include('BoardForm'); ?>
    <!-- End user script -->
    <?!= include('App'); ?>
    <?!= include('main'); ?>
  ```

- `main.html`内のVueRouterの設定で新しい画面へのパスを追加する
  ```js
  routes: [
      {
        path: '/',
        component: BoardForm
      },
      {
        path: '/list',
        component: BoardList
      },
      // 新規追加部分
      {
        path: '/pascal-case',
        component: PascalCase
      }
    ]
  ```

- `App.html`内のヘッダーテンプレートに新しい画面に遷移するボタンを追加する
  ```js
  const BoardHeader = {
    template: '\
      <v-app-bar color="primary" dark app>\
        <v-toolbar-title class="headline text-uppercase">\
          <span class="font-weight-light">MATERIAL DESIGN</span>\
        </v-toolbar-title>\
        <v-spacer></v-spacer>\
        <v-toolbar-items>\
          <v-btn to="/" text color="white">\
            投稿する\
          </v-btn>\
          <v-btn to="/list" text color="white">\
            投稿一覧\
          </v-btn>\
          <!-- 新規追加部分 -->\
          <v-btn to="/pascal-case" text color="white">\
            新規追加画面\
          </v-btn>\
        </v-toolbar-items>\
      </v-app-bar>\
    '
  };

  ```

- デプロイして画面が表示されることを確認する
