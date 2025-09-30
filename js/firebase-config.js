// Firebase設定ファイル
// このファイルはFirebaseプロジェクトの設定情報を保持します

// ⚠️ 重要: Firebaseコンソールから取得した実際の値に置き換えてください
// https://console.firebase.google.com/ でプロジェクトを作成し、
// プロジェクト設定 → 全般 → アプリ → SDK setup and configuration から取得できます

const firebaseConfig = {
    apiKey: "AIzaSyBDoSzi8ZYYMq-Bu_RNMVNxNScAl2l5EJA",
    authDomain: "learning-system-dce48.firebaseapp.com",
    databaseURL: "https://learning-system-dce48-default-rtdb.firebaseio.com",
    projectId: "learning-system-dce48",
    storageBucket: "learning-system-dce48.firebasestorage.app",
    messagingSenderId: "1074717728059",
    appId: "1:1074717728059:web:0ea742775544b04c74eb1e",
    measurementId: "G-2WHRD1G6QT"
};

// Firebase設定をエクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = firebaseConfig;
}
