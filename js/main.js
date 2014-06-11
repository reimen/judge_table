$(function() {

  // for initialize
  var init_object = {
    judge_statuses: [
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
  var init_json_string = JSON.stringify(init_object);
  initJudgeStatusTable(init_json_string);

  // initialize table
  function initJudgeStatusTable(init_json_string) {
    var init_json = JSON.parse(init_json_string);
    for(var i = 0; i < init_json.judge_statuses.length; i++) {
      insertJudgeStatus( init_json.judge_statuses[i] );
    }
  }





  // receive json string
  function receiveJsonString(json_string) {
    var judge_status = JSON.parse(json_string);
    // validation
    if(!judge_status.id || !judge_status.status) return;

    judge_status.id = Number(judge_status.id);
    judge_status.status = Number(judge_status.status);

    switch(judge_status.status) {
      case 0:
        insertJudgeStatus(judge_status);
        break;
      case 1:
        updateJudgeStatus(judge_status);
        break;
      default:
        console.log("invalid value: judge_status.status = " + judge_status.status);
        break;
    }
  }

  // update and insert
  function updateJudgeStatus(judge_status) {
    var $status = $("#" + judge_status.id + " .status");
    $status.text( statusText(judge_status.status) );
  }

  function insertJudgeStatus(judge_status) {
    var $new_record = $("<tr id=" + judge_status.id + ">")
                        .append('<td class="id">' + judge_status.id + '</td>')
                        .append('<td class="status">' + statusText(judge_status.status) + '</td>');
    $("#table-body").prepend($new_record);
  }

  function statusText(status) {
    switch (status) {
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
    var json_string = JSON.stringify({ "id": id, "status": status });

    receiveJsonString( json_string );
  });

});