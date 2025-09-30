// Firebase設定ファイル
// このファイルはFirebaseプロジェクトの設定情報を保持します

// ⚠️ 重要: Firebaseコンソールから取得した実際の値に置き換えてください
// https://console.firebase.google.com/ でプロジェクトを作成し、
// プロジェクト設定 → 全般 → アプリ → SDK setup and configuration から取得できます

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
    // databaseURL は Realtime Database を使用する場合のみ必要
    // databaseURL: "https://your-project-id.firebaseio.com"
};

// Firebase設定をエクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = firebaseConfig;
}
