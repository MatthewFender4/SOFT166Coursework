//The password check strings
const lowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
const upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeralStr = "0123456789";
const specialStr = "#?!$£%&_()[],./+-";

var strengthCount;
var passwordStrengthMessage;

//Just a small example list for use as a proof of concept
const commonNameArray = [
  "Password",
  "password",
  "12345",
  "54321",
  "9999",
  "1111",
  "blink",
  "182",
  "Olivia",
  "Sophia",
  "Ava",
  "Amelia",
  "Isla",
  "Lily",
  "Mia",
  "Emily",
  "Isabella",
  "Freya",
  "Rosie",
  "Willow",
  "Ivy",
  "Ruby",
  "Grace",
  "Poppy",
  "Shirley",
  "Austin",
  "Alva",
  "Tate",
  "Diego",
  "Matt",
  "Davis",
  "Cash",
  "Luca",
  "George",
  "William",
  "Easton",
  "Lucius",
  "Ash",
  "Max",
  "Oscar",
  "Buddy",
  "Archie",
  "Teddy",
  "Milo",
  "Toby",
  "Millie",
  "Daisy",
  "Luna",
  "Simba",
  "Lola"
];

function passwordCheck(inputStr) {
  //Reset the password strength count
  strengthCount = 0;
  passwordStrengthMessage = "";
  //Overview
  //get the password string
  // document.getElementById("demo").textContent = inputStr;
  //now use it for each of the checks
  //also do each of the checks with every update!
  //by using the input 'oninput' as the event trigger, checks will be done if the user adds OR deletes characters
  // so ensuring the latest value of the password is always checked
  doLowerCaseCheck(inputStr);
  doUpperCaseCheck(inputStr);
  doNumeralCheck(inputStr);
  doSpecialCheck(inputStr);
  doLengthCheck(inputStr);
  doCommonCheck(inputStr);
  doOverallStrength();
}

function doLowerCaseCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = lowerCaseStr.indexOf(inputStr[i]);
    if (v > -1) {
      //lower case found
      document.getElementById("lowerCheck").style.backgroundColor = "green";
      strengthCount++;
      return;
    }
  }
  //lower case char was not found
  document.getElementById("lowerCheck").style.backgroundColor = "red";
  passwordStrengthMessage = "No Lower case char;";
  return;
}

function doUpperCaseCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = upperCaseStr.indexOf(inputStr[i]);
    if (v > -1) {
      //upper case found
      document.getElementById("upperCheck").style.backgroundColor = "green";
      strengthCount++;
      return;
    }
  }
  //upper case char was not found
  document.getElementById("upperCheck").style.backgroundColor = "red";
  passwordStrengthMessage += " No Upper Case char;";
  return;
}

function doNumeralCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = numeralStr.indexOf(inputStr[i]);
    if (v > -1) {
      //numeral found
      document.getElementById("numberCheck").style.backgroundColor = "green";
      strengthCount++;
      return;
    }
  }
  //numeral was not found
  document.getElementById("numberCheck").style.backgroundColor = "red";
  passwordStrengthMessage += " No numeral;";
  return;
}

function doSpecialCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = specialStr.indexOf(inputStr[i]);
    if (v > -1) {
      //special char found
      document.getElementById("specialCheck").style.backgroundColor = "green";
      strengthCount++;
      return;
    }
  }
  //special char was not found
  document.getElementById("specialCheck").style.backgroundColor = "red";
  passwordStrengthMessage += " No Special Character;";
  return;
}

function doLengthCheck(inputStr) {
  //length check is the only check which isnt binary
  // it uses red when length is far too short
  // then yellow when the password is closer to a sufficient length
  // then green when it meets the required minimum

  if (inputStr.length < 6) {
    document.getElementById("lenCheck").style.backgroundColor = "red";
    passwordStrengthMessage += " Far too short;";
  } else if (inputStr.length >= 6 && inputStr.length < 8) {
    document.getElementById("lenCheck").style.backgroundColor = "yellow";
    passwordStrengthMessage += " Add a couple more characters;";
    strengthCount++;
  } else {
    document.getElementById("lenCheck").style.backgroundColor = "green";
    strengthCount++;
    strengthCount++;
  }
}

function doCommonCheck(inputStr) {
  var found = false;

  for (i = 0; i < commonNameArray.length; i++) {
    //only check if the name fits!

    //check if the common word from the array is anywhere in the input string
    if (inputStr.length >= commonNameArray[i].length) {
      var v = inputStr.indexOf(commonNameArray[i]);
      if (v > -1) {
        //if found reduce strength by 2
        strengthCount--;
        strengthCount--;
        passwordStrengthMessage +=
          "Includes Common word: " + commonNameArray[i];
        //Common name was found
        found = true;
        break; //break out of the for loop when first common word is found
      }
    }
  }

  if (found) {
    document.getElementById("commonCheck").style.backgroundColor = "red";
  } else {
    document.getElementById("commonCheck").style.backgroundColor = "green";
    strengthCount++;
  }

  return;
}

function doOverallStrength(inputStr) {
  //Now all the key checks have been done
  //we can add up the score and see the strength
  //Light 6 will be used to reflect the strength

  var strengthStr;

  if (strengthCount < 4) {
    document.getElementById("passwordStrength").style.backgroundColor = "red";
    strengthStr = "Very Weak: ";
    document.getElementById("strengthHeader").style.backgroundColor = "red";
  } else if (strengthCount >= 4 && strengthCount < 7) {
    document.getElementById("passwordStrength").style.backgroundColor =
      "yellow";
    document.getElementById("strengthHeader").style.backgroundColor = "yellow";
    strengthStr = "Weak: ";
  } else {
    document.getElementById("passwordStrength").style.backgroundColor = "green";
    document.getElementById("strengthHeader").style.backgroundColor = "green";
    strengthStr = "STRONG: ";
  }

  //Now provide the text explanation to the user
  passwordStrengthMessage =
    strengthStr + strengthCount + " " + passwordStrengthMessage;
  document.getElementById(
    "strengthComment"
  ).textContent = passwordStrengthMessage;
}
