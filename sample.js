
/*
 * カスタマイズビューのサンプルプログラム
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 * https://opensource.org/licenses/mit-license.php
 */
jQuery.noConflict();
(function($) {

  'use strict';
  // 予算管理アプリを全レコード取得
  function fetchRecords(appId, opt_offset, opt_limit, opt_records) {
    var app_yosan = kintone.app.getLookupTargetAppId('拠点'); // 予算管理アプリID
    var offset = opt_offset || 0;
    var limit = opt_limit || 100;
    var allRecords = opt_records || [];
    var params = {app: app_yosan, query: 'order by レコード番号 asc limit ' + limit + ' offset ' + offset};
    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params).then(function(resp) {
      allRecords = allRecords.concat(resp.records);
      if (resp.records.length === limit) {
        return fetchRecords(appId, offset + limit, limit, allRecords);
      }
      return allRecords;
    });
  }
  // 予実管理データのカスタマイズビュー用データの作成
  function makeYojitsuData(records, opt_data, opt_i) {
    var i = opt_i || 0; // レコードのカウント
    var allData = opt_data || []; // 予実の集計結果
    var appId = kintone.app.getId(); // 実績管理アプリID
    var key1, key2, key3, key4, key5;
    key1 = records[i]['拠点'].value;
    key1 = key1.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    key2 = records[i]['予算'].value;

    var params = {'app': appId, 'query': '拠点 = "' + key1 + '"'};
    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params).then(function(resp) {
      if (resp.records) {
        key3 = 0;
        var obj = resp.records;
        for (var j = 0; j < obj.length; j++) {
          key3 += parseInt(obj[j]['実績合計'].value, 10);
        }
        key4 = parseInt(key3, 10) - parseInt(key2, 10);
        key5 = parseInt(key3, 10) / parseInt(key2, 10) * 100;
        key5 = key5.toFixed(2);
        key5 += '%';
        allData.push({segment: key1, budget: key2, results: key3, Difference: key4, AchievementRate: key5});
      } else {
        event.error = '実績管理情報が取得できません。';
      }
      i += 1;
      if (records.length !== i) {
        return makeYojitsuData(records, allData, i);
      }
      return allData;
    });
  }
  // 差異のマイナス値を赤色に変更
  function cellDesign() {
    $('#view tr td').each(function(index, elm) {
      if ($(this).hasClass('Difference_class')) {
        if ($(this).text().indexOf('-') > -1) {
          $(this).css('color', '#ff0000');
        }
      }
    });

  }
  // 予実管理のカスタマイズビューを取得
  function dispYojitsuCustomizeView(records) {
    makeYojitsuData(records).then(function(data) {
      // 列の設定
      var colModelSettings = [
        {name: 'segment',
          index: 'segment',
          width: 300,
          align: 'center',
          classes: 'segment_class'},
        {name: 'budget',
          index: 'budget',
          width: 200,
          align: 'right',
          classes: 'budget_class',
          formatter: 'currency',
          sorttype: 'float'},
        {name: 'results',
          index: 'results',
          width: 200,
          align: 'right',
          classes: 'results_class',
          formatter: 'currency',
          sorttype: 'float'},
        {name: 'Difference',
          index: 'Difference',
          width: 200,
          align: 'right',
          classes: 'Difference_class',
          formatter: 'currency',
          sorttype: 'float'},
        {name: 'AchievementRate',
          index: 'AchievementRate',
          width: 150,
          align: 'center',
          classes: 'AchievementRate_class',
          sorttype: 'float'}
      ];
      // 列の表示名
      var colNames = ['拠点', '予算', '実績', '差異', '達成率'];
      $('#view').jqGrid({
        data: data,
        datatype: 'local',
        colNames: colNames,
        colModel: colModelSettings,
        rowNum: 10,
        rowList: [1, 10, 20],
        caption: '売上',
        height: 'auto',
        width: 1100,
        pager: 'pager',
        shrinkToFit: true,
        viewrecords: true,
        gridComplete: function() {
          cellDesign();
        }
      });
    });
  }
  // イベント処理
  kintone.events.on(['app.record.index.show'], function(event) {
    var appId = kintone.app.getId(); // 実績管理アプリID
    fetchRecords(appId).then(function(records) {
      dispYojitsuCustomizeView(records);
    });
  });

})(jQuery);
