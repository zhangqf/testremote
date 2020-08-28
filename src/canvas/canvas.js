
export const canvasInit = (text) => {
    var canvas = document.getElementById("deploy-canvas");
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 2000, 2800);
        ctx.save();
        ctx.rotate(-20*Math.PI/180);
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "white";
        for(var i = 0; i < 200; i++){
            ctx.beginPath();
            ctx.fillText(text, i%20*220, i/20*200);
            ctx.closePath();
        }
        ctx.restore();
    }

}