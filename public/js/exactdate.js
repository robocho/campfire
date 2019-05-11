  $('#search-date').on('change', function(e){
      let date = $('#search-date').val();
      let month = date.slice(5,7);
      let day = date.slice(8, 10);
      let year = date.slice(0, 4);
      
      let months_short = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //  let months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (month != null && date != null && year != null) {           //if not null for any val
        var table, tr, td, i, dateValue;

        table = document.getElementById("channel_table");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
            if (td) {
              dateValue = td.textContent || td.innerText;
              let date_string = dateValue.split(" ");

              let cur_month = date_string[1];
              let cur_year = date_string[3];
              let cur_day = "";

              let cur_day_arr = date_string[2].split('');
              if (cur_day_arr.length == 3) {
                cur_day = "0" + cur_day_arr[0];

              }
              else {
                let temp = cur_day_arr.slice(0, 2);
                cur_day = temp.join('');
              }

              cur_month = months_short.indexOf(cur_month) + 1;
              
              if (month == cur_month && day == cur_day && year == cur_year) {

                tr[i].style.display = "";
              } 
              else {
                tr[i].style.display = "none";
              }
            }       
        }
      }
  });