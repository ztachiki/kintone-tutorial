(function(){
    "use strict";

    // レコード一覧画面の表示イベント
    kintone.events.on('app.record.index.show', function(event) {

        // 0件Hit対策
        if (!event.size) {
            return;
        }

        var myListTable = document.createElement('table');
        myListTable.id = 'my_list_table';
        myListTable.style.border = '1px solid';
        myListTable.style.width = '600px';

        var records = event.records;

        for (var i = 0; i < records.length; i++) {
            var record = records[i];

            var myRecordTd1 = document.createElement('td');
            myRecordTd1.id = 'my_record_td_' + i + '_1';
            myRecordTd1.style.border = '1px solid';
            myRecordTd1.innerText = record.レコード番号.value;
            // 信号の色
            var myRecordTd2 = document.createElement('td');
            myRecordTd2.id = 'my_record_td_' + i + '_2';
            myRecordTd2.style.border = '1px solid';
            myRecordTd2.innerText = record.信号の色.value;

            // 作成日時k
            var myRecordTd3 = document.createElement('td');
            myRecordTd3.id = 'my_record_td_' + i + '_3';
            myRecordTd3.style.border = '1px solid';
            myRecordTd3.innerText = new Date(record.作成日時.value).toLocaleString();

            var myRecordTr = document.createElement('tr');
            myRecordTr.id = 'my_record_tr_' + i;
            myRecordTr.appendChild(myRecordTd1);
            myRecordTr.appendChild(myRecordTd2);
            myRecordTr.appendChild(myRecordTd3);

            myListTable.appendChild(myRecordTr);
        }

        var myHeaderSpace = kintone.app.getHeaderSpaceElement();
        myHeaderSpace.innerText = '';
        myHeaderSpace.appendChild(myListTable);
    });

})();