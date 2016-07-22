var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var car = {
    x: 900,
    y: 650,
};


window.addEventListener('mousedown', mousedn, true);

var pressed = false;

function mousedn(e) {
    var rect = canvas.getBoundingClientRect();
    msx = e.pageX - rect.left;
    msy = e.pageY - rect.top;
    if (msx > car.x - 103 && msx < car.x + 103) {
        if (msy > car.y - 57 && msy < car.y + 57) {
            pressed = true;
            console.log(pressed);
        } 
    }
    
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	var yellowCar = new Image();

	if (pressed == true) {
    	car.y -= 5;	
    	yellowCar.src = "img/truck2.png";
    } else {
    	car.x -= 5;
    	yellowCar.src = "img/truck1.png";
    }
    
	yellowCar.onload = function () {
    	ctx.drawImage(yellowCar, car.x, car.y);
	};

	var bengkelMotor = new Image();
	bengkelMotor.src = "img/BengkelMotor.png"
	ctx.drawImage(bengkelMotor, 50, 100);

    var bengkelMobil = new Image();
    bengkelMobil.src = "img/BengkelMobil.png"
    ctx.drawImage(bengkelMobil, 550, 100);

    var bengkelTruk = new Image();
    bengkelTruk.src = "img/BengkelTruk.png"
    ctx.drawImage(bengkelTruk, 1050, 100);
}

setInterval(render, 100);