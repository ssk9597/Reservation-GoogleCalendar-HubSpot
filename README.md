# HubSpot と GoogleCalendar を使った予約管理フォーム

GoogleCalendar の予定状況を見て空いている時間に予約ができるアプリです。
また予約されたデータは HubSpot に登録され、マーケティングに活用されていく流れを想定しています。
従業員の登録や店舗の登録などクライアント側に関しては microCMS を使って構築しています。
microCMS を使うことによりノンエンジニアでも簡単に使えるアプリを目指しました。

## URL

## なぜ作ったか

### ①CRM と連携した予約管理サービスがないため

予約管理サービスは[AirRESERVE](https://airregi.jp/reserve/)をはじめ、様々なサービスがあるが API を提供しているサービスがありません。
予約管理サービスにも顧客管理はありますが、MA などで活用できないため応用の幅が狭いです。

### ②HubSpot のミーティングカレンダーでは UX が悪く、解消するためには膨大な費用がかかる

目的は店舗選択し、そこから自分の条件の合うスタッフを指名し予約するフローを作ることでした。

> ○ 希望のフロー
> 店舗選択 → 日付選択 → 空いているスタッフ
> ただ HubSpot のフローは以下の通りです。
> ○ 現在のフロー
> 店舗選択 → スタッフ選択 → 日時選択

つまり、スタッフ選択した後に日時を選ぶため、その日しかだめだというお客様はまたスタッフを選び直さなければいけないため UX が非常に悪いです。

これを解決するためには、HubSpot の Sales Starter に全従業員入る必要がありました。
従業員 1 名あたり月 ¥5,000 の費用がかかるため、費用対効果を考え諦めました。

上記 2 点の問題解消のため個人開発でアプリを作成しました。

## デモ画面

## 使用技術/開発環境

### PC

macOS Catalina 10.15.7

### フロントエンド

-   HTML
-   CSS
-   JavaScript
-   Nuxt v2.14.6

### サーバーサイド

-   node v14.15.0
-   npm v6.14.8
-   express v4.17.1
-   googleapis v67.0.0
-   jsonwebtoken v8.5.1

### パッケージ

-   @fortawesome/fontawesome-svg-core v1.2.32
-   @fortawesome/free-regular-svg-icons v5.15.1
-   @fortawesome/free-solid-svg-icons v5.15.1
-   @fortawesome/vue-fontawesome v2.0.2
-   @nuxtjs/axios v5.12.2
-   @nuxtjs/dotenv v1.4.1
-   @nuxtjs/moment v1.6.1
-   @nuxtjs/pwa v3.0.2
-   body-parser v1.19.0
-   core-js v3.6.5
-   cors v2.8.5
-   css-wipe v4.3.0
