noseX=0;
noseY=0;
difference = 0; //  differnce between x coordinates of left and right hand wrist
rightWristX = 0; //hold x coordinates of right hand wrist
leftWristX = 0; // o hold x coordinates of left hand wrist
function setup() {
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550, 550);
    canvas.position(560,150) // margin set position (top and left)

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!')
}

function gotPoses( results) {
    if(results.length > 0){
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("noseX = "+ noseX + " noseY = " + noseY)

        leftWristX = results[0].pose.leftWrist.x; //Code for fetching the x coordinate of left hand wrist and update leftWristX variable
        rightWristX = results[0].pose.rightWrist.x; //Code for fetching the x coordinate of right hand wrist and update leftWristX variable
        difference = leftWristX - rightWristX // finding the differnce
        difference = floor(leftWristX - rightWristX) // rounding the number
        console.log("leftWristX = " + leftWristX + " rightWristX = " + rightWristX  + " difference = " + difference )
    }
}
function draw() {
    background('#969A97')
    Text("Soni", leftWristX, rightWristX)
    document.getElementById("square_side").innerHTML = "Width and Height of a Square will be = " + difference + "px"
    fill('#F90093'); // to fill the square
    stroke('#F90093') //to create a border
    square(noseX, noseY, difference); //Code for passing x and y coordinates of the nose to the square function
}