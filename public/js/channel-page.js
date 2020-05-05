    var urls = [];
    var channelName = '';
    var currentSongIndex = 0;
    var autoPlay = false;

    var socket = io();
/*
    $(document).ready(function(){
        // set [urls] equal to every song url in the queue
        $('#url-list li').each(function(){
            urls.push($(this).attr('id'));
            console.log($(this).attr('id'));
        });
        // set channelName
        channelName = $('#channel-name').text().split(" ")[0];


        // set the iframe video to play the current song
        $('#current-song').attr('src', urls[currentSongIndex]);

        $('#add-song-form').attr('action', '/channel/'+channelName);
        $('.info-container').hide();
        console.log(urls);
    });


*/
    // next button ~ switch to next song
    $('#next').on('click', function(){
        currentSongIndex += 1;
        if (currentSongIndex >= urls.length) {
            currentSongIndex = 0;
        }

        var nextURLToPlay = urls[currentSongIndex];
        if (autoPlay) {
            nextURLToPlay += "?autoplay=1";
        }
        $('#current-song').attr('src', nextURLToPlay);
    });

    // prev button ~ switch to previous song
    $('#prev').on('click', function(){
        currentSongIndex -= 1;
        if (currentSongIndex < 0) {
            currentSongIndex = urls.length - 1;
        }

        var nextURLToPlay = urls[currentSongIndex];
        if (autoPlay) {
            nextURLToPlay += "?autoplay=1";
        }
        $('#current-song').attr('src', nextURLToPlay);
    });

    // playlist button ~ display playlist (queue) for channel
    // ** Fix this to make it display right of the video? **
    // ** Make this display the playlist or the add song box depending on which button is pressed **
    $('#playlist').on('click', function(){
        if ($('.info-container').is(':hidden')) {
            $('.info-container').show();
            $(window).scrollTop($('.info-container').offset().top);
            //{{!-- $('.video-frame').css('margin-left', '5%') --}}
        } else {
            $('.info-container').hide();
            //{{!-- $('.video-frame').css('margin-left', 'auto') --}}
        }
    });

    $('#autoplay').on('click', function(){
        if (autoPlay) {
            autoPlay = false;
            $(this).html('Autoplay: OFF');
            $(this).css('color', 'red');
        } else {
            autoPlay = true;
            $(this).html('Autoplay: ON');
            $(this).css('color', 'green');
        }
    });
