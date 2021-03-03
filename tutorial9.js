(function () {
    "use strict";

    kintone.events.on('app.record.detail.show', function(event){
        var appId = event.appId;

        var recordId = event.recordId;


        var params = {
            "app": 48,
            "records": {
                "閲覧アプリID": {"value": appId},
                "閲覧レコード番号": {"value": recordId}
            }
        };

        kintone.api (
            kintone.api.url('/k/v1/records', true),
            'POST',
            params,
            function(resp) {
            },
            function(resp) {
            }
        );
    });

})();