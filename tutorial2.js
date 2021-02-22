(function() {
    "use strict";

    // レコード一覧画面の表示イベント
    kintone.events.on('app.record.index.show', function(event) {
        // 具体的な処理の内容を記述
        if (document.getElementById('my_index_button') !== null) {
            return;
        }
        var myIndexButton = document.createElement('button');
        myIndexButton.id = 'my_index_button';
        myIndexButton.innerText = '一覧のボタン';

        kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);

    });
})();