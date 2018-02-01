var allStarters = [];
var allDrinks = [];
var allMainCourses = [];
var allDesserts = [];

var allUsers = [];
var globalUser = null;
//User Object, used with allUser and globalUser to create a dumb database.
function User(nameIn, password, countryFrom, countryTo, starterDishes, drinks, maincourses, desserts, flavorProfile){
  this.name = nameIn;
  this.password = password;
  this.from = countryFrom;
  this.to = countryTo;
  this.starters = starterDishes;
  this.drinks = drinks;
  this.maincourses = maincourses;
  this.desserts = desserts;
  this.flavProfile = null;
}
//Dish Object, used to dynamically generate Dishes that the current globalUser would prefer.
function Dish(nameIn, countryFrom, course, flavProfile, cost, img){
  this.name = nameIn;
  this.countryFrom = countryFrom;
  this.course = course;
  this.flavProfile = flavProfile;
  this.cost = cost;
  this.img = img;
}
//Flavor Profile object used to describe the properties of the food.
function FlavorProfile(thisSweet, thisSalty, thisBitter, thisSour, thisUmani){
  this.sweet = thisSweet;
  this.salty = thisSalty;
  this.bitter = thisBitter;
  this.sour = thisSour;
  this.umani = thisUmani;
}
//Used to generate a user from the initial createUserForm
function generateUser(nameIn, password, countryFrom, countryTo, allergies){
  var newUser = new User(nameIn, password, countryFrom,countryTo,[],[],[],[],[0,0,0,0,0]);
  var arrLength = allUsers.length;
  if(nameIn == ""){
    alert("Enter a username");
    return;
  } else if(password == ""){
    alert("Enter a password");
    return;
  }
  for(var i = 0; i < arrLength; i ++){
    if(allUsers[i].name == newUser.name){
      alert("Sorry this name is already Taken.");
      return false;
    } else {
      allUsers.push(newUser);
      globalUser = allUsers[allUsers.length-1];
      return true;
    }
  }
  if(allUsers.length <= 0){
    allUsers.push(newUser);
    globalUser = allUsers[0];
    return true;
  }
}
//Sets globalUser to profile if user entered correct username or password.
function login(userName, password){
  var currentUser = null;
  var usernameState = false;
  var passwordState = false;
  for(var i = 0; i < allUsers.length; i ++){
    currentUser = allUsers[i];
    if(currentUser.name == userName && currentUser.password == password){
      globalUser = currentUser;
      return true;
    } else if(currentUser.name == userName && currentUser.password != password){
      usernameState = true;
      passwordState = false;
    }
  }
  if(usernameState == true && passwordState != true){
    alert("You entered the wrong password");
    return false;
  }
}
function displayDishesFrom(){
  $("#resultsOne").text("");
  $("#resultsOne").append("<div class = 'col-md-12'><h3>Select Starters:</h3><hr></hr></div>");
  $("#resultsTwo").text("");
  $("#resultsTwo").append("<div class = 'col-md-12'><h3>Select Drinks:</h3><hr></hr></div>");
  $("#resultsThree").text("");
  $("#resultsThree").append("<div class = 'col-md-12'><h3>Select Maincourses:</h3><hr></hr></div>");
  $("#resultsFour").text("");
  $("#resultsFour").append("<div class = 'col-md-12'><h3>Select Desserts:</h3><hr></hr></div>");

  for(var i = 0; i < allStarters.length; i ++){
    if(allStarters[i].countryFrom == globalUser.from){
      $("#resultsOne").append("<div class = 'col-md-3'><img src="+ "'" + allStarters[i].img + "'" + " alt='Picture of food' >"+ "<br>"+ "<input type='checkbox' name='selected' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>");
    }
    // + "<input type='checkbox' name='selected' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>"
  }
  for(var i = 0; i < allDrinks.length; i ++){
    if(allDrinks[i].countryFrom == globalUser.from){
      $("#resultsTwo").append("<div class = 'col-md-3'><img src="+ "'" + allDrinks[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selected' value=" + "'" + allDrinks[i].name + "'" + "+>" + allDrinks[i].name  + "</div>");
    }
  }
  for(var i = 0; i < allMainCourses.length; i ++){
    if(allMainCourses[i].countryFrom == globalUser.from){
      $("#resultsThree").append("<div class = 'col-md-3'><img src="+ "'" + allMainCourses[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selected' value=" + "'" + allMainCourses[i].name + "'" + "+>" + allMainCourses[i].name  + "</div>");
    }
  }
  for(var i = 0; i < allDesserts.length; i ++){
    if(allDesserts[i].countryFrom == globalUser.from){
      $("#resultsFour").append("<div class = 'col-md-3'><img src="+ "'" + allDesserts[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selected' value=" + "'" + allDesserts[i].name + "'" + "+>" + allDesserts[i].name  + "</div>");
    }
  }
}
// Used to display all dish objects.
function displayDishesTo(){
  $("#resultsFive").text("");
  $("#resultsFive").append("<div class = 'col-md-12'><h3>Recommended Starters:</h3><hr></hr></div>");
  $("#resultsSix").text("");
  $("#resultsSix").append("<div class = 'col-md-12'><h3>Recommended Drinks:</h3><hr></hr></div>");
  $("#resultsSeven").text("");
  $("#resultsSeven").append("<div class = 'col-md-12'><h3>Recommended Maincourses:</h3><hr></hr></div>");
  $("#resultsEight").text("");
  $("#resultsEight").append("<div class = 'col-md-12'><h3>Recommended Desserts:</h3><hr></hr></div>");

  for(var i = 0; i < allStarters.length; i ++){
    var usersStarterFlavorProfile = globalUser.getStarterFlavorProfile();

    var currentDishesFlavorProfile = allStarters[i].flavProfile;

    var margin = currentDishesFlavorProfile.subArrays(usersStarterFlavorProfile);

    if(allStarters[i].countryFrom == globalUser.to && margin.checkMargin() && !margin.checkForEqual(usersStarterFlavorProfile)){
      $("#resultsFive").append("<div class = 'col-md-3'><img src="+ "'" + allStarters[i].img + "'" + " alt='Picture of food' >"+ "<br>"+ "<input type='checkbox' name='selectedTwo' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>");
    }
  }
  for(var i = 0; i < allDrinks.length; i ++){
    var usersDrinkFlavorProfile = globalUser.getDrinkFlavorProfile();
    var currentDishesFlavorProfile = allDrinks[i].flavProfile;
    var margin = currentDishesFlavorProfile.subArrays(usersDrinkFlavorProfile);

    if(allDrinks[i].countryFrom == globalUser.to && margin.checkMargin() && !margin.checkForEqual(usersStarterFlavorProfile)){
      $("#resultsSix").append("<div class = 'col-md-3'><img src="+ "'" + allDrinks[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selectedTwo' value=" + "'" + allDrinks[i].name + "'" + "+>" + allDrinks[i].name  + "</div>");
    }
  }
  for(var i = 0; i < allMainCourses.length; i ++){
    var usersMainCourseFlavorProfile = globalUser.getMainCourseFlavorProfile();
    var currentDishesFlavorProfile = allMainCourses[i].flavProfile;
    var margin = currentDishesFlavorProfile.subArrays(usersMainCourseFlavorProfile);

    if(allMainCourses[i].countryFrom == globalUser.to && margin.checkMargin() && !margin.checkForEqual(usersStarterFlavorProfile)){
      $("#resultsSeven").append("<div class = 'col-md-3'><img src="+ "'" + allMainCourses[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selectedTwo' value=" + "'" + allMainCourses[i].name + "'" + "+>" + allMainCourses[i].name  + "</div>");
    }
  }
  for(var i = 0; i < allDesserts.length; i ++){
    var usersDessertFlavorProfile = globalUser.getDessertFlavorProfile();
    var currentDishesFlavorProfile = allDesserts[i].flavProfile;
    var margin = currentDishesFlavorProfile.subArrays(usersDessertFlavorProfile);

    if(allDesserts[i].countryFrom == globalUser.to && margin.checkMargin() && !margin.checkForEqual(usersStarterFlavorProfile)){
      $("#resultsEight").append("<div class = 'col-md-3'><img src="+ "'" + allDesserts[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selectedTwo' value=" + "'" + allDesserts[i].name + "'" + "+>" + allDesserts[i].name  + "</div>");
    }
  }
}
//Sorts what user selected and puts into users dish properties.
function sortSelectedDishesForUser(arrayOfDishObjects){
  for(var i = 0; i < arrayOfDishObjects.length; i ++){
    var currentDish = arrayOfDishObjects[i];
    if(!globalUser.checkForDishName(currentDish)){
      for(var j = 0; j < allStarters.length; j ++){
        if(allStarters[j].name == currentDish){
          globalUser.starters.push(allStarters[j]);
        }
      }
      for(var j = 0; j < allDrinks.length; j ++){
        if(allDrinks[j].name == currentDish){
          globalUser.drinks.push(allDrinks[j]);
        }
      }
      for(var j = 0; j < allMainCourses.length; j ++){
        if(allMainCourses[j].name == currentDish){
          globalUser.maincourses.push(allMainCourses[j]);
        }
      }
      for(var j = 0; j < allDesserts.length; j ++){
        if(allDesserts[j].name == currentDish){
          globalUser.desserts.push(allDesserts[j]);
        }
      }
    }
  }
}
function findDishObjectFromNameOfDish (currentDishNameIn){
  console.log(currentDishNameIn);
  for(var i = 0; i < allStarters.length; i ++){
    if(allStarters[i].name == currentDishNameIn){
      return allStarters[i];
    }
  }
  for(var i = 0; i < allDrinks.length; i ++){
    if(allDrinks[i].name == currentDishNameIn){
      return allDrinks[i];
    }
  }
  for(var i = 0; i < allMainCourses.length; i ++){
    if(allMainCourses[i].name == currentDishNameIn){
      return allMainCourses[i];
    }
  }
  for(var i = 0; i < allDesserts.length; i ++){
    if(allDesserts[i].name == currentDishNameIn){
      return allDesserts[i];
    }
  }
  return false;
}

function calculateCost(arrayOfDishObjects){
  $("#resultsNine").text("");
  var arrayLength = arrayOfDishObjects.length;
  var totalCost = 0;
  var currentDish;
  for(var i = 0; i <arrayLength; i ++){
    currentDish = findDishObjectFromNameOfDish(arrayOfDishObjects[i]);
    console.log(currentDish.name);
    if(currentDish != false){
      totalCost += currentDish.cost;
      $("#resultsNine").append("<div class = 'col-md-3'>Name: " + currentDish.name +  "<br>" + " Origin: " + currentDish.countryFrom +  "<br>" + " Cost/Unit: " + currentDish.cost +  "<br></div>");
    }
  }
  $("#resultsNine").append("<div class = 'col-md-12'>Total Cost for one of Each: " + totalCost + "<br></div>");
}

User.prototype.getStarterFlavorProfile = function(){
  var startersLength = this.starters.length;
  var startersFlavorArray = [0,0,0,0,0];
  //Generate average vector for desert
  for(var i = 0; i < startersLength; i ++){
    var currentDish = this.starters[i].flavProfile;
    startersFlavorArray = startersFlavorArray.addArrays(currentDish);
  }
  startersFlavorArray = startersFlavorArray.divideArray(startersLength);
  return startersFlavorArray;
}
User.prototype.getDrinkFlavorProfile = function(){
  var drinksLength = this.drinks.length;
  var drinksFlavorArray = [0,0,0,0,0];
  //Generate average vector for desert
  for(var i = 0; i < drinksLength; i ++){
    var currentDish = this.drinks[i].flavProfile;
    drinksFlavorArray = drinksFlavorArray.addArrays(currentDish);
  }
  drinksFlavorArray = drinksFlavorArray.divideArray(drinksLength);
  return drinksFlavorArray;
}
User.prototype.getMainCourseFlavorProfile = function(){
  var maincourseLength = this.maincourses.length;
  var maincoursesFlavorArray = [0,0,0,0,0];
  //Generate average vector for desert
  for(var i = 0; i < maincourseLength; i ++){
    var currentDish = this.maincourses[i].flavProfile;
    maincoursesFlavorArray = maincoursesFlavorArray.addArrays(currentDish);
  }
  maincoursesFlavorArray = maincoursesFlavorArray.divideArray(maincourseLength);
  return maincoursesFlavorArray;
}
User.prototype.getDessertFlavorProfile = function(){
  var dessertLength = this.desserts.length;
  var dessertsFlavorArray = [0,0,0,0,0];
  //Generate average vector for desert
  for(var i = 0; i < dessertLength; i ++){
    var currentDish = this.desserts[i].flavProfile;
    dessertsFlavorArray = dessertsFlavorArray.addArrays(currentDish);
  }
  dessertsFlavorArray = dessertsFlavorArray.divideArray(dessertLength);
  return dessertsFlavorArray;
}
User.prototype.checkForDishName = function(currentDishNameIn){
  for(var i = 0; i < this.starters.length; i ++){
    if(this.starters[i].name == currentDishNameIn){
      return true;
    }
  }
  for(var i = 0; i < this.drinks.length; i ++){
    if(this.drinks[i].name == currentDishNameIn){
      return true;
    }
  }
  for(var i = 0; i < this.maincourses.length; i ++){
    if(this.maincourses[i].name == currentDishNameIn){
      return true;
    }
  }
  for(var i = 0; i < this.desserts.length; i ++){
    if(this.desserts[i].name == currentDishNameIn){
      return true;
    }
  }
  return false;
}
Array.prototype.checkMargin = function(){
  var state = true;
  for(var i = 0; i < this.length; i ++){
    if(this[i]>2){
      //Outside difference tolerance.
      state = false;
    }
  }
  //This Array fits our .3 Tolerance.
  return state;
}
Array.prototype.addArrays = function(arrayIn) {
  var outputArray = [];
  for(var i = 0; i < arrayIn.length; i ++){
    outputArray[i] = arrayIn[i] + this[i];
  }
  return outputArray;
}
Array.prototype.divideArray = function(constant){
  var outputArray = [];
  for(var i = 0; i < this.length; i ++){
    outputArray[i] = this[i]/constant;
  }
  return outputArray;
}
Array.prototype.subArrays = function(arrayIn) {
  var outputArray = [];
  for(var i = 0; i < arrayIn.length; i ++){
    outputArray[i] = Math.abs(arrayIn[i] - this[i]);
  }
  return outputArray;
}
Array.prototype.checkForEqual = function(arrayIn){
  var arrLength = arrayIn.length;
  var state = true;
  for(var i = 0 ; i < arrLength; i ++){
    if(!arrayIn[i] == this[i]){
      state = false;
    }
  }
  return state;
}
//Used to toggle elements so the stuff is n the same page.
//Generates all Dish Objects
function generateAllDishes(){
  //PAKISTANI
  var one = new Dish("Chicken Biryani", "PAKISTAN", "Main Course", [0, 1, 0, 0, 1, 1],19.99, "images/pakistani-cuisine/maincourse-chicken-biryani.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Chicken Karahi", "PAKISTAN", "Main Course", [0, 1, 0, 0, 0, 1],11.99, "images/pakistani-cuisine/maincourse-chicken-karahi.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Chicken Qorma", "PAKISTAN", "Main Course", [0, 1, 0, 0, 0, 1],14.99, "images/pakistani-cuisine/maincourse-chickenqorma.jpg");
  allMainCourses.push(one);
  var one = new Dish("Okra subzi", "PAKISTAN", "Main Course", [0, 1, 0, 0, 0, 1],9.99, "images/pakistani-cuisine/maincourse-okrasubzi.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Lassi", "PAKISTAN", "Drink", [1, 1, 0, 0, 0, 0],2.99, "images/pakistani-cuisine/drink-lassi.jpg");
  allDrinks.push(one);
  var one = new Dish ("Kashmiri chai", "PAKISTAN", "Drink", [1, 1, 0, 0, 0, 1],4.99, "images/pakistani-cuisine/drink-kashmirichai.jpg");
  allDrinks.push(one);
  var one = new Dish ("Sugar cane juice", "PAKISTAN", "Drink", [5, 0, 0, 0, 0, 1],4.99, "images/pakistani-cuisine/drink-sugarcanejuice.jpg");
  allDrinks.push(one);
  var one = new Dish ("Shardai", "PAKISTAN", "Drink", [3, 1, 0, 0, 0, 0],4.99, "images/pakistani-cuisine/drink-shardai.jpg");
  allDrinks.push(one);
  var one = new Dish ("Ras Malai", "PAKISTAN", "Dessert", [2, 0, 0, 0, 0, 1],4.99, "images/pakistani-cuisine/dessert-rasmalai.jpg");
  allDesserts.push(one);
  var one = new Dish ("Kulfi Falooda", "PAKISTAN", "Dessert", [2, 0, 0, 0, 0, 2],5.99, "images/pakistani-cuisine/dessert-kulfifalooda.jpg");
  allDesserts.push(one);
  var one = new Dish ("Gulab Jamun", "PAKISTAN", "Dessert", [5, 0, 0, 0, 0, 3],4.99, "images/pakistani-cuisine/dessert-gulabjamun.jpg");
  allDesserts.push(one);
  var one = new Dish ("Kheer", "PAKISTAN", "Dessert", [4, 0, 0, 0, 0, 3],3.99, "images/pakistani-cuisine/dessert-kheer.jpg");
  allDesserts.push(one);
  var one = new Dish ("Cholay", "PAKISTAN", "Starter", [1, 1, 1, 0, 0, 0],4.99, "images/pakistani-cuisine/starter-cholay.JPG");
  allStarters.push(one);
  var one = new Dish ("Pani Puri", "PAKISTAN", "Starter", [0, 1, 0, 0, 0, 0],4.99, "images/pakistani-cuisine/starter-panipuri.jpg");
  allStarters.push(one);
  var one = new Dish ("Samosa", "PAKISTAN", "Starter", [0, 1, 0, 0, 0, 1],4.99, "images/pakistani-cuisine/starter-samosas.jpg");
  allStarters.push(one);
  var one = new Dish ("Pakora", "PAKISTAN", "Starter", [0, 1, 0, 0, 0, 2],3.99, "images/pakistani-cuisine/starter-pakora.jpg");
  allStarters.push(one);

  var two = new Dish("Shuizhuyu", "CHINA", "Main Course", [2, 4, 0, 2, 4, 3],10.99, "images/chinese-cuisine/mc-shuizhuyu.jpg");
  allMainCourses.push(two);
  var two = new Dish("Yangxiezihuoguo", "CHINA", "Main Course", [2 ,5 ,0 ,2 ,5 ,5],21.99, "images/chinese-cuisine/mc-yangxiezihuoguo.jpg");
  allMainCourses.push(two);
  var two = new Dish("Yangzhouchaofan", "CHINA", "Main Course", [1,3,0,0,3,1],9.99 , "images/chinese-cuisine/mc-yangzhouchaofan.jpg");
  allMainCourses.push(two);
  var two = new Dish("Niuroumian", "CHINA", "Main Course", [1, 3, 0, 1, 5, 2],12.99, "images/chinese-cuisine/mc-niuroumian.jpg");
  allMainCourses.push(two);
  var two = new Dish("Wulongcha", "CHINA", "Drink", [0, 0, 3, 0, 0, 0], 2.99 , "images/chinese-cuisine/drink-wulongcha.jpg");
  allDrinks.push(two);
  var two = new Dish("Wuliangye", "CHINA", "Drink", [0, 0, 2, 0, 1, 0], 6.99, "images/chinese-cuisine/drink-wuliangye.jpg");
  allDrinks.push(two);
  var two = new Dish("Naicha", "CHINA", "Drink", [5, 0, 1, 0, 0, 2],3.99, "images/chinese-cuisine/drink-naicha.jpg");
  allDrinks.push(two);
  var two = new Dish("Qishui", "CHINA", "Drink", [5, 0, 1, 3, 0, 0], 2.99, "images/chinese-cuisine/drink-qishui.jpg");
  allDrinks.push(two);
  var two = new Dish("Wandouhuang", "CHINA", "Dessert", [5, 0, 0, 0, 0, 1], 5.99, "images/chinese-cuisine/dessert-wandouhuang.jpg");
  allDesserts.push(two);
  var two = new Dish("Niangao", "CHINA", "Dessert", [5, 0, 0, 0, 0, 1],4.99, "images/chinese-cuisine/dessert-niangao.jpg");
  allDesserts.push(two);
  var two = new Dish("Liuliansu", "CHINA", "Dessert", [4, 0, 1, 1, 0, 0],8.99, "images/chinese-cuisine/dessert-liuliansu.jpg");
  allDesserts.push(two);
  var two = new Dish("Yangzhiganlu", "CHINA", "Dessert", [4, 0, 0, 3, 0, 0],7.99, "images/chinese-cuisine/dessert-yangzhiganlu.png");
  allDesserts.push(two);
  var two = new Dish("Xiaolongbao", "CHINA", "Starter", [1, 2, 0, 1, 3, 3],6.99, "images/chinese-cuisine/starter-xiaolongbao.jpg");
  allStarters.push(two);
  var two = new Dish("Banmuer", "CHINA", "Starter", [1, 2, 0, 2, 4, 0],5.99, "images/chinese-cuisine/starter-banmuer.jpg");
  allStarters.push(two);
  var two = new Dish("Lucai", "CHINA", "Starter", [2, 4, 0, 3, 5, 5],8.99, "images/chinese-cuisine/starter-lucai.jpg");
  allStarters.push(two);
  var two = new Dish("Xiangguqingcai", "CHINA", "Starter", [1, 3, 0, 0, 4, 0],.99, "images/chinese-cuisine/starter-xiangguqingcai.jpg");
  allStarters.push(two);

  var three = new Dish("Lagman", "KYRGYZSTAN", "Main Course", [0, 0, 1, 0, 0, 2], 9.99, "images/centralAsian-cuisine/mc-lagman.jpg");
  allMainCourses.push(three);
  var three = new Dish("Palov", "KYRGYZSTAN", "Main Course", [0, 0 ,0 ,0 ,0 ,3], 7.99, "images/centralAsian-cuisine/mc-palov.jpg");
  allMainCourses.push(three);
  var three = new Dish("Beshbarmak", "KYRGYZSTAN", "Main Course", [0, 0 ,0 ,0 , 0, 5],7.99 , "images/centralAsian-cuisine/mc-beshbarmak.jpg");
  allMainCourses.push(three);
  var three = new Dish("Kuurdak", "KYRGYZSTAN", "Main Course", [0, 0 ,0 ,0 , 0, 0], 8.99, "images/centralAsian-cuisine/mc-kuurdak.jpg");
  allMainCourses.push(three);
  var three = new Dish("Kompot", "KYRGYZSTAN", "Drink", [3, 0, 0, 1, 0, 0], [1.0, .0, .0, .0, .0, .0], 1.99 , "images/centralAsian-cuisine/drink-kompot.jpg");
  allDrinks.push(three);
  var three = new Dish("Chalap", "KYRGYZSTAN", "Drink", [0, 1, 0, 3, 0, 0],6.99, "images/centralAsian-cuisine/drink-chalap.jpg");
  allDrinks.push(three);
  var three = new Dish("Boza", "KYRGYZSTAN", "Drink", [1, 1, 0, 2, 0, 0], 2.99, "images/centralAsian-cuisine/drink-boza.jpg");
  allDrinks.push(three);
  var three = new Dish("Kvas", "KYRGYZSTAN", "Drink", [2, 0, 1, 2, 0, 0],2.99, "images/centralAsian-cuisine/drink-kvass.jpg");
  allDrinks.push(three);
  var three = new Dish("Chak-chak", "KYRGYZSTAN", "Dessert", [3, 0, 0, 0, 0, 0], 5.99, "images/centralAsian-cuisine/dessert-chakchak.jpg");
  allDesserts.push(three);
  var three = new Dish("Pahlava", "KYRGYZSTAN", "Dessert", [4, 0, 0, 0, 0, 1], 5.99, "images/centralAsian-cuisine/dessert-pahlava.jpg");
  allDesserts.push(three);
  var three = new Dish("Halva", "KYRGYZSTAN", "Dessert", [4, 0, 0, 0, 0, 1],4.99, "images/centralAsian-cuisine/dessert-halva.jpg");
  allDesserts.push(three);
  var three = new Dish("Ponchiki", "KYRGYZSTAN", "Dessert", [3, 0, 0, 0, 0, 0],4.99, "images/centralAsian-cuisine/dessert-ponchiki.jpg");
  allDesserts.push(three);
  var three = new Dish("Borak", "KYRGYZSTAN", "Starter", [0, 0, 0, 0, 0, 2],2.99, "images/centralAsian-cuisine/starter-borak.jpg");
  allStarters.push(three);
  var three = new Dish("Dolma", "KYRGYZSTAN", "Starter", [0, 0, 0, 2, 0, 2], 3.99, "images/centralAsian-cuisine/starter-dolma.jpg");
  allStarters.push(three);
  var three = new Dish("Holodets", "KYRGYZSTAN", "Starter", [0, 0, 0, 0, 0, 1],3.5, "images/centralAsian-cuisine/starter-holodets.jpg");
  allStarters.push(three);
  var three = new Dish("Boorsok", "KYRGYZSTAN", "Starter", [2, 0, 0, 0, 0, 0], 2.50, "images/centralAsian-cuisine/starter-boorsok.jpg");
  allStarters.push(three);
}
function toggle(){
  $("#resultsContainerOne").toggleClass("hidden");

  $("#inputSection").toggleClass("hidden");
}
function toggle2(){
  $("#resultsContainerOne").toggleClass("hidden");
  $("#resultsContainerTwo").toggleClass("hidden");
}
function toggle3(){
  $("#resultsContainerTwo").toggleClass("hidden");
  $("#cost").toggleClass("hidden");
}
function toggle4(){
  //hehexd
}


$(document).ready(function(){
  generateAllDishes(); //Initializing all Dish objects in our makeshift database.
  $("form#createUser").submit(function(event) {
    event.preventDefault();
    var nameIn = $("#name").val();
    var passwordIn = $("#password").val();
    var countryFrom = $("#countryFrom").val();
    var countryTo = $("#countryTo").val();
    if(generateUser(nameIn, passwordIn, countryFrom, countryTo)){
      displayDishesFrom();
      toggle();
    }
  });
  $("form#login").submit(function(event) {
    event.preventDefault();
    var nameIn = $("#nameLogin").val();
    var password = $("#passwordLogin").val();
    if(login(nameIn, password)){
      displayDishesFrom();
      toggle();
    }
  });
  $("form#resultFirst").submit(function(event) {
    event.preventDefault();
    var selectedDishes = [];
    $("input:checkbox[name=selected]:checked").each(function(){
      selectedDishes.push($(this).val());
    });
    sortSelectedDishesForUser(selectedDishes);
    toggle2();
    displayDishesTo();

  });
  $("form#resultSecond").submit(function(event) {
    event.preventDefault();
    var selectedDishesTwo = [];
    $("input:checkbox[name=selectedTwo]:checked").each(function(){
      selectedDishesTwo.push($(this).val());
    });
    calculateCost(selectedDishesTwo);
    toggle3();

  });
  $("button#homeOne").click(function(){
    toggle();

  });
  $("button#goBack").click(function(){
    toggle2();

  });
  $("button#goBackTwo").click(function(){
    toggle3();
  });
});
