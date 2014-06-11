$(function() {

  /*-----------------------------------
    未来さんからの指摘
    1, 変数名
      ・変数名が抽象的すぎる
      ・将来の自分が見たとき理解できない
      ・もっと具体的な変数名にするべき
        ・たとえば、dataに入っているのはジャッジのステータスなので、
          judge_statusにする、など
    2, DRYの原則 & メソッドの責任
      ・JSON.parseを繰り返している
        ・これはこのメソッドをここで呼んでいるのがそもそも間違い
      ・JSON文字列からオブジェクトへparseするのはこのメソッドの役割ではない
      　・他のメソッドでパースして渡すべき
    3, 不確定な値・フィールドを使うな！
      ・data.idやdata.statusは保証されていない
      ・クラスを定義するべき
      ・Javascriptでクラスを作るのは複雑だが、coffeeなら楽につくれる
        ・coffeeの勉強をしよう！

    先生にはもう少しかかることを伝える
    -> メールで

    coffeeで書き直したらまず未来さんに見せる
    -> チェックしてもらったら直して見せる

    修正が済んだらソースコードをgithubに乗せて先生にURLを送る

  -----------------------------------*/


  // for initialize
  var init_data = {
    records: [
      {
        id: 1,
        status: 0
      },
      {
        id: 2,
        status: 0
      },
      {
        id: 3,
        status: 0
      },
      {
        id: 4,
        status: 0
      }
    ]
  };
  var init_json = JSON.stringify(init_data);
  init(init_json);

  // initialize table
  function init(json) {
    var obj = JSON.parse(json);
    for(var i = 0; i < obj.records.length; i++) {
      insert( obj.records[i] );
    }
  }


  // update and insert
  function update(json) {
    var data = JSON.parse(json);
    if(!data.id || !data.status) return;

    if(Number(data.status) == 0) {
      insert(data);
    }
    else {
      var $status = $("#" + data.id + " .status");
      $status.text( convertStatus(data.status) );
    }
  }

  function insert(data) {
    var $new_record = $("<tr id=" + data.id + ">")
                        .append('<td class="id">' + data.id + '</td>')
                        .append('<td class="status">' + convertStatus(data.status) + '</td>');
    $("#table-body").prepend($new_record);
  }

  function convertStatus(status) {
    switch (Number(status)) {
      case 0 :
        return "wait";
      case 1 :
        return "accepted";
      default :
        return "invalid value";
    }
  }


  // submit form
  $("#submit_form").on("submit", function(event) {
    event.preventDefault();
    var id = $(this).find("input[name=id]").val();
    var status = $(this).find("input[name=status]").val();

    update( JSON.stringify({ "id": id, "status": status }) );
  });

});