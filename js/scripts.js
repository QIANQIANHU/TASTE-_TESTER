var allStarters = [];
var allDrinks = [];
var allMainCourses = [];
var allDesserts = [];

var allUsers = [];
var globalUser = null;
//User Object, used with allUser and globalUser to create a dumb database.
function User(nameIn, password, countryFrom, countryTo, starterDishes, drinks, maincourses, desserts, flavorProfile, foodGroupProfile){
  this.name = nameIn;
  this.password = password;
  this.from = countryFrom;
  this.to = countryTo;
  this.starters = starterDishes;
  this.drinks = drinks;
  this.maincourses = maincourses;
  this.desserts = desserts;
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
  //Conditional for Allergies
  for(var i = 0; i < allergies.length; i++){
    if(allergies[i] == "Lactose"){
      thisFoodGroupProfile = [true,true,true,FALSE, true, true];
    } else if(allergies[i] == "Vegeterian"){
      thisFoodGroupProfile = [true,true,FALSE,FALSE, true, true];
    } else if(allergies[i] == "Vegan"){
      thisFoodGroupProfile = [TRUE,TRUE,false,false, TRUE, FALSE];
    }
  }
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
//Used to display all dish objects.
function generateDishes(){
    for(var i = 0; i < allStarters.length; i ++){
      $("#resultsOne").append("<div class = 'col-md-3'><h3>" + allStarters[i].name + "</h3><img src="+ "'" + allStarters[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allStarters[i].name + "'" + "+>" + allStarters[i].name  + "</div>");
    //  toggle();
    }
    for(var i = 0; i < allDrinks.length; i ++){
      $("#resultsTwo").append("<div class = 'col-md-3'><h3>" + allDrinks[i].name + "</h3><img src="+ "'" + allDrinks[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allDrinks[i].name + "'" + "+>" + allDrinks[i].name  + "</div>");
    // s  toggle();
    }
    for(var i = 0; i < allMainCourses.length; i ++){
      $("#resultsThree").append("<div class = 'col-md-3'><h3>" + allMainCourses[i].name + "</h3><img src="+ "'" + allMainCourses[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allMainCourses[i].name + "'" + "+>" + allMainCourses[i].name  + "</div>");
      toggle();
    }
    for(var i = 0; i < allDesserts.length; i ++){
      $("#resultsFour").append("<div class = 'col-md-3'><h3>" + allDesserts[i].name + "</h3><img src="+ "'" + allDesserts[i].img + "'" + " alt='Picture of food' height='100' width='100'>" + "<input type='checkbox' name='selected' value=" + "'" + allDesserts[i].name + "'" + "+>" + allDesserts[i].name  + "</div>");
      toggle();
    }
}
//Generates all Dish Objects
function generateFood(){
  //PAKISTANI
  var one = new Dish("Chicken Biryani", "Pakistan", "Main Course", [0, 1, 0, 0, 1, 1], [.0, .1, .3, .1, .4, .1], 19.99, "images/pakistani-cuisine/maincourse-chicken-biryani.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Chicken Karahi", "Pakistan", "Main Course", [0, 1, 0, 0, 0, 1], [.0, .3, .4, .0, .0, .3], 11.99, "images/pakistani-cuisine/maincourse-chicken-karahi.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Chicken Qorma", "Pakistan", "Main Course", [0, 1, 0, 0, 0, 1], [.0, .2, .4, .2, .0, .2], 14.99, "images/pakistani-cuisine/maincourse-chickenqorma.jpg");
  allMainCourses.push(one);
  var one = new Dish("Okra subzi", "Pakistan", "Main Course", [0, 1, 0, 0, 0, 1], [.0, .5, .3, .0, .0, .2], 9.99, "images/pakistani-cuisine/maincourse-okrasubzi.jpg");
  allMainCourses.push(one);
  var one = new Dish ("Lassi", "Pakistan", "Drink", [1, 1, 0, 0, 0, 0], [.0, .0, .5, .5, .0, .0], 2.99, "images/pakistani-cuisine/drink-lassi.jpg");
  allDrinks.push(one);
  var one = new Dish ("Kashmiri chai", "Pakistan", "Drink", [1, 1, 0, 0, 0, 1], [.0, .0, .4, .5, .1, .0], 4.99, "images/pakistani-cuisine/drink-kashmirichai.jpg");
  allDrinks.push(one);
  var one = new Dish ("Sugar cane juice", "Paksitan", "Drink", [5, 0, 0, 0, 0, 1], [.0, .0, .0, .5, .5], 1.99, "images/pakistani-cuisine/drink-sugarcanejuice.jpg");
  allDrinks.push(one);
  var one = new Dish ("Shardai", "Pakistan", "Drink", [3, 1, 0, 0, 0, 0], [.2, .0, .3, .2, .3, .0], 4.99, "images/pakistani-cuisine/drink-shardai.jpg");
  allDrinks.push(one);
  var one = new Dish ("Ras Malai", "Pakistan", "Dessert", [2, 0, 0, 0, 0, 1], [.0, .0, .4, .4, .1, .1], 4.99, "images/pakistani-cuisine/dessert-rasmalai.jpg");
  allDesserts.push(one);
  var one = new Dish ("Kulfi Falooda", "Pakistan", "Dessert", [2, 0, 0, 0, 0, 2], [.0, .0, .3, .5, .2, .0], 5.99, "images/pakistani-cuisine/dessert-kulfifalooda.jpg");
  allDesserts.push(one);
  var one = new Dish ("Gulab Jamun", "Pakistan", "Dessert", [5, 0, 0, 0, 0, 3], [.0, .0, .0, .3, .3, .4], 4.99, "images/pakistani-cuisine/dessert-gulabjamun.jpg");
  allDesserts.push(one);
  var one = new Dish ("Kheer", "Pakistan", "Dessert", [4, 0, 0, 0, 0, 3], [.0, .0, .2, .4, .4, .0], 3.99, "images/pakistani-cuisine/dessert-kheer.jpg");
  allDesserts.push(one);
  var one = new Dish ("Cholay", "Pakistan", "Starter", [1, 1, 1, 0, 0, 0], [.0, .2, .3, .0, .3, .2], 4.99, "images/pakistani-cuisine/starter-cholay.JPG");
  allStarters.push(one);
  var one = new Dish ("Pani Puri", "Pakistan", "Starter", [0, 1, 0, 0, 0, 0], [.0, .2, .3, .0, .4, .1], 4.99, "images/pakistani-cuisine/starter-panipuri.jpg");
  allStarters.push(one);
  var one = new Dish ("Samosa", "Pakistan", "Starter", [0, 1, 0, 0, 0, 1], [.0, .3, .2, .0, .3, .2], 4.99, "images/pakistani-cuisine/starter-samosas.jpg");
  allStarters.push(one);
  var one = new Dish ("Pakora", "Pakistan", "Starter", [0, 1, 0, 0, 0, 2], [.0, .3, .2, .0, .2, .3], 3.99, "images/pakistani-cuisine/starter-pakora.jpg");
  allStarters.push(one);
  // var one = new Dish ("Chicken Qorma", "Pakistan", "Main Course", [0, 1, 0, 0, 0, 0], [0, 0, ]);

}
User.prototype.generateFlavorProfile = function(){
  var startersLength = this.starters.length;
  var drinksLength = this.drinks.length;
  var maincoursesLength = this.maincourses.length;
  var dessertsLength = this.desserts.length;
  var totalNumberOfDishes = startersLength + drinksLength + maincoursesLength + dessertsLength;
  var starterFlavorArray = [];
  var drinksFlavorArray = [];
  var mainCourseFlavorArray = [];
  var dessertsFlavorArray = [];
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

  //Generate average vector for desserts course.
  for(var i = 0; i < dessertsLength; i ++){
    var currentDish = this.desserts.flavProfile[i];
    startersFlavorArray.addArrays(currentDish);
  }
  starterFlavorArray.divideArray(dessertsLength);
  //Generate total flavor profile
  totalFlavorArray.addArrays(starterFlavorArray);
  totalFlavorArray.addArrays(drinksFlavorArray);
  totalFlavorArray.addArrays(mainCourseFlavorArray);
  totalFlavorArray.addArrays(dessertsFlavorArray);
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
// generateUser -> display food from their from country(allergies, vegetarian) -> select -> generates flavor/food group profile from their starteres/Drinks/Maincourses/desserts
// -> Filter any country. ->Display result for to country.
$(document).ready(function(){
  $("form#generateDish").submit(function(event) {
    console.log("login");
    event.preventDefault();
    var nameIn = $("#nameLogin").val();
    var loginIn = $("#passwordLogin").val();
    if(login(nameIn, loginIn)){
      //switch to userpage
    }
  });
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
      //switch to newUserSection
    }
  });
  $("form#login").submit(function(event) {
    console.log("login");
    event.preventDefault();
    var nameIn = $("#nameLogin").val();
    var loginIn = $("#passwordLogin").val();
    if(login(nameIn, loginIn)){
      //switch to userpage
    }
  });
  $("form#resultFirst").submit(function(event) {
    var selectedDishes = [];
    $("input:checkbox[name=selected]:checked").each(function(){
      selectedDishes.push($(this).val());
    });

  })
});
