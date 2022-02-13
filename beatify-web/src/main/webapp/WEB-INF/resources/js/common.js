$(document).ready(function(){

    var index = 0,
        counter = 0,
        tracks = [],
        trackCount = tracks.length;
    var shuffle = false;
    var repeat = false;
    var player = new Plyr('#audio1', {
        controls: [
            'restart',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute'
        ]
    });

    $('#login-form').submit(function () {

        if (playing) {
            var trackIds = [];
            tracks.forEach(function (value) {

                trackIds.push(value.id);
            });
            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/beatify-web/api/songs/setSongInfo',
                cache: true,
                method: 'GET',
                dataType: 'text',
                data: {

                    songId: playingSondId,
                    currentTime: audio.currentTime,
                    shuffle: shuffle,
                    repeat: repeat,
                    tracks: trackIds
                }
            });
        }
    });

    var audio = $('#audio1').on('ended', function(){

        $('.track').attr('class', 'fa fa-play track');
        if ((index + 1) < trackCount) {

            if (shuffle) {

                var randomValue = Math.floor(Math.random() * ((trackCount - 1)));
                index = randomValue;
                playTrack(index);
            } else {

                index++;
                playTrack(index);
            }
        } else {

            if (repeat) {

                audio.pause();
                index = 0;
                playTrack(index);
            } else {

                audio.pause();
                audio.currentTime = 0;

            }
        }
    }).on('pause', function(){

        $('.track').attr('class', 'fa fa-play track');
        playing = false;
    }).on('play', function(){

        playing = true;
        $('.track').attr('class', 'fa fa-play track');
        $('i[data-target="' + playingSondId + '"]').attr('class', 'fas fa-pause track');
    }).get(0);
    var playing = false;
    var playingSondId;

    $("#dialog").dialog({

        autoOpen : false,
        closeText: "Close",
        resizable: false,
        draggable: false,
        modal : true,
        buttons: [
            {
                text: "Ok",
                click: function() {
                    $( this ).dialog("close");
                }
            }
        ]
    });

    $("#signupdialog").dialog({

        autoOpen : false,
        closeText: "Close",
        resizable: false,
        draggable: false,
        modal : true,
        buttons: [
            {
                text: "Cool!",
                click: function() {
                    $( this ).dialog("close");
                }
            },
            {
                text: "Login",
                click: function() {

                    $(this).dialog("close");
                    $('#userlogin').trigger('click');
                }
            }
        ]
    });

    $(function(){

        var albumTitle = $('#albumTitle').val();
        var albumArtist = $('#albumArtist').val();
        $('#wikiLink').attr('href', 'https://en.wikipedia.org/wiki/Special:Search?search=' + albumArtist + ' ' + albumTitle);
    });


    $('.track').on('click', function(){

        var element = this;
        if (playingSondId === $(element).data('target')) {
            if (playing) {

                audio.pause();
                $(element).attr('class', 'fa fa-play track');
                playing = false;

            } else {

                audio.play();
                $(element).attr('class', 'fas fa-pause track');
                playing = true;
            }
        } else {

            $('.track').attr('class', 'fa fa-play track');
            audio.pause();
            var songId = $(element).data('target');
            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/beatify-web/api/songs',
                cache: true,
                method: 'GET',
                dataType: 'text',
                data: { id: songId },
                success: function (result) {

                    var songInfo = $.parseJSON(result);
                    if (songInfo["id"] === -1) {

                        alert(songInfo["message"]);
                        return false;
                    }
                    playingSondId = songInfo['id'];
                    audio.src = songInfo['serverURL'];
                    audio.play();
                    playing = true;
                    $(element).attr('class', 'fas fa-pause track');
                    if (songInfo["album"]["id"] == $('#albumId').val()) {
                        $('#playingSongInfo').text(songInfo["title"]);
                    }
                    $('#plList').empty();
                    tracks = [];
                    addToPlayList(songInfo, false);
                    $('.plSel').removeClass('plSel');
                    $('#plList li:eq(0)').addClass('plSel');
                }
            });
        }
    });

    $('.addToPlaylist').on('click', function () {

        var found = false;
        var foundIndex = null;
        if (tracks.length > 0) {
            for (var i = 0; i < tracks.length; i++) {

                if(tracks[i].id === $(this).data('target')) {

                    found = true;
                    foundIndex = i;
                    break;
                }
            }
        }

        if (found) {

            $('#dialog').dialog("open");
        } else {

            var songId = $(this).data('target');
            getSongInfo(songId, false);
        }
    });

    function getSongInfo(id, shouldLoad) {


        $.ajax({

            type: 'GET',
            url: 'http://localhost:8080/beatify-web/api/songs',
            cache: true,
            method: 'GET',
            dataType: 'text',
            data: { id: id },
            success: function (result) {

                var songInfo = $.parseJSON(result);
                if (songInfo["id"] === -1) {

                    alert(songInfo["message"]);
                    return false;
                }
                addToPlayList(songInfo, shouldLoad);
            }
        });
    }

    $(function(){

        if (playing) {

            $('i[data-target="' + playingSondId + '"]').attr('class', 'fas fa-pause track');
            tracks.forEach(function(value) {

                if (value.id == playingSondId && $('#albumTitle').val() == value.album["title"])
                    $('#playingSongInfo').text(value.name);
            });
        }

        var songsTab = $('#songs-tab');
        var infoTab = $('#info-tab');
        var membersTab = $('#members-tab');

        songsTab.css('background-color', 'rgb(0, 127, 246)');
        infoTab.css('background-color', 'transparent');
        membersTab.css('background-color', 'transparent');

        songsTab.on('click', function() {

            infoTab.removeClass('btn-primary');
            membersTab.removeClass('btn-primary');
            songsTab.addClass('btn-primary');
            songsTab.css('background-color', 'rgb(0, 127, 246)');
            infoTab.css('background-color', 'transparent');
            membersTab.css('background-color', 'transparent');
        });

        infoTab.on('click', function() {

            songsTab.removeClass('btn-primary');
            membersTab.removeClass('btn-primary')
            infoTab.addClass('btn-primary');
            infoTab.css('background-color', 'rgb(0, 127, 246)');
            songsTab.css('background-color', 'transparent');
            membersTab.css('background-color', 'transparent');
        });

        membersTab.on('click', function(){

            songsTab.removeClass('btn-primary');
            infoTab.removeClass('btn-primary');
            membersTab.addClass('btn-primary');
            membersTab.css('background-color', 'rgb(0, 127, 246)');
            songsTab.css('background-color', 'transparent');
            infoTab.css('background-color', 'transparent');
        });

    });

    function loadTrack(id) {

        if (tracks[id].album.id == $('#albumId').val()) {

            $('#playingSongInfo').text(tracks[id].name);
        }
        $('.plSel').removeClass('plSel');
        $('#plList li:eq(' + id + ')').addClass('plSel');
        index = id;
        $('.img img').attr("src", tracks[id].albumcover["serverURL"]);
        playingSondId = tracks[id].id;
        audio.src = tracks[id].file;
    }

    function playTrack(id) {

        if (trackCount > 0) {

            loadTrack(id);
            audio.play();
        }
    }

    function unloadPlayList() {

        audio.pause();
        $('#songInfo').empty();
        $('#plList').empty();
        $('.img img').attr("src", "http://localhost:8080/beatify-web/resources/images/webimages/logo.png");
    }

    function checkPlaylistCount() {

        if (trackCount === 0) {

            $('#plwrap').append('<h3>Playlist Empty!</h3>');
        } else {

            $('h3').remove();
        }
    }

    function addToPlayList(songInfo, shouldLoad) {

        tracks.push({
            "id": songInfo['id'],
            "track": ++counter,
            "name": songInfo['title'],
            "duration": songInfo["duration"],
            "file": songInfo['serverURL'],
            "albumcover": songInfo["album"]["albumArtURL"],
            "album": songInfo["album"],
            "artists": songInfo["album"]["artists"],
            "bandSong": songInfo["album"]["bandAlbum"],
            "band": songInfo["album"]["band"]
        });

        trackCount = tracks.length;
        checkPlaylistCount();

        var trackName = songInfo['title'],
            trackDuration = songInfo['duration'];
        // if (trackNumber.toString().length === 1) {
        //     trackNumber = '0' + trackNumber;
        // }

        $('#plList').append('<li style="cursor: pointer;" id="song' + songInfo['id'] + '"> \<div class="plItem"> \<span class="plNum"><i class="fa fa-trash delete" title="Remove from playlist"></i></span> \<span class="plTitle">&nbsp;' + trackName + '</span> \<span class="plLength">' + trackDuration + '</span> \</div> \</li>');
        $('#song' + songInfo['id']).on('click', function (e) {

            if ($(e.target).is('i')) {

                $(this).slideUp(300, function () {

                    var id = $(this).index();
                    audio.pause();
                    playing = false;
                    playingSondId = 0;
                    audio.currentTime = 0;
                    tracks.splice(id, 1);
                    trackCount = tracks.length;
                    $('.track').attr('class', 'fa fa-play track');
                    $(this).remove();
                    checkPlaylistCount();
                });
            } else {

                var id = parseInt($(this).index());
                // if (id !== index) {
                //     playTrack(id);
                // }
                playingSondId = tracks[id]['id'];
                playing = true;
                $('.track').attr('class', 'fa fa-play track');
                $('i[data-target="' + playingSondId + '"]').attr('class', 'fas fa-pause track');
                playTrack(id);
            }
        });

        if (shouldLoad) {

            playTrack(0);
        }
    }

    $(document).on('pjax:success', function(){

        $(document).pjax('a', '.dynamic', {
            fragment: '.dynamic',
            timeout: 0
        });

        $('#btnNext').on('click', function () {
            if ((index + 1) < trackCount) {
                index++;
                playTrack(index);
            } else {
                audio.pause();
                index = 0;
                playTrack(index);
            }
        });

        $('#btnPrev').on('click', function () {
            if ((index - 1) > -1) {
                index--;
                playTrack(index);
            } else {
                audio.pause();
                index = 0;
                playTrack(index);
            }
        });

        $("#dialog").dialog({

            autoOpen : false,
            closeText: "Close",
            resizable: false,
            draggable: false,
            modal : true,
            buttons: [
                {
                    text: "Ok",
                    click: function() {
                        $( this ).dialog("close");
                    }
                }
            ]
        });

        $("#signupdialog").dialog({

            autoOpen : false,
            closeText: "Close",
            resizable: false,
            draggable: false,
            modal : true,
            buttons: [
                {
                    text: "Cool!",
                    click: function() {
                        $( this ).dialog("close");
                    }
                },
                {
                    text: "Login",
                    click: function() {

                        $(this).dialog("close");
                        $('#userlogin').trigger('click');
                    }
                }
            ]
        });

        $(function(){

            var albumTitle = $('#albumTitle').val();
            var albumArtist = $('#albumArtist').val();
            $('#wikiLink').attr('href', 'https://en.wikipedia.org/wiki/Special:Search?search=' + albumArtist + ' ' + albumTitle);
        });


        $('.track').on('click', function(){

            var element = this;
            if (playingSondId === $(element).data('target')) {
                if (playing) {

                    audio.pause();
                    $(element).attr('class', 'fa fa-play track');
                    playing = false;

                } else {

                    audio.play();
                    $(element).attr('class', 'fas fa-pause track');
                    playing = true;
                }
            } else {

                $('.track').attr('class', 'fa fa-play track');
                audio.pause();
                var songId = $(element).data('target');
                $.ajax({

                    type: 'GET',
                    url: 'http://localhost:8080/beatify-web/api/songs',
                    cache: true,
                    method: 'GET',
                    dataType: 'text',
                    data: { id: songId },
                    success: function (result) {

                        var songInfo = $.parseJSON(result);
                        if (songInfo["id"] === -1) {

                            alert(songInfo["message"]);
                            return false;
                        }
                        playingSondId = songInfo['id'];
                        audio.src = songInfo['serverURL'];
                        audio.play();
                        playing = true;
                        $(element).attr('class', 'fas fa-pause track');
                        if (songInfo["album"]["id"] == $('#albumId').val()) {
                            $('#playingSongInfo').text(songInfo["title"]);
                        }
                        $('#plList').empty();
                        tracks = [];
                        addToPlayList(songInfo, false);
                        $('.plSel').removeClass('plSel');
                        $('#plList li:eq(0)').addClass('plSel');
                    }
                });
            }
        });

        $('.addToPlaylist').on('click', function () {

            var found = false;
            var foundIndex = null;
            if (tracks.length > 0) {
                for (var i = 0; i < tracks.length; i++) {

                    if(tracks[i].id === $(this).data('target')) {

                        found = true;
                        foundIndex = i;
                        break;
                    }
                }
            }

            if (found) {

                $('#dialog').dialog("open");
            } else {

                var songId = $(this).data('target');
                getSongInfo(songId, false);
            }
        });

        $(function(){

            if (playing) {

                $('i[data-target="' + playingSondId + '"]').attr('class', 'fas fa-pause track');
                tracks.forEach(function(value) {

                    if (value.id == playingSondId && $('#albumTitle').val() == value.album["title"])
                        $('#playingSongInfo').text(value.name);
                });
            }

            var songsTab = $('#songs-tab');
            var infoTab = $('#info-tab');
            var membersTab = $('#members-tab');

            songsTab.css('background-color', 'rgb(0, 127, 246)');
            infoTab.css('background-color', 'transparent');
            membersTab.css('background-color', 'transparent');

            songsTab.on('click', function() {

                infoTab.removeClass('btn-primary');
                membersTab.removeClass('btn-primary');
                songsTab.addClass('btn-primary');
                songsTab.css('background-color', 'rgb(0, 127, 246)');
                infoTab.css('background-color', 'transparent');
                membersTab.css('background-color', 'transparent');
            });

            infoTab.on('click', function() {

                songsTab.removeClass('btn-primary');
                membersTab.removeClass('btn-primary')
                infoTab.addClass('btn-primary');
                infoTab.css('background-color', 'rgb(0, 127, 246)');
                songsTab.css('background-color', 'transparent');
                membersTab.css('background-color', 'transparent');
            });

            membersTab.on('click', function(){

                songsTab.removeClass('btn-primary');
                infoTab.removeClass('btn-primary');
                membersTab.addClass('btn-primary');
                membersTab.css('background-color', 'rgb(0, 127, 246)');
                songsTab.css('background-color', 'transparent');
                infoTab.css('background-color', 'transparent');
            });

        });
    });
});