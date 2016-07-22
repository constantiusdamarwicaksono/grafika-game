var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

gameMode = "running"; //win, running or lose
gameSkor =0;
jumlahKendaraan = 200;
successClean = 0;
jumlahKotor=0;
msx = 0;
msy=0;
coinReady=false;
spriteReady = false;
loadReady=false;
maxSuccess  = 0;

var loadScreen = new Image();
loadScreen.src="loadScreenFull.png";
loadScreen.onload=function(){
    loadReady=true;
}
var gambar = new Image();
gambar.src = "Sprite.png";
var coin = new Image();
coin.src="coin.png";
gambar.onload= function(){
    spriteReady = true;   
};
coin.onload=function(){
    coinReady=true;
}

var audioSound = new Audio("gundulmu.mp3");
audioSound.loop=true;
audioSound.addEventListener("ended",function(){
    this.currentTime=0;
    this.play();
},false);
audioSound.play(); 

var tireScreech = new Audio("tireScreech.mp3");
var ler = new Audio("ler.mp3");
toRadians= Math.PI/180;
putaran =1;
//class kendaraan
function newKendaraan(jenis,x,y,kotor){
    this.x = x;
    this.y = y;
   
    this.speed=5;
    this.ditekan==false;
    this.jenis=jenis;
    this.digambar=true;
    this.pointAddtoScore=false;
    if(jenis==1){ //truck
        this.y-=5;
        this.clipX = 4;
        this.width=200;
        this.height=90;
        if(kotor==0){
            this.point = 1;
            this.clipY= 250;   
        }else{
            this.point = 10;
            this.clipY= 353;
        }

    }

    if(jenis==2){ //biasa
        this.clipX = 222;
        this.width=125;
        this.height=75;
        if(kotor==0){
            this.point = 2;
            this.clipY= 262;
        }else{
            this.point = 7;
            this.clipY= 357;
        }

    }

    if(jenis==3){ //polisi
        this.clipX = 369;
        this.width=125;
        this.height=75;
        if(kotor==0){
            this.point = 3;
            this.clipY= 262;
        }else{
            this.point = 8;
            this.clipY= 357;
        }

    }

    if(jenis==4){ //motor
        this.y+=15;
        this.clipX = 517;
        this.width=88;
        this.height=50;
        if(kotor==0){
            this.point = 3;
            this.clipY= 271;
        }else{
            this.point = 5;
            this.clipY= 369;
        }

    }
     if(jenis==5){ //becak
        this.y=475;
        this.width=100;
        this.height=72;
        this.clipY= 470;
        this.speed=3;
        if(kotor==0){
            this.clipX = 521;
            this.point = 0;
            
        }else{
            this.point = 0;
            this.clipX= 623;
        }

    }
    this.xAwal = this.x;
    this.yAwal = this.y;
    this.tujuanX=-200;
    this.tujuanY=this.y;
    this.kotor=kotor;
    if(kotor==1){
        jumlahKotor++;
    }

};

positionX = 810;
positionY = 312;
kendaraan = [];
for(var i=0;i<jumlahKendaraan;i++){
    if(i%2==0){
        positionY=305;
    }else{
        positionY=390;
    }
    var jenis = Math.round((Math.random()*4)+1);
    var kotor = Math.round((Math.random()*1));
    kendaraan[i] = new newKendaraan(jenis,positionX,positionY,kotor);
    positionX+=200;
};
positionX-=1000;
console.log(kendaraan[jumlahKendaraan-1].x,positionX);
maxSuccess=Math.round(jumlahKotor/3);
console.log(maxSuccess);
function pembalikKendaraan(i,jenis,kotor){
    //1 truck 2 biasa 3 polisi 4 motor
    if(jenis==1){
        kendaraan[i].width=85;
        kendaraan[i].height=205;
        kendaraan[i].clipY=257;
        if(kotor){
            kendaraan[i].clipX=708;
        }else{
            kendaraan[i].clipX=618;
        }
    }
    if(jenis==2){
        kendaraan[i].width=70;
        kendaraan[i].height=130;
        kendaraan[i].clipY=470;
        if(kotor){
            kendaraan[i].clipX=96;
        }else{
            kendaraan[i].clipX=7;
        }
    }
    if(jenis==3){
        kendaraan[i].width=70;
        kendaraan[i].height=130;
        kendaraan[i].clipY=470;
        if(kotor){
            kendaraan[i].clipX=283;
        }else{
            kendaraan[i].clipX=192;
        }
    }
    if(jenis==4){
        kendaraan[i].width=45;
        kendaraan[i].height=92;
        kendaraan[i].clipY=478;
        if(kotor){
            kendaraan[i].clipX=426;
        }else{
            kendaraan[i].clipX=369;
        }
    }
}

window.addEventListener("keydown",function(e){
    if(e.keyCode==40){
        console.log(jumlahKotor);
    }
});
window.addEventListener('mousedown', mousedn, true);
function mousedn(e) {
    var rect = canvas.getBoundingClientRect();
    msx = e.pageX - rect.left;
    msy = e.pageY - rect.top;

    for (var i = 0; i<jumlahKendaraan; i++) {
         if(msx>=kendaraan[i].x&&msx<=kendaraan[i].x+kendaraan[i].width&&msy>=kendaraan[i].y&&msy<=kendaraan[i].y+kendaraan[i].height){
            if(!kendaraan[i].ditekan&&kendaraan[i].jenis!=5){
                kendaraan[i].ditekan=true;
                kendaraan[i].speed+=2;
                kendaraan[i].y-=Math.round(kendaraan[i].height/2);
                kendaraan[i].tujuanX=kendaraan[i].x;
                kendaraan[i].tujuanY= -200;
                pembalikKendaraan(i,kendaraan[i].jenis,kendaraan[i].kotor); 
                //console.log(kendaraan[i].kotor);
                ler.play();
            }
            
         }     
     };    
}

window.addEventListener("mousemove",function(e){
    var rect = canvas.getBoundingClientRect();
    msx = e.pageX - rect.left;
    msy = e.pageY - rect.top;
});


function drawJalan(){
    context.drawImage(gambar,4,876,835,290,0,0,835,295);
    context.drawImage(gambar,4,679,810,190,0,290,810,190);
    context.drawImage(gambar,4,1173,800,130,0,480,800,130);
}
function drawBengkel(){
    context.drawImage(gambar,735,504,56,69,747,10,56,69);
    context.drawImage(gambar,286,616,40,55,10,-0,40,55);
    context.drawImage(gambar,111,615,56,55,222,13,56,55);
    context.drawImage(gambar,388,616,40,55,227,65,40,55);
    context.drawImage(gambar,235,616,40,55,473,13,40,55);
    context.drawImage(gambar,336,616,40,55,495,175,40*0.9,55*0.9)
    context.drawImage(gambar,0,0,800,233,0,5,800,233);//bengkel
    context.drawImage(gambar,186,617,40,55,190,205,40,55);
    context.drawImage(gambar,186,617,40,55,665,215,40,55);
    context.drawImage(gambar,12,615,82,59,465,205,82,59);   
    context.drawImage(gambar,735,504,56,69,-20,211,56,69);
}
function drawMobil(){
    for(var i=0;i<jumlahKendaraan;i++){
        if(kendaraan[i].digambar==true){
            context.drawImage(gambar,kendaraan[i].clipX,kendaraan[i].clipY,kendaraan[i].width,kendaraan[i].height,kendaraan[i].x,kendaraan[i].y,kendaraan[i].width,kendaraan[i].height);
        }
    }
}
function locomotiveKendaraan(){
    for(var i=0;i<jumlahKendaraan;i++){
        if(kendaraan[i].digambar==true){
            if(kendaraan[i].x>kendaraan[i].tujuanX){
                kendaraan[i].x-=kendaraan[i].speed;
            }else{
                if(!kendaraan[i].ditekan){      
                    positionX+=10;
                    kendaraan[i].x=positionX;
                }
            }
            if(kendaraan[i].y>kendaraan[i].tujuanY){
                kendaraan[i].y-=kendaraan[i].speed;
            }
        }
            
    }
}
function checkMasukBengkel(){
    for(var i=0;i<jumlahKendaraan;i++){
        if(kendaraan[i].y<235&&kendaraan[i].digambar==true&&!kendaraan[i].pointAddtoScore){
            if(kendaraan[i].x>26&&kendaraan[i].x+kendaraan[i].width<144){
                    if(kendaraan[i].jenis==4&&kendaraan[i].kotor==1){
                        gameSkor+=kendaraan[i].point;
                        successClean++;
                        jumlahKotor--;
                    }else{
                        gameSkor-=kendaraan[i].point;
                    }
                    kendaraan[i].pointAddtoScore=true;
            } else if(kendaraan[i].x>260&&kendaraan[i].x+kendaraan[i].width<420){
                    if((kendaraan[i].jenis==2||kendaraan[i].jenis==3)&&kendaraan[i].kotor==1){
                        gameSkor+=kendaraan[i].point;
                        successClean++;
                        jumlahKotor--;
                    }else{
                        gameSkor-=kendaraan[i].point;
                    }
                    kendaraan[i].pointAddtoScore=true;
            
            } else if(kendaraan[i].x>530&&kendaraan[i].x+kendaraan[i].width<=684){
                    if(kendaraan[i].jenis==1&&kendaraan[i].kotor==1){
                        gameSkor+=kendaraan[i].point;
                        successClean++;
                        jumlahKotor--;
                    }else{
                        gameSkor-=kendaraan[i].point;
                    }
                    kendaraan[i].pointAddtoScore=true;
            } else{
                gameSkor-=kendaraan[i].point;
                kendaraan[i].pointAddtoScore=false;
                kendaraan[i].digambar=false;
                ler.play();
                if(kendaraan[i].kotor==1){
                    jumlahKotor--;
                }
            }
            
            if(successClean>maxSuccess){
                successClean=maxSuccess;
            }
            
        }
        if(kendaraan[i].y<60){
                kendaraan[i].digambar=false;
        }
        //console.log(jumlahKotor);
    }
}

function drawInfoBar(){
    context.fillStyle="#4B7BBC";
    context.fillRect(0,540,800,60);
    context.drawImage(coin,10,543);
    context.font="bold 55px Arial";
    context.fillStyle="#184889";
    context.fillText(gameSkor,70,590);
     context.font="20px Arial";
     context.fillText("CLEAN METER",575,563);
     context.fillStyle="#00FF00";
     var xpos=550;
     for(var i=0;i<successClean;i++){
        context.fillRect(xpos,569,Math.round(200/maxSuccess),25);
        xpos+=Math.round(200/maxSuccess);
     }

    context.strokeRect(550,569,Math.round(200/maxSuccess)*maxSuccess,25);

    context.fillStyle="#184889";
    context.fillText("empty",493,587);
    context.fillText("full",Math.round(200/maxSuccess)*maxSuccess+552,587);
}
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(loadReady){
        if(spriteReady&&coinReady){
            if(successClean<maxSuccess&&gameMode=="running"){
                drawJalan();
                locomotiveKendaraan();
                checkMasukBengkel();
                drawMobil();
                drawBengkel();
                context.font = "15px Arial";/*
                context.fillText(msx+" "+msy,10,20);
                context.fillText(gameSkor,10,40);*/
                if(gameSkor<0){
                    gameMode="lose";
                }
                if(successClean==maxSuccess){
                    gameMode="win";
                }
            }else{
                sessionStorage.setItem("lastScore",gameSkor);
                if(gameMode!="lose"){
                    sessionStorage.setItem("status","win"); 
                }else{
                    sessionStorage.setItem("status","lose"); 
                }
                stopAllandGo();
            }

            drawInfoBar();      
        }else{
            if(putaran<360){
                putaran+=7;
            }else{
                putaran=1;
            }
            context.save();
            context.fillStyle="#FFFFFF";
            context.fillRect(0,0,900,600);
            context.translate(400,250);
            context.rotate(2*putaran*toRadians);
            context.drawImage(loadScreen,0,0,132,132,-66,-66,132,132);
            context.restore();
            context.save();
            context.translate(400,250);
            context.rotate(-1*putaran*toRadians);
            context.drawImage(loadScreen,132,0,72,72,-36,-36,72,72);
            context.restore();
            context.drawImage(loadScreen,203,0,27,28,400-13,250-14,27,27);
            context.drawImage(loadScreen,230,0,260,70,400-132,330,253,63);
        }
    }
        
	
    
}

var renderAll = setInterval(render, 1000/60);

function stopAllandGo(){
    clearInterval(renderAll);
    window.location.href="end.html";
}
