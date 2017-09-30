var audio;
var ads;

//Hide Pause Initially
$('#pause').hide();


    //Initializer - Play First Song
initAudio($('#playlist li:first-child'));

initAudio.preload="auto";

function initAudio(element){
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');
    var lyric = element.attr('Lyric');

    //Create a New Audio Object
    audio = new Audio('media/' + song);

    if(!audio.currentTime){
        $('#current-duration').html('0:00');
        $('#total-duration').html('0:00');
    }

    $('.album-info .title').text(title);
    $('.album-info .artist').text(artist);

    //Insert Cover Image
    $('img.cover').attr('src','media/Covers/' + cover);
    $('div.lyric-modal-content').attr('load','media/lyrics/' + lyric);

    $('#playlist li').removeClass('active');
    element.addClass('active');

    $('#repeat').removeClass("active");

    function updateLoadProgress() {
        var percent = 0;
        if (audio.buffered.length > 0) {
            percent = Math.floor(audio.buffered.end(0) / audio.duration) * 100;
        }
        $('#player-progressduration').css('width', percent + '%');
    }

    $(audio).bind('progress', function () {
        updateLoadProgress()
    });
    $(audio).bind('loadeddata', function () {
        updateLoadProgress()
    });
    $(audio).bind('canplaythrough', function () {
        updateLoadProgress()
    });
    $(audio).bind('playing', function () {
        updateLoadProgress()
    });
    $(audio).bind('onplaying', function () {
        updateLoadProgress()
    });
    $(audio).bind('onload', function () {
        updateLoadProgress()
    });
    $(audio).bind('onprogress', function () {
        updateLoadProgress()
    });
}



//button controls============================================================================================
//loop button
$('#repeat').click(function(){
    if (audio.loop == true) {
        audio.loop = false;
        $('#repeat').removeClass('active');
    } else {
        audio.loop = true;
        $('#repeat').addClass('active');
    }
});

//Play Button
$('#play').click(function(){
    audio.load();
    audio.play();
    updateLoadProgress()
    $('#play').hide();
    $('#pause').show();
    $('#current-duration').fadeIn(400);
    showDuration();
    //showBuff();
});

//Pause Button
$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

//Next Button
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.load();
    audio.play();
    updateLoadProgress()
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
        audio.load();
        audio.play();
        updateLoadProgress()
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
    audio.load();
    audio.play();
    updateLoadProgress()
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
    audio.load();
    audio.play();
    updateLoadProgress()
    showDuration();
});


//Time Duration========================================================================================
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
        //show current time
        $('#current-duration').html(m + ':' + s);
        //show total time
        $('#total-duration').html(dm + ':' + ds);
        //duration progressbar
        var value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        $('#player-seekduration').css('width',value+'%');
        //duration seek
    });
}

//load progress bar=================================================================================

function updateLoadProgress() {
    var percent = 0;
    if (audio.buffered.length > 0) {
        percent = Math.floor(audio.buffered.end(0) / audio.duration) * 100;
    }
    $('#player-progressduration').css('width', percent + '%');
}

$(audio).bind('progress', function () {
    updateLoadProgress()
});
$(audio).bind('loadeddata', function () {
    updateLoadProgress()
});
$(audio).bind('canplaythrough', function () {
    updateLoadProgress()
});
$(audio).bind('playing', function () {
    updateLoadProgress()
});
$(audio).bind('onplaying', function () {
    updateLoadProgress()
});
$(audio).bind('onload', function () {
    updateLoadProgress()
});
$(audio).bind('onprogress', function () {
    updateLoadProgress()
});

//function showBuff(){
//    $(audio).bind('progress', function(){
//        updateLoadProgress();
//    });
//}


// playlist that appears through a modal ===============================================================

var modal = document.getElementById('simplemodal');
var modalBtn = document.getElementById('playlist-button');
var closebtn = document.getElementsByClassName('closebtn')[0];

modalBtn.addEventListener('click', openModal);
closebtn.addEventListener('click', closeModal);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// Lyrics that appears through a modal ==================================================================

var lyricModal = document.getElementById('lyricmodal');
var lyricModalBtn = document.getElementById('menu-button');
var lyricClosebtn = document.getElementsByClassName('lyric-closebtn')[0];

lyricModalBtn.addEventListener('click', openLyricModal);
lyricClosebtn.addEventListener('click', closeLyricModal);

function openLyricModal() {
    lyricModal.style.display = 'block';
}

function closeLyricModal() {
    lyricModal.style.display = 'none';
}

document.getElementsByClassName("lyric-modal-content").innerHTML = "\media\Lyrics\Ultralight Beam.html";

//play next song when song ends==============================================================================

//$(audio)[0].addEventListener("ended", function () {
//    audio.pause();
//    var next = $('#playlist li.active').next();
//    if (next.length == 0) {
//        next = $('#playlist li:first-child');
//    }
//    initAudio(next);
//    audio.play();
//    $('#play').hide();
//    $('#pause').show();
//    showDuration();
//});