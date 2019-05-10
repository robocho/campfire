  // $('#search-element').on('input', function(e){
  //     var input = $(e.target).val();
  //     var filter = input.toUpperCase();
  //     var table, tr, td, i, txtValue;
  //     table = document.getElementById("channel_table");
  //     tr = table.getElementsByTagName("tr");
  //     for (i = 0; i < tr.length; i++) {
  //       td = tr[i].getElementsByTagName("td")[0];
  //         if (td) {
  //           txtValue = td.textContent || td.innerText;
  //           if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //             tr[i].style.display = "";
  //           } else {
  //             tr[i].style.display = "none";
  //         }
  //       }       
  //     }
  // });

$('#search-element').on('input', function(e){
  var input = $(e.target).val();
  if (input === '') {
    $('.entry').show();
  } else {
    $('.entry').hide();
      $('.entry').each(function(){
        var channelName = $(this).attr('id');
        var re = new RegExp("^"+input,"g");
        if (channelName.match(re)) {
            $(this).show();
        }
    });
  }
});


