var allStarters = [];
var allDrinks = [];
var allMainCourses = [];
var allDeserts = [];

var allUsers = [];
var globalUser = null;
//User Object, used with allUser and globalUser to create a dumb database.
function User(nameIn, password, countryFrom, countryTo, starterDishes, drinks, maincourses, deserts, flavorProfile, foodGroupProfile){
  this.name = nameIn;
  this.password = password;
  this.from = countryFrom;
  this.to = countryTo;
  this.starters = starterDishes;
  this.drinks = drinks;
  this.maincourses = maincourses;
  this.deserts = deserts;
  this.flavProfile = null;
  this.foodGProfile = null;
}
//Dish Object, used to dynamically generate Dishes that the current globalUser would prefer.
function Dish(nameIn, countryFrom, group, flavProfile, foodGProfile, cost, img){
  this.name = nameIn;
  this.countryFrom = countryFrom;
  this.group = group;
  this.flavProfile = flavProfile;
  this.foodGProfile = foodGProfile;
  this.cost = cost;
  this.img = img;
}
//Used to toggle elements so the stuff is n the same page.
function toggle(){
  $("#resultsOne").toggle();
  $("#resultsTwo").toggle();
  $("#resultsThree").toggle();
  $("#resultsFour").toggle();
  $("#inputSection").toggle();
  $("#displayOne").toggle();
}
//Flavor Profile object used to describe the properties of the food.
function FlavorProfile(thisSweet, thisSalty, thisBitter, thisSour, thisUmani){
  this.sweet = thisSweet;
  this.salty = thisSalty;
  this.bitter = thisBitter;
  this.sour = thisSour;
  this.umani = thisUmani;
}
//FoodGroupProfile used to describe the portion of the food.
function FoodGroupProfile(thisFruit, thisVeg, thisProtein, thisDairy, thisGrains, thisOil){
  this.fruit = thisFruit;
  this.vegetable = thisVeg;
  this.protein = thisProtein;
  this.dairy = thisDairy;
  this.grain = thisGrains;
  this.oil = thisOil;
}
//Used to generate a user from the initial createUserForm
function generateUser(nameIn, password, countryFrom, countryTo, allergies){
  var newUser = new User(nameIn, password, countryFrom,countryTo,null,null,null,null,null,null);
  var thisFoodGroupProfile = [];
  var arrLength = allUsers.length;

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
  for(var i = 0; i < allUsers.length; i ++){
    currentUser = allUsers[i];
    if(currentUser.name == userName && currentUser.password == password){
      globalUser = currentUser;
      return true;
    } else if(currentUser.name == userName && currentUser.password != password){
      alert("You entered the wrong password");
      return false;
    }
  }
}
//Used for assigning selected dishes to globalUsers properties.
function sortSelectedDishesForUser(arrayOfDishObjects){
  for(var i = 0; i < arrayOfDishObjects.length; i ++){
    var currentDish = arrayOfDishObjects[i];
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
    for(var j = 0; j < allDeserts.length; j ++){
      if(allDeserts[j].name == currentDish){
        globalUser.deserts.push(allDeserts[j]);
      }
    }
  }
}
//Used to display all dish objects.
function displayDishesFrom(){
    for(var i = 0; i < allStarters.length; i ++){
      $("#resultsOne").append("<div class = 'col-md-3'><h3>" + allStarters[i].name + "</h3><img src="+ "'" + allStarters[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>");
    }
    for(var i = 0; i < allDrinks.length; i ++){
      $("#resultsTwo").append("<div class = 'col-md-3'><h3>" + allDrinks[i].name + "</h3><img src="+ "'" + allDrinks[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allDrinks[i].name + "'" + "+>" + allDrinks[i].name  + "</div>");
    }
    for(var i = 0; i < allMainCourses.length; i ++){
      $("#resultsThree").append("<div class = 'col-md-3'><h3>" + allMainCourses[i].name + "</h3><img src="+ "'" + allMainCourses[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allMainCourses[i].name + "'" + "+>" + allMainCourses[i].name  + "</div>");
    }
    for(var i = 0; i < allDeserts.length; i ++){
      $("#resultsFour").append("<div class = 'col-md-3'><h3>" + allDeserts[i].name + "</h3><img src="+ "'" + allDeserts[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allDeserts[i].name + "'" + "+>" + allDeserts[i].name  + "</div>");
    }
}
User.prototype.generateFlavorProfile = function(){
  var startersLength = this.starters.length;
  var drinksLength = this.drinks.length;
  var maincoursesLength = this.maincourses.length;
  var desertsLength = this.deserts.length;
  var totalNumberOfDishes = startersLength + drinksLength + maincoursesLength + desertsLength;
  var starterFlavorArray = [];
  var drinksFlavorArray = [];
  var mainCourseFlavorArray = [];
  var desertsFlavorArray = [];
  var totalFlavorArray = [0,0,0,0,0];

  //Generate average vector for starters
  for(var i = 0; i < startersLength; i ++){
    var currentDish = this.starters.flavProfile[i];
    startersFlavorArray.addArrays(currentDish);
  }
  starterFlavorArray.divideArray(startersLength);

  //Generate average vector for Drinks.
  for(var i = 0; i < drinksLength; i ++){
    var currentDish = this.drinks.flavProfile[i];
    startersFlavorArray.addArrays(currentDish);
  }
  starterFlavorArray.divideArray(drinksLength);

  //Generate average vector for Main course.
  for(var i = 0; i < maincoursesLength; i ++){
    var currentDish = this.maincourses.flavProfile[i];
    startersFlavorArray.addArrays(currentDish);
  }
  starterFlavorArray.divideArray(maincoursesLength);

  //Generate average vector for Deserts course.
  for(var i = 0; i < desertsLength; i ++){
    var currentDish = this.deserts.flavProfile[i];
    startersFlavorArray.addArrays(currentDish);
  }
  starterFlavorArray.divideArray(desertsLength);
  //Generate total flavor profile
  totalFlavorArray.addArrays(starterFlavorArray);
  totalFlavorArray.addArrays(drinksFlavorArray);
  totalFlavorArray.addArrays(mainCourseFlavorArray);
  totalFlavorArray.addArrays(desertsFlavorArray);
  totalFlavorArray.divideArray(4);
  return totalFlavorArray;
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
//Generates all Dish Objects
function generateAllDishes(){
  //PAKISTANI
  var one = new Dish("Chicken Biryani", "Pakistan", "maincourse", [0, 1, 0, 0, 0], [0, 1, 0, 1, 3], 20, "images/menu/pakistani cuisine/mc-chicken-biryani.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Chicken Karahi", "Pakistan", "maincourse", [0, 1, 0, 0, 0], [0, 1, 0, 1, 3], 15, "images/menu/pakistani cuisine/mc-chicken-karahi.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Lassi", "Pakistan", "drink", [1, 1, 0, 0, 0], [0, 5, 5, 0, 0], 3, "images/menu/pakistani cuisine/drink-lassi.jpg");
  allDrinks.push(one);
  var one = new Dish ("RasmaLai", "Pakistan", "desert", [1, 1, 0, 0, 0], [0, 5, 5, 0, 0], 3, "images/menu/pakistani cuisine/rasmalai.jpg");
  allDeserts.push(one);
  var one = new Dish ("Cholay", "Pakistan", "starter", [1, 2, 0, 0, 0], [0, 0, 0, 0, 0], 4, "images/menu/pakistani cuisine/cholay.JPG");
  allStarters.push(one);
  // var one = new Dish ("Chicken Qorma", "Pakistan", "Main Course", [0, 1, 0, 0, 0, 0], [0, 0, ]);

}
$(document).ready(function(){
  generateAllDishes(); //Initializing all Dish objects in our makeshift database.
  $("form#createUser").submit(function(event) {
    event.preventDefault();
    console.log("createUser");
    var nameIn = $("#name").val();
    var passwordIn = $("#password").val();
    var countryFrom = $("#countryFrom").val();
    var countryTo = $("#countryTo").val();
    var allergies = [];
    $("input:checkbox[name=allergy]:checked").each(function(){
    allergies.push($(this).val());
    });
    if(generateUser(nameIn, passwordIn, countryFrom, countryTo, allergies)){
      displayDishesFrom();
      toggle();
    }
  });
  $("form#login").submit(function(event) {
    console.log("login");
    event.preventDefault();
    var nameIn = $("#nameLogin").val();
    var loginIn = $("#passwordLogin").val();
    if(login(nameIn, loginIn)){
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
    console.log(selectedDishes);
    sortSelectedDishesForUser(selectedDishes);

  })
});
