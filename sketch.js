var hero, sadhero, happyhero;
var battery1;
var battS, battStock;
var chargedTime, lastCharged, feed, addBatt;

function preload()
{
  heroImg = loadAnimation("heroRun1.png", "heroRun2.png", "heroRun3.png", "heroRun4.png", "heroRun5.png", "heroRun6.png", "heroRun7.png", "heroRun8.png", "heroRun9.png");
  tr1Img = loadImage("treadMill.png");
}

function setup()
{
  database = firebase.database()
  createCanvas(1000,400);

  battery1 = new BatterySource();

  battStock = database.ref('Battery');
  battStock.on("value", readStock);

  hero = createSprite(800,200,150,150);
  hero.addAnimation('herun', heroImg);
  hero.frameDelay = 2
  hero.scale = 1;

  tr1 = createSprite(810,235,150,150);
  tr1.addImage(tr1Img);
  tr1.scale = 0.25;

  charge = createButton("Feed the hero");
  charge.position(730,70);
  charge.mousePressed(chargeHero);

  addBatt = createButton("Add Battery");
  addBatt.position(830,70);
  addBatt.mousePressed(addBattCharge);
}

function draw()
{
  background("grey");

  battery1.display();

  chargedTime = database.ref('timeOfCharge');
  chargedTime.on("value", function (data){
    lastCharged = data.val();
  })

  fill(225,224,254);
  textSize(15);
  if(lastCharged >= 12){
    text("Last Charged: " + lastCharged %12 + "PM", 30, 30);
  }else if (lastCharged == 0){
    text("Last Charged: 12AM", 30, 30);
  }else{
    text("Last Charged: " + lastCharged + "AM", 30, 30);
  }

  drawSprites();

}

function readStock(data){
  battS = data.val();
  battery1.loadBatteryInfo(battS);
}

function chargeHero()
{
  
  battery1.loadBatteryInfo(battery1.uploadBattery()-1);

  database.ref('/').update
  ({
    Battery: battery1.uploadBattery(),
    timeOfCharge : hour()

  })

}

function addBattCharge(){
  battS++;
  database.ref('/').update({
    Battery : battS
  })
}
