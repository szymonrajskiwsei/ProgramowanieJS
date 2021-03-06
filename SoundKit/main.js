document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#btnRecord').addEventListener('click', recordChannel);
document.querySelector('#btnPlay').addEventListener('click', playChannel);

let isRecording = false;

const channel = [];
const channelArray = []; //"boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"
let recordStart = Date.now();

class RecorderSound
{
    constructor(soundName, time)
    {
        this.SoundName = soundName;
        this.Time = time;
    }
}

function onKeyPress(ev)
{
    let sound;
    let soundname;
    switch(ev.code) // tablicą zamiast switchem, uprościć soundanme przypisywaine
    {     
        case 'KeyA':
            soundname = "boom";
            sound = document.querySelector('#boom');
            break;

        case 'KeyS':
            soundname = "clap";
            sound = document.querySelector('#clap');
            break;

        case 'KeyD':
            soundname = "hihat";
            sound = document.querySelector('#hihat');
            break;

        case 'KeyF':
            soundname = "kick";
            sound = document.querySelector('#kick');
            break;

        case 'KeyG':
            soundname = "openhat";
            sound = document.querySelector('#openhat');
            break;
        
        case 'KeyH':
            soundname = "ride";
            sound = document.querySelector('#ride');
            break;
            
        case 'KeyJ':
            soundname = "snare";
            sound = document.querySelector('#snare');
            break;

        case 'KeyK':
            soundname = "tink";
            sound = document.querySelector('#tink');
            break;

        case 'KeyL':
            soundname = "tom";
            sound = document.querySelector('#tom');
            break;
    }
    if(sound)
    {
        if(isRecording)
        {
            const keyPressTime = Date.now() - recordStart;
            let newSound = new RecorderSound(soundname, keyPressTime);

            channel.push(newSound);
        }       
        sound.play();
    }
}

function recordChannel()
{
    const btn = document.querySelector('#btnRecord');
    if(isRecording)
    {
        btn.innerHTML = "Start recording";
        isRecording = false;
        btn.className = "btnStartRecording";    
    }
    else
    {      
        btn.innerHTML = "Stop recording";
        isRecording = true;
        btn.className = "btnStopRecording";

        channel.length = 0;
        recordStart = Date.now();
    }
}

function playChannel()
{
    for(let i = 0; i < channel.length; i++)
    {
        const soundObject = channel[i];

        if(i == 0) playSound(soundObject.SoundName);
        else
        {
            setTimeout( () =>
            {
                playSound(soundObject.SoundName);
            }, soundObject.Time)
        }      
    }
}

function playSound(soundName)
{
    const sound = document.querySelector("#" + soundName);
    sound.play();
}