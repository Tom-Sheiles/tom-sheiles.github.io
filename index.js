var canvas = document.getElementById("canvas")
var welcome = document.getElementById("welcome")
var ctx = canvas.getContext("2d");
window.onresize = SetCanvasSize;

var stars = []
var numberOfStars = 900;
var minSpeed = 2;
var minSize = 0.1;
var centerSquareAmount = 350;
var shouldWarp = false;

var xCenter, yCenter;

SetCanvasSize();

function SetCanvasSize()
{
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-20;
    xCenter = canvas.width/2;
    yCenter = canvas.height/2;

    init();
}

welcome.addEventListener("click", () =>{
    shouldWarp = true;
    window.location.href = "https://github.com/Tom-Sheiles"
})

function RandomRange(min, max)
{
    return Math.random() * (max - min) + min;
}

function renderLoop()
{
    if(!shouldWarp)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < numberOfStars; i++){

        ctx.beginPath();
        ctx.arc(stars[i].posX, stars[i].posY, stars[i].size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        stars[i].posX += stars[i].xq * stars[i].s;
        stars[i].posY += stars[i].yq * stars[i].s;
        stars[i].size += 0.01;
        stars[i].s += 0.05;

        if(stars[i].posX >= canvas.width || stars[i].posY >= canvas.height || stars[i].posX < 0 || stars[i].posY < 0)
        {
            stars[i].posX = RandomRange((canvas.width/2)-centerSquareAmount, (canvas.width/2)+centerSquareAmount);
            stars[i].posY = RandomRange((canvas.height/2)-centerSquareAmount, (canvas.height/2)+centerSquareAmount);
            stars[i].size = minSize;
            stars[i].s = minSpeed;

            let xq = stars[i].posX-xCenter;
            let yq = stars[i].posY-yCenter;
            let mag = Math.sqrt((xq*xq) + (yq*yq));

            xq /= mag;
            yq /= mag
            stars[i].xq = xq;
            stars[i].yq = yq;
        }
    }

    window.requestAnimationFrame(renderLoop);
}

function init(){
    ctx.fillStyle = "#ffffff"
    stars = []

    for(let i = 0; i < numberOfStars; i++){
        let x = RandomRange(0, canvas.width);
        let y = RandomRange(0, canvas.height);
        let a = RandomRange(0, 360);

        let xq = x-xCenter;
        let yq = y-yCenter;
        let mag = Math.sqrt((xq*xq) + (yq*yq));

        xq /= mag;
        yq /= mag

        stars.push({posX: x, posY: y, xq: xq, yq: yq, s:minSpeed, size: minSize})
    }

    window.requestAnimationFrame(renderLoop);
}
