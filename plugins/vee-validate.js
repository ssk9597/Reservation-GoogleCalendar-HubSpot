import Vue from 'vue';
// 使用する機能
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate';
// エラーメッセージの日本語化用
import ja from 'vee-validate/dist/locale/ja.json';
// 使用するバリデーションルール
import { required, email } from 'vee-validate/dist/rules';

// VeeValidateがデフォルトで用意している各ルールを使用するよう指定
// 必須項目のバリデーション
extend('required', required);
// emailのバリデーション
extend('email', email);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

localize('ja', ja);
