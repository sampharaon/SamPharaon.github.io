var audio;
var ads;

//Hide Pause Initially
$('#pause').hide();

$(document).ready( function(){
        //Initializer - Play First Song
    initAudio($('#playlist li:first-child'));

    function initAudio(element){
        var song = element.attr('song');
        var title = element.text();
        var cover = element.attr('cover');
        var artist = element.attr('artist');

        //Create a New Audio Object
        audio = new Audio('media/' + song);

        //Go to next song when song ended
        $(this)[0].addEventListener("ended", function(){
            audio.pause();
            var next = $('#playlist li.active').next();
            if (next.length == 0) {
                next = $('#playlist li:first-child');
            }
            initAudio(next);
            audio.play();
            $('#play').hide();
            $('#pause').show();
            showDuration();
        });

        if(!audio.currentTime){
            $('#current-duration').html('0:00');

        }

        $('.album-info .title').text(title);
        $('.album-info .artist').text(artist);

        //Insert Cover Image
        $('img.cover').attr('src','media/Covers/' + cover);

        $('#playlist li').removeClass('active');
        element.addClass('active');
    }

    //Play Button
    $('#play').click(function(){
        audio.play();
        $('#play').hide();
        $('#pause').show();
        $('#current-duration').fadeIn(400);
        showBuff();
        showDuration();
    });

    //Pause Button
    $('#pause').click(function(){
        audio.pause();
        $('#pause').hide();
        $('#play').show();
    });

    //stop Button
    //$('#stop').click(function(){
    //   audio.pause();
    //  audio.currentTime = 0;
    //  $('#n-pause, #pause').hide();
    //  $('#n-play, #play').show();
    //  $('#duration').fadeOut(400);
    //  $('#play').hide();
    //  $('#pause').show();
    //});

    //Next Button
    $('#next').click(function(){
        audio.pause();
        var next = $('#playlist li.active').next();
        if (next.length == 0) {
            next = $('#playlist li:first-child');
        }
        initAudio(next);
        audio.play();
        $('#play').hide();
        $('#pause').show();
        showDuration();
    });

    //Prev Button - to restart the song
    $('#prev').click(function(){
        if (audio.currentTime <= 2) {
            audio.pause();
            var prev = $('#playlist li.active').prev();
            if (prev.length == 0) {
                prev = $('#playlist li:last-child');
            }
            initAudio(prev);
            audio.play();
            $('#play').hide();
            $('#pause').show();
            showDuration();
        }
        audio.currentTime = 0;
        $('#n-pause, #pause').hide();
        $('#n-play, #play').show();
        $('#duration').fadeOut(400);
        $('#play').hide();
        $('#pause').show();
    });

    //Prev Button - to go to previous song
    $('#prev').dblclick(function(){
        audio.pause();
        var prev = $('#playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('#playlist li:last-child');
        }
        initAudio(prev);
        audio.play();
        $('#play').hide();
        $('#pause').show();
        showDuration();
    });

    //Playlist Song Click
    $('#playlist li').click(function () {
        audio.pause();
        initAudio($(this));
        $('#play').hide();
        $('#pause').show();
        $('#current-duration').fadeIn(400);
        audio.play();
        showDuration();
    });

    //Time Duration
    function showDuration(){
        $(audio).bind('timeupdate', function(){
            //Get hours and minutes
            var s = parseInt(audio.currentTime % 60);
            var m = parseInt((audio.currentTime / 60) % 60);
            var ds = parseInt(audio.duration % 60);
            var dm = parseInt((audio.duration / 60) % 60);
            //Add 0 if seconds less than 10
            if (s < 10) {
                s = '0' + s;
            }
        if (ds < 10) {
                ds = '0' + ds;
            }
            $('#current-duration').html(m + ':' + s);
            var value = 0;
            if (audio.currentTime > 0) {
                value = Math.floor((100 / audio.duration) * audio.currentTime);
            }
        $('#total-duration').html(dm + ':' + ds);
            $('#player-seekduration').css('width',value+'%');
        });
    }

    function showBuff(){
    $(audio).bind('progress', function(){
        if (audio.buffered > 0) {
        buffValue = Math.floor((100 / audio.duration) * audio.buffered);
        }
        $('#player-progressduration').css('width',buffValue+'%');
    });
    }

});
