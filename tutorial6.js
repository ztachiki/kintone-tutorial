(function() {
    "use strict"
    kintone.events.on('app.record.detail.show', function (event) {
        var subTotals = {};
        var tableRecords = event.record.order_items.value;
        // テーブル内の各レコードをカテゴリごとに集計する
        for (var i = 0; i < tableRecords.length; i++) {
            var category = tableRecords[i].value['カテゴリ'].value;
            if (!subTotals[category]) {
                subTotals[category] = 0;
            }
            var number = tableRecords[i].value['個数'].value;
            var price = tableRecords[i].value['単価'].value;
            subTotals[category] += price * number;
        }

        // 集計結果をスペースフィールドに表示する
        var myTotalSpace = document.createElement('ul');
        for (var category in subTotals) {
            var categorySpace = document.createElement('li');
            categorySpace.innerText = category + ': ' + subTotals[category] + '円';
            myTotalSpace.appendChild(categorySpace);
        }

        kintone.app.record.getSpaceElement('sub_total_area').appendChild(myTotalSpace);
    });
})();