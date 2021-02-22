(function () {
    "use strict"
    kintone.events.on('app.record.detail.show', function(event) {

        var myMenuButton = document.createElement('button');
        myMenuButton.id = 'my_menu_button';
        myMenuButton.innerText = 'ボタン';
        myMenuButton.onclick = function() {
            var mySpaceField = kintone.app.record.getSpaceElement('my_space_field');
            mySpaceField.parentNode.style.width = '400px';

            var updatedAt = '';
            var rec = kintone.app.record.get();
            if (rec) {
                updatedAt = rec.record.更新日時.value;
            }
            var time = new Date(updatedAt);
            //kintone.app.record.getSpaceElement('my_space_field').innerText = updatedAt;
            kintone.app.record.getSpaceElement('my_space_field').innerText = time.toLocaleString();
        };
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(myMenuButton);
    });
})();