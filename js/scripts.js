var allStarters = [];
var allDrinks = [];
var allMainCourses = [];
var allDeserts = [];
var allUsers = [];
var globalUser = null;
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

function Dish(nameIn, countryFrom, group, flavProfile, foodGProfile, cost, img){
  this.name = nameIn;
  this.countryFrom = countryFrom;
  this.group = group;
  this.flavProfile = flavProfile;
  this.foodGProfile = foodGProfile;
  this.cost = cost;
  this.img = img;
}

function FlavorProfile(thisSweet, thisSalty, thisBitter, thisSour, thisUmani){
  this.sweet = thisSweet;
  this.salty = thisSalty;
  this.bitter = thisBitter;
  this.sour = thisSour;
  this.umani = thisUmani;
}

function FoodGroupProfile(thisFruit, thisVeg, thisProtein, thisDairy, thisGrains, thisOil){
  this.fruit = thisFruit;
  this.vegetable = thisVeg;
  this.protein = thisProtein;
  this.dairy = thisDairy;
  this.grain = thisGrains;
  this.oil = thisOil;
}
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
function generatePakistaniFood(){
  //PAKISTANI
  var one = new Dish("Chicken Biryani", "Pakistan", "Main Course", [0, 1, 0, 0, 0], [0, 1, 0, 1, 3], 20, image);
  allMainCourses.push(one5);
  var one = new Dish ("Chicken Karahi", "Pakistan", "Main Course", [0, 1, 0, 0, 0], [0, 1, 0, 1, 3], 15, image);
  allMainCourses.push(one);
  var one = new Dish ("Lassi", "Pakistan", "Drink", [1, 1, 0, 0, 0], [0, 5, 5, 0, 0], 3, image);
  allDrinks.push(one);
  var one = new Dish ("Ras Malai", "Pakistan", "Desert", [2, 0, 0, 0, 0], [0, 0, 5, 0, 0]);
  allDeserts.push(one);
  var one = new Dish ("Cholay", "Pakistan", "Starter", [1, 2, 0, 0, 0], [0, 0, 0, 0, 0], 4, image);
  allStarters.push(one);
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
// generateUser -> display food from their from country(allergies, vegetarian) -> select -> generates flavor/food group profile from their starteres/Drinks/Maincourses/deserts
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
});
