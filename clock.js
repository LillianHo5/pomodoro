var minutes = 25;
var seconds = '00';
var minutes_interval;
var seconds_interval;
var short_clicked = false;
var long_clicked = false;

var pomodoro_clicked = false;
var ring = new Audio('bell.mp3');
var pomodoro = document.getElementById('pomodoro');
var shortBreak = document.getElementById('short_break');
var longBreak = document.getElementById('long_break');

function start() {
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}

shortBreak.addEventListener('click', function handleShortClick() {
    short_clicked = true;
    if (long_clicked || pomodoro_clicked) {
        if (long_clicked) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            long_clicked = false;
            longBreak.disabled = false;
        }
        if (pomodoro_clicked) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            pomodoro_clicked = false;
            pomodoro.disabled = false;
        }
    }
    break_time(4, 59);
});

longBreak.addEventListener('click', function handleLongClick() {
    long_clicked = true;
    if (short_clicked || pomodoro_clicked) {
        if (short_clicked) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            short_clicked = false;
            shortBreak.disabled = false;
        }
        if (pomodoro_clicked) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            pomodoro_clicked = false;
            pomodoro.disabled = false;
        }
    }
    break_time(9, 59)
});

function break_time(x, y) {
    if (long_clicked)
        longBreak.disabled = true;
    if (short_clicked)
        shortBreak.disabled = true;
    minutes = x;
    seconds = y;

    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;

    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);

    function minutesTimer() {
        minutes = minutes - 1;
        if(minutes < 10) { 
            minutes = '0' + minutes;
        }
        document.getElementById('minutes').innerHTML = minutes;
    }

    function secondsTimer() {
        seconds = seconds - 1;
        if(seconds < 10) { 
            seconds = '0' + seconds;
        }
        document.getElementById('seconds').innerHTML = seconds;

        if (seconds <= 0) {
            if (minutes <= 0) {
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                document.getElementById('minutes').innerHTML = '00';
                document.getElementById('seconds').innerHTML = '00';

                document.getElementById('done').innerHTML =
                    'Break time is over! Click \'Pomodoro\' to start a new study session!';

                document.getElementById('done').classList.add('show_message');

                if (long_clicked) {
                    longBreak.disabled = false;
                } else if (short_clicked) {
                    shortBreak.disabled = false;
                }
                ring.play();
            }
            seconds = 60;
        }
    }
}

function pomodoro_start() {
    if (long_clicked || short_clicked) {
        if (long_clicked) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            long_clicked = false;
            longBreak.disabled = false;
        }
        if (short_clicked) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            short_clicked = false;
            shortBreak.disabled = false;
        }
    }
    pomodoro_clicked = true;
    pomodoro.disabled = true;

    minutes = 24;
    seconds = 59;

    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;

    /*
    * interval is in milliseconds 
    * 1 minute = 60,000 milliseconds 
    * 1 second = 1,000 milliseconds 
    */
    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);

    function minutesTimer() {
        minutes = minutes - 1;
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        document.getElementById('minutes').innerHTML = minutes;
    }

    function secondsTimer() {
        seconds = seconds - 1;
        if(seconds < 10) { 
            seconds = '0' + seconds;
        }
        document.getElementById('seconds').innerHTML = seconds;

        if (seconds <= 0) {
            if (minutes <= 0) {
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);

                document.getElementById('done').innerHTML =
                    'Session completed! Take a break.';

                document.getElementById('done').classList.add('show_message');
                pomodoro.disabled = false;
                ring.play();
            }
            seconds = 60;
        }
    }
}
