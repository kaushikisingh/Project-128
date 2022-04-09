song1="";
song2="";
song1status="";
song2satus="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scorerightWrist=0;
scoreleftWrist=0;

function modelLoaded()
{
    console.log("model is loaded");
}
function preload() 
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    if(scorerightWrist>0.2)
    {
        circle(rightWristx,rightWristy,20);
        song2.stop();
        if(song1status==false)
        {
            song1.play();
            document.getElementById("songname").innerHTML="playing first song";
        }
    }
    if(scorelefttWrist>0.2)
    {
        circle(leftWristx,leftWristy,20);
        song1.stop();
        if(song2status==false)
        {
            song2.play();
            document.getElementById("songname").innerHTML="playing second song";
        }
    }
}
function songname()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx="+leftWristx,"leftWristy="+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx="+rightWristx,"rightWristy="+rightWristy);
    }
}