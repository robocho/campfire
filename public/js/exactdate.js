  $('#search-date').on('input', function(e){
      let date = $(e.target).val();
      let month = date.slice(0, 2);
      let day = date.slice(3, 5);
      let year = date.slice(6, 10);

      var filter = input.toUpperCase();
      var table, tr, td, i, txtValue;
      table = document.getElementById("channel_table");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
          }
        }       
      }
  });