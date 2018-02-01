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
//displays dishes from same country as globalUser
function displayDishesFrom(){
  $("#resultsTwo").text("");
  $("#resultsTwo").append("<div class = 'col-md-12'><h3>Select Starters:</h3><hr></hr></div>");
  $("#resultsOne").text("");
  $("#resultsOne").append("<div class = 'col-md-12'><h3>Select Drinks:</h3><hr></hr></div>");
  $("#resultsThree").text("");
  $("#resultsThree").append("<div class = 'col-md-12'><h3>Select Maincourses:</h3><hr></hr></div>");
  $("#resultsFour").text("");
  $("#resultsFour").append("<div class = 'col-md-12'><h3>Select Desserts:</h3><hr></hr></div>");

  for(var i = 0; i < allStarters.length; i ++){
    if(allStarters[i].countryFrom == globalUser.from){
      $("#resultsTwo").append("<div class = 'col-md-3'><img src="+ "'" + allStarters[i].img + "'" + " alt='Picture of food' >"+ "<br>"+ "<input type='checkbox' name='selected' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>");
    }
    // + "<input type='checkbox' name='selected' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>"
  }
  for(var i = 0; i < allDrinks.length; i ++){
    if(allDrinks[i].countryFrom == globalUser.from){
      $("#resultsOne").append("<div class = 'col-md-3'><img src="+ "'" + allDrinks[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selected' value=" + "'" + allDrinks[i].name + "'" + "+>" + allDrinks[i].name  + "</div>");
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
//displays dishes from globalUsers current selection.
function displayDishesTo(){
  $("#resultsSix").text("");
  $("#resultsSix").append("<div class = 'col-md-12'><h3>Recommended Starters:</h3><hr></hr></div>");
  $("#resultsFive").text("");
  $("#resultsFive").append("<div class = 'col-md-12'><h3>Recommended Drinks:</h3><hr></hr></div>");
  $("#resultsSeven").text("");
  $("#resultsSeven").append("<div class = 'col-md-12'><h3>Recommended Maincourses:</h3><hr></hr></div>");
  $("#resultsEight").text("");
  $("#resultsEight").append("<div class = 'col-md-12'><h3>Recommended Desserts:</h3><hr></hr></div>");

  for(var i = 0; i < allStarters.length; i ++){
    var usersStarterFlavorProfile = globalUser.getStarterFlavorProfile();

    var currentDishesFlavorProfile = allStarters[i].flavProfile;

    var margin = currentDishesFlavorProfile.subArrays(usersStarterFlavorProfile);

    if(allStarters[i].countryFrom == globalUser.to && margin.checkMargin() && !margin.checkForEqual(usersStarterFlavorProfile)){
      $("#resultsSix").append("<div class = 'col-md-3'><img src="+ "'" + allStarters[i].img + "'" + " alt='Picture of food' >"+ "<br>"+ "<input type='checkbox' name='selectedTwo' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>");
    }
  }
  for(var i = 0; i < allDrinks.length; i ++){
    var usersDrinkFlavorProfile = globalUser.getDrinkFlavorProfile();
    var currentDishesFlavorProfile = allDrinks[i].flavProfile;
    var margin = currentDishesFlavorProfile.subArrays(usersDrinkFlavorProfile);

    if(allDrinks[i].countryFrom == globalUser.to && margin.checkMargin() && !margin.checkForEqual(usersStarterFlavorProfile)){
      $("#resultsFive").append("<div class = 'col-md-3'><img src="+ "'" + allDrinks[i].img + "'" + " alt='Picture of food'>" + "<br>"+"<input type='checkbox' name='selectedTwo' value=" + "'" + allDrinks[i].name + "'" + "+>" + allDrinks[i].name  + "</div>");
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
    if(currentDish != false){
      totalCost += currentDish.cost;
      $("#resultsNine").append("Name: " + currentDish.name +  "<br>" + " Origin: " + currentDish.countryFrom +  "<br>" + " Cost/Unit: " + currentDish.cost +  "<br><br>");
    }
  }
  $("#resultsNine").append("<br><strong>Total Cost:</strong> " + totalCost);
  $("#resultsTen").prepend("Thank you for using our application! We hope you enjoy your food recommendations!")
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
  var one = new Dish("Hot Chocolate","US","drink",[4,1,2,0,0],3.99,"images/us-cuisine/drink-hotchocolate.jpg");
  allDrinks.push(one);
  one = new Dish("Strawberry Smoothie","US","drink",[3,1,0,0,0],4.99,"images/us-cuisine/drink-strawberrysmoothie.jpg");
  allDrinks.push(one);
  one = new Dish("Hot Tea","US","drink",[2,1.5,0,0,0],1.99,"images/us-cuisine/drink-hottea.jpg");
  allDrinks.push(one);
  one = new Dish("Coffee","US","drink",[2,0,4,1,0],4.99,"images/us-cuisine/drink-coffee.jpg");
  allDrinks.push(one);
  one = new Dish("Chicken Salad","US","starter",[0,4,1,1,0],1.5,"images/us-cuisine/starter-chickensalad.jpg");
  allStarters.push(one);
  one = new Dish("Apple Bread","US","starter",[0,4,1,1,1],4.99,"images/us-cuisine/starter-appbread.jpg");
  allStarters.push(one);
  one = new Dish("Cheeseplate","US","starter",[2,3,1,1,1],6.99,"images/us-cuisine/starter-cheeseplate.jpg");
  allStarters.push(one);
  one = new Dish("Fruit and Nuts","US","starter",[4,2,2,1,1],4.99,"images/us-cuisine/starter-fruitandnut.jpg");
  allStarters.push(one);
  one = new Dish("Steak","US","maincourse",[0,2,0,0,2],150,"images/us-cuisine/mc-steak.jpg");
  allMainCourses.push(one);
  one = new Dish("Seabass","US","maincourse",[2,2,1,1,1],12.99,"images/us-cuisine/mc-seabass.jpg");
  allMainCourses.push(one);
  one = new Dish("Grilled Chicken Sandwich ","US","maincourse",[1,2,1,0,4],7.99,"images/us-cuisine/mc-grilledchxsand.jpg");
  allMainCourses.push(one);
  one = new Dish("Vegan Dish ","US","maincourse",[1,1,1,1,1],20.99,"images/us-cuisine/mc-vegandinner.jpg");
  allMainCourses.push(one);
  one = new Dish("Chocolate Cookie","US","dessert",[5,2,0,0,1],8.99,"images/us-cuisine/dessert-chococookie.jpg");
  allDesserts.push(one);
  one = new Dish("Cheesecake","US","dessert",[5,1,1,0,1],9.99,"images/us-cuisine/dessert-cheesecake.jpg");
  allDesserts.push(one);
  one = new Dish("Strawberry Shortcake","US","dessert",[5,1,1,0,1],10.99,"images/us-cuisine/dessert-strawberryshortcake.jpg");
  allDesserts.push(one);
  one = new Dish("Apple Pie","US","dessert",[5,1,1,0,1],8.99,"images/us-cuisine/dessert-applepie.jpg");
  allDesserts.push(one);
  one = new Dish("Lassi","PAKISTAN","drink",[3,1,0,0,0],2.99,"images/pakistani-cuisine/drink-lassi.jpg");
  allDrinks.push(one);
  one = new Dish("Kashmiri chai","PAKISTAN","drink",[2,1.5,0,0,0],4.99,"images/pakistani-cuisine/drink-kashmirichai.jpg");
  allDrinks.push(one);
  one = new Dish("Sugar cane","PAKISTAN","drink",[5,0,0,0,0],1.99,"images/pakistani-cuisine/drink-sugarcanejuice.jpg");
  allDrinks.push(one);
  one = new Dish("Shardai","PAKISTAN","drink",[3,1,0,0,0],4.99,"images/pakistani-cuisine/drink-shardai.jpg");
  allDrinks.push(one);
  one = new Dish("Choley","PAKISTAN","starter",[1,3,1,0,2],4.99,"images/pakistani-cuisine/starter-cholay.JPG");
  allStarters.push(one);
  one = new Dish("Pani puri","PAKISTAN","starter",[0,1,0,0,0],4.99,"images/pakistani-cuisine/starter-panipuri.jpg");
  allStarters.push(one);
  one = new Dish("Samosa","PAKISTAN","starter",[0,1,0,0,0],4.99,"images/pakistani-cuisine/starter-samosas.jpg");
  allStarters.push(one);
  one = new Dish("Pakora","PAKISTAN","starter",[0,1,0,0,1],3.99,"images/pakistani-cuisine/starter-pakora.jpg");
  allStarters.push(one);
  one = new Dish("Chicken Biryani","PAKISTAN","maincourse",[1,3,0,0,3],19.99,"images/pakistani-cuisine/maincourse-chicken-biryani.jpg");
  allMainCourses.push(one);
  one = new Dish("Chicken Karahi","PAKISTAN","maincourse",[0,1,0,0,0],11.99,"images/pakistani-cuisine/maincourse-chicken-karahi.jpg");
  allMainCourses.push(one);
  one = new Dish("Chicken Qorma","PAKISTAN","maincourse",[0,1,0,0,0],14.99,"images/pakistani-cuisine/maincourse-chickenqorma.jpg");
  allMainCourses.push(one);
  one = new Dish("Okra subzi","PAKISTAN","maincourse",[0,1,0,0,0],9.99,"images/pakistani-cuisine/maincourse-okrasubzi.jpg");
  allMainCourses.push(one);
  one = new Dish("Ras Malai","PAKISTAN","dessert",[2,0,0,0,0],4.99,"images/pakistani-cuisine/dessert-rasmalai.jpg");
  allDesserts.push(one);
  one = new Dish("Kulfi Falooda","PAKISTAN","dessert",[2,0,0,0,0],5.99,"images/pakistani-cuisine/dessert-kulfifalooda.jpg");
  allDesserts.push(one);
  one = new Dish("Gulab Jamun","PAKISTAN","dessert",[5,0,0,0,0],4.99,"images/pakistani-cuisine/dessert-gulabjamun.jpg");
  allDesserts.push(one);
  one = new Dish("Kheer","PAKISTAN","dessert",[4,0,0,0,0],3.99,"images/pakistani-cuisine/dessert-kheer.jpg");
  allDesserts.push(one);
  one = new Dish("kompot","KYRGYZSTAN","drink",[5,0,0,0,0],1.99,"images/centralAsian-cuisine/drink-kompot.jpg");
  allDrinks.push(one);
  one = new Dish("chalap","KYRGYZSTAN","drink",[3,1,0,0,0],2.5,"images/centralAsian-cuisine/drink-chalap.jpg");
  allDrinks.push(one);
  one = new Dish("boza","KYRGYZSTAN","drink",[0,0,0,0,0],2.99,"images/centralAsian-cuisine/drink-boza.jpg");
  allDrinks.push(one);
  one = new Dish("kvas","KYRGYZSTAN","drink",[3,1,0,0,0],2.99,"images/centralAsian-cuisine/drink-kvass.jpg");
  allDrinks.push(one);
  one = new Dish("borak","KYRGYZSTAN","starter",[2,3,1,1,1],2.99,"images/centralAsian-cuisine/starter-borak.jpg");
  allStarters.push(one);
  one = new Dish("dolma","KYRGYZSTAN","starter",[0,0,0,2,0],3.99,"images/centralAsian-cuisine/starter-dolma.jpg");
  allStarters.push(one);
  one = new Dish("holodets","KYRGYZSTAN","starter",[0,2,0,3,0],3.5,"images/centralAsian-cuisine/starter-holodets.jpg");
  allStarters.push(one);
  one = new Dish("boorsok","KYRGYZSTAN","starter",[0,1,0,0,1],2.5,"images/centralAsian-cuisine/starter-boorsok.jpg");
  allStarters.push(one);
  one = new Dish("lagman","KYRGYZSTAN","maincourse",[0,2,0,0,2],9.99,"images/centralAsian-cuisine/mc-lagman.jpg");
  allMainCourses.push(one);
  one = new Dish("palov","KYRGYZSTAN","maincourse",[1,0,0,0,3],7.99,"images/centralAsian-cuisine/mc-palov.jpg");
  allMainCourses.push(one);
  one = new Dish("beshbarmak","KYRGYZSTAN","maincourse",[1,3,0,1,5],7.99,"images/centralAsian-cuisine/mc-beshbarmak.jpg");
  allMainCourses.push(one);
  one = new Dish("kuurdak","KYRGYZSTAN","maincourse",[0,2,0,0,2],8.99,"images/centralAsian-cuisine/mc-kuurdak.jpg");
  allMainCourses.push(one);
  one = new Dish("chak-chak","KYRGYZSTAN","dessert",[5,0,0,0,0],5.99,"images/centralAsian-cuisine/dessert-chakchak.jpg");
  allDesserts.push(one);
  one = new Dish("pahlava","KYRGYZSTAN","dessert",[5,0,0,0,0],5.99,"images/centralAsian-cuisine/dessert-pahlava.jpg");
  allDesserts.push(one);
  one = new Dish("halva","KYRGYZSTAN","dessert",[2,0,0,0,0],4.99,"images/centralAsian-cuisine/dessert-halva.jpeg");
  allDesserts.push(one);
  one = new Dish("ponchiki","KYRGYZSTAN","dessert",[5,0,0,0,0],4.99,"images/centralAsian-cuisine/dessert-ponchiki.jpg");
  allDesserts.push(one);
  one = new Dish("wulongcha","CHINA","drink",[0,0,3,0,0],2.99,"images/chinese-cuisine/drink-wulongcha.jpg");
  allDrinks.push(one);
  one = new Dish("wuliangye","CHINA","drink",[0,0,2,0,1],6.99,"images/chinese-cuisine/drink-wuliangye.jpg");
  allDrinks.push(one);
  one = new Dish("naicha","CHINA","drink",[5,0,0,0,0],3.99,"images/chinese-cuisine/drink-naicha.jpg");
  allDrinks.push(one);
  one = new Dish("qishui","CHINA","drink",[5,0,1,3,0],2.99,"images/chinese-cuisine/drink-qishui.jpg");
  allDrinks.push(one);
  one = new Dish("xiaolongbao","CHINA","starter",[2,3,1,1,1],6.99,"images/chinese-cuisine/starter-xiaolongbao.jpg");
  allStarters.push(one);
  one = new Dish("banmuer","CHINA","starter",[1,2,0,2,4],5.99,"images/chinese-cuisine/starter-banmuer.jpg");
  allStarters.push(one);
  one = new Dish("luhuo","CHINA","starter",[2,4,0,3,5],8.99,"images/chinese-cuisine/starter-lucai.jpg");
  allStarters.push(one);
  one = new Dish("xiangguqingcai","CHINA","starter",[1,3,0,0,4],7.99,"images/chinese-cuisine/starter-xiangguqingcai.jpg");
  allStarters.push(one);
  one = new Dish("shuizhuyu","CHINA","maincourse",[0,2,0,0,2],10.99,"images/chinese-cuisine/mc-shuizhuyu.jpg");
  allMainCourses.push(one);
  one = new Dish("yangxiezihuoguo","CHINA","maincourse",[2,5,0,2,5],21.99,"images/chinese-cuisine/mc-yangxiezihuoguo.jpg");
  allMainCourses.push(one);
  one = new Dish("yangzhouchaofan","CHINA","maincourse",[1,3,0,0,3],9.99,"images/chinese-cuisine/mc-yangzhouchaofan.jpg");
  allMainCourses.push(one);
  one = new Dish("niuroumian","CHINA","maincourse",[1,3,0,1,5],12.99,"images/chinese-cuisine/mc-niuroumian.jpg");
  allMainCourses.push(one);
  one = new Dish("wandouhuang","CHINA","dessert",[5,0,0,0,0],5.99,"images/chinese-cuisine/dessert-wandouhuang.jpg");
  allDesserts.push(one);
  one = new Dish("niangao","CHINA","dessert",[5,0,0,0,0],4.99,"images/chinese-cuisine/dessert-niangao.jpg");
  allDesserts.push(one);
  one = new Dish("liuliansu","CHINA","dessert",[5,2,0,0,1],8.99,"images/centralAsian-cuisine/starter-holodets.jpg");
  allDesserts.push(one);
  one = new Dish("yangzhiganlu","CHINA","dessert",[4,0,0,3,0],7.99,"images/chinese-cuisine/dessert-yangzhiganlu.png");
  allDesserts.push(one);
  one = new Dish("espresso","ITALY","drink",[0,0,2,0,0],2.1,"images/italian-cuisine/drink- espresso.jpg");
  allDrinks.push(one);
  one = new Dish("aranciata","ITALY","drink",[3,0,0,2,0],3.99,"images/italian-cuisine/drink-aranciata.png");
  allDrinks.push(one);
  one = new Dish("vino-rosso","ITALY","drink",[0,0,0,0,0],2.54,"images/italian-cuisine/drink-montepulciano-dabruzzo.jpg");
  allDrinks.push(one);
  one = new Dish("toutle","ITALY","drink",[0,0,0,1,0],4.56,"images/italian-cuisine/drink-tourtle.jpg");
  allDrinks.push(one);
  one = new Dish("cozze-arrangate","ITALY","starter",[0,3,0,1,3],11.87,"images/italian-cuisine/starter- cozze arrangante.jpg");
  allStarters.push(one);
  one = new Dish("melanzana","ITALY","starter",[1,2,0,0,1],12.45,"images/italian-cuisine/starter-melanza.jpg");
  allStarters.push(one);
  one = new Dish("pure-di-fave","ITALY","starter",[0,2,0,1,0],11.45,"images/italian-cuisine/starter- pure di fave.jpg");
  allStarters.push(one);
  one = new Dish("frisselle","ITALY","starter",[0,2,0,0,1],5.34,"images/italian-cuisine/starter-frisselle.jpg");
  allStarters.push(one);
  one = new Dish("ciceria-e-tria","ITALY","maincourse",[0,2,0,0,0],12.23,"images/italian-cuisine/main- ciceria e tria.jpg");
  allMainCourses.push(one);
  one = new Dish("oricchiette-al-sugo","ITALY","maincourse",[0,2,0,0,0],11.98,"images/italian-cuisine/main- oricchiete al sugo.jpg");
  allMainCourses.push(one);
  one = new Dish("tiella-e-cozze","ITALY","maincourse",[0,2,0,0,3],14.78,"images/italian-cuisine/main- tiella di riso e cozze.jpg");
  allMainCourses.push(one);
  one = new Dish("pasta-e-cavoli","ITALY","maincourse",[0,2,0,0,0],11.7,"images/italian-cuisine/main-pasta e cavoli.jpg");
  allMainCourses.push(one);
  one = new Dish("sfogliatte","ITALY","dessert",[2,0,0,0,0],4.9,"images/italian-cuisine/dessert- sfogliatelle di natalle.jpg");
  allDesserts.push(one);
  one = new Dish("torta-surffice","ITALY","dessert",[2,0,0,0,0],5.23,"images/italian-cuisine/dessert- torta surffice alla aranccia.jpg");
  allDesserts.push(one);
  one = new Dish("rosa-di-mandorle","ITALY","dessert",[2,0,0,0,0],6.34,"images/italian-cuisine/dessert-rosa di mandorle.jpg");
  allDesserts.push(one);
  one = new Dish("torta-di-nocciole","ITALY","dessert",[2,0,1,0,0],5.56,"images/italian-cuisine/dessert-Torta di nocciole.jpg");
  allDesserts.push(one);
}
//Toggle functions for switching pages.
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
  $("form#changeMe").change(function(){
    event.preventDefault();
    var countryAdjustment = $("#anotherOne").val();
    globalUser.to = countryAdjustment;
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
