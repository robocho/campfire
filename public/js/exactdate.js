  console.log("Here");

  $('#search-date').on('change', function(e){
      /*let date = new Date($('#search-date').val());
      let month = $('#search-date').getMonth() + 1;
      let day = $('#search-date').getDate();
      let year = $('#search-date').getFullYear();
      console.log(day+"/"+month+"/"+year);*/
      let date = $('#search-date').val();
      let month = date.slice(5,7);
      let day = date.slice(8, 10);
      let year = date.slice(0, 4);
      console.log("date: " + date);
      console.log("month: " + month + "/ day: " + day + "/ year: " + year);

    //  let months_arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      //var filter = input.toUpperCase();
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
              let cur_day = date_string[2];
              let cur_year = date_string[3];


              console.log(date_string);

              cur_month = months_short.indexOf(cur_month) + 1;


         //     cur_month = moment().month(cur_month);
              console.log("cur month: " + cur_month + "/ cur day: " + cur_day + "/cur year: " + cur_year);

              if (month == cur_month && day == cur_day && year == cur_year) {
                tr[i].style.display = "";
              } 
              else {
                console.log("Not here");
                console.log("cur month: " + cur_month);
                tr[i].style.display = "none";
              }
            }       
        }
      }
  });