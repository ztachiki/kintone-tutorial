(function () {
    "use strinct";

    kintone.events.on('app.record.index.show', function(event) {
        window.alert('レコード一覧イベント');
    });

    kintone.events.on('app.record.detail.show', function(event) {
        window.alert('レコード表示イベント');
    });

    kintone.events.on('app.record.create.show', function(event) {
        window.alert('レコード追加イベント');
    });

    kintone.events.on('app.record.edit.show', function(event) {
        window.alert('レコード編集イベント');
    });

    kintone.events.on('app.record.report.show', function(event) {
        window.alert('グラフ表示イベント');
    });
})();