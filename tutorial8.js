(function () {
    "use strict";

    //
    kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function (event){
        var record = event.record;
        var price = record['単価'].value;
        var number = record['個数'].value;

        var subTotal = price * number;

        if (subTotal >= 10000) {
            subTotal = subTotal / 100 * 80;
        } else if (subTotal >= 5000) {
            subTotal = subTotal / 100 * 90;
        }
        record['合計'].value = subTotal;

        return event;
    });

    kintone.events.on(['app.record.edit.show', 'app.record.create.show'], function (event) {
        event.record['合計'].disabled = true;
        return event;
    });
})();