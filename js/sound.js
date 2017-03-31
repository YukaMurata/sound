$(function () {
    var audio = {};
    var dir = {'sound/'};
    var file_list = [
        {name:'01', file:'01.mp3'},
        {name:'01', file:'01.mp3'},
        {name:'01', file:'01.mp3'},
        {name:'01', file:'01.mp3'},
        {name:'01', file:'01.mp3'}
    ];

    var currentstamp;

    var load = function () {
        var loaded_file = 0;
        var fileLoad = function () {
            loaded_file += 1;
            if(loaded_file >= file_list.length){
                addEvent();
            }
        };

        file_list.forEach(function (file) {
            audio[file.name] = new Audio(dir + file.file);
            if(typeof audio[file.name].onloadeddata !== 'undefined') {
                audio[file.name].onloadeddata = fileLoad;
            }else{
                audio[file.name].onload = fileLoad;
            }
            audio[file.name].preload = 'auto';
        });
    };

    var soundPlay = function (currentstamp) {
        audio[currentstamp].play();
    };

    var soundPause = function () {
        if(currentstamp) {
            audio[currentstamp].pause();
            audio[currentstamp].currentTime = 0;
        }
    };
    
    function addEvent() {
        $('.sound_list_item').click(function () {
            soundPause();
            currentstamp = $(this).attr('data-stamp');
            soundPlay(currentstamp);
        });
    }

    load();
});