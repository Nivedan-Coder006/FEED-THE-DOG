var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var time
var feed,lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  lastFed = database.ref("FeedTime")
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  hour1 = hour()
  time = hour1

}

function draw() {
  background(46,139,87);
  stroke(4)
  fill(255)
  textSize(30)
  text("Last Fed: " + time,700,95)
  foodObj.display();

  //write code to read fedtime value from the database 

  if(time >= 12 && time<=24){
    time = time-12 + " PM"
  }if(time>=1 && time<=11){
    time = time + " AM"
  }if(time === 0){
    time = time + 12 + " AM"
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0)
    database.ref('/').update({
      Food:food_stock_val
    });
  } 
  else{
    foodObj.updateFoodStock(food_stock_val-1)
    database.ref('/').update({
      Food:food_stock_val
    });
  }
  database.ref("/").update({
    FeedTime:time
  })

}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


