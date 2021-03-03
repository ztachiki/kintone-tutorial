(function() {
    "use strict";
    kintone.events.on('app.record.detail.show', function(event) { 
        // アプリIDの取得
        var appId =  event.appId;
        // レコード番号の取得
        var recordId = event.recordId;
        // リクエストプロパティ(JSON)
        var params = {
            "app": 49,  // ← 参照ログを格納するアプリのIDに書き換えてください
            "record": {
                "閲覧アプリID": { "value": appId },
                "閲覧レコード番号": { "value": recordId }
            }
        };

        // kintone REST API リクエスト ～ レコードの登録（POST）
        kintone.api(
            kintone.api.url('/k/v1/records', true), // - pathOrUrl
            'POST',                                // - method
            params,                                // - params
            function(resp) {                       // - callback
                // (特に何もしない)
            },
            function(resp) {                       // - errback
                // (特に何もしない)
            }
        );
    });
})();