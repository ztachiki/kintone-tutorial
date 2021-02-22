(function() {
    "use strict";

    kintone.events.on('app.record.detail.show', function(event) {
        var myHeaderMenuSpace = kintone.app.record.getHeaderMenuSpaceElement();
        var startButton = document.createElement('button');
        startButton.id = 'janken_start_button';
        myHeaderMenuSpace.innerText = '';

        var jankenItems = new Array('グー', 'チョキ', 'パー');

        startButton.onclick = function() {
            var jankenSpace = kintone.app.record.getSpaceElement('my_space_field');
            jankenSpace.innerText = '最初はグー!!\nじゃんけん・・・\n';
            jankenSpace.style.width = '400px';
            jankenSpace.parentNode.style.width = '400px';

            
            for (var i = 0; i < jankenItems.length; i++) {
                var tmpButton = document.createElement('button');
                tmpButton.id = 'j_button' + i ;
                tmpButton.innerText = jankenItems[i] + '!!';
                tmpButton.onclick = function() {
                    var you = this.id.replace('j_button', '');
                    var com = (you + 2) %  jankenItems.length;
                    jankenSpace.innerText = "あなた：" + jankenItems[you] + "\nジャンケンキング：" + jankenItems[com] + "\nもう一度やりますか？";
                };
            }
            jankenSpace.appendChild(tmpButton);
        };
        myHeaderMenuSpace.appendChild(startButton);

    });
    
    // kintone.events.on('app.record.detail.show', function(event){

    //     var myIndexButton = document.createElement('button');
    //     myIndexButton.id = 'my_index_button';
    //     myIndexButton.innerText = 'メニュー部ボタン';
    //     myIndexButton.onclick = function () {
    //         window.alert('メニュー部');
    //     }
    //     kintone.app.record.getHeaderMenuSpaceElement().appendChild(myIndexButton);

    //     // 任意のスペースフィ-ルドにボタンを設置
    //     var mySpaceFieldButton = document.createElement('button');
    //     mySpaceFieldButton.id = 'my_space_field_button';
    //     mySpaceFieldButton.innerText = 'スペースボタン';
    //     mySpaceFieldButton.onclick = function () {
    //         window.alert('スペースフィールド');
    //     }

    //     kintone.app.record.getSpaceElement('my_space_field').appendChild(mySpaceFieldButton);
    // });
})();