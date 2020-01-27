$(function(){
  // The operation when the input text box is blur
  $("#username input").blur(function(){
    if (validator.checkInfoFormat(this.name, $(this).val())){
      $(this).parent().find("span.status").text('').hide();
    } else {
      $(this).parent().find("span.status").text(validator.getErrorMessage(this.name)).show();
    }
  });

  $("#clear").click(function(event){
    event.preventDefault();
    $("#input-bar input").val("");
  });

  $("#submit").click(function(){
    $("#input-bar input").blur();
    if (!validator.checkFormFormat()) {
      alert("请按提示输入注册信息");
      return false;
    }
  });
});