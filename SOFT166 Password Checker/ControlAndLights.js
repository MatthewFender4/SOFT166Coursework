//The password check strings
const lowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
const upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeralStr = "0123456789";
const specialStr = "#?!$£%&_()[],./+-";

//The lamp hues
const redHue = 65535;
const yellowHue = 10500;
const greenHue = 25500;

//Strength of the password and the output comments on what is missing
var strengthCount;
var passwordStrengthMessage;

//Just an illustrative sample a full development would use a server based file download with a few thousand names. It would contain common passwords, childrens names and pets names
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
  //Reset the password strength count and the message
  strengthCount = 0;
  passwordStrengthMessage = "";
  /*
   Overview
   get the password string
   document.getElementById("demo").textContent = inputStr;
   now use it for each of the checks
   also do each of the checks with every update!
   by using the input 'oninput' as the event trigger, checks will be done if the user deletes characters
   so ensuring the latest value of the password is always checked
  */
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
      //switch on the hue light 1 to green
      lightToColour("on", 1, greenHue);
      //show that has happened to the userusing the indicator button
      setHueIndicator("L1", "green", "ON Green");
      strengthCount++;
      return;
    }
  }
  //lower case char was not found
  document.getElementById("lowerCheck").style.backgroundColor = "red";
  lightToColour("on", 1, redHue);
  setHueIndicator("L1", "red", "ON Red");
  passwordStrengthMessage = "No Lower case char;";
  return;
}

function doUpperCaseCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = upperCaseStr.indexOf(inputStr[i]);
    if (v > -1) {
      //upper case found
      document.getElementById("upperCheck").style.backgroundColor = "green";
      lightToColour("on", 2, greenHue);
      setHueIndicator("L2", "green", "ON Green");
      strengthCount++;
      return;
    }
  }
  //upper case char was not found
  document.getElementById("upperCheck").style.backgroundColor = "red";
  lightToColour("on", 2, redHue);
  setHueIndicator("L2", "red", "ON Red");
  passwordStrengthMessage += " No Upper Case char;";
  return;
}

function doNumeralCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = numeralStr.indexOf(inputStr[i]);
    if (v > -1) {
      //numeral found
      document.getElementById("numberCheck").style.backgroundColor = "green";
      lightToColour("on", 3, greenHue);
      setHueIndicator("L3", "green", "ON Green");
      strengthCount++;
      return;
    }
  }
  //numeral was not found
  document.getElementById("numberCheck").style.backgroundColor = "red";
  lightToColour("on", 3, redHue);
  setHueIndicator("L3", "red", "ON Red");
  passwordStrengthMessage += " No numeral;";
  return;
}

function doSpecialCheck(inputStr) {
  for (i = 0; i < inputStr.length; i++) {
    var v = specialStr.indexOf(inputStr[i]);
    if (v > -1) {
      //special char found
      document.getElementById("specialCheck").style.backgroundColor = "green";
      lightToColour("on", 4, greenHue);
      setHueIndicator("L4", "green", "ON Green");
      strengthCount++;
      return;
    }
  }
  //special char was not found
  document.getElementById("specialCheck").style.backgroundColor = "red";
  lightToColour("on", 4, redHue);
  setHueIndicator("L4", "red", "ON Red");
  passwordStrengthMessage += " No Special Character;";
  return;
}

function doLengthCheck(inputStr) {
  //length check is the first check which isnt binary
  // it uses red when length is far too short
  // then yellow when it is getting there and green when it meets the required minimum

  if (inputStr.length < 6) {
    document.getElementById("lenCheck").style.backgroundColor = "red";
    lightToColour("on", 5, redHue);
    setHueIndicator("L5", "red", "ON Red");
    passwordStrengthMessage += " Far too short;";
  } else if (inputStr.length >= 6 && inputStr.length < 8) {
    document.getElementById("lenCheck").style.backgroundColor = "yellow";
    lightToColour("on", 5, yellowHue);
    setHueIndicator("L5", "yellow", "ON Yellow");
    passwordStrengthMessage += " Add a couple more characters;";
    strengthCount++;
  } else {
    document.getElementById("lenCheck").style.backgroundColor = "green";
    lightToColour("on", 5, greenHue);
    setHueIndicator("L5", "green", "ON Green");
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
        //Common name was found tell user what it was
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
    lightToColour("on", 6, redHue);
    setHueIndicator("L6", "red", "ON Red");
  } else if (strengthCount >= 4 && strengthCount < 7) {
    document.getElementById("passwordStrength").style.backgroundColor =
      "yellow";
    document.getElementById("strengthHeader").style.backgroundColor = "yellow";
    lightToColour("on", 6, yellowHue);
    setHueIndicator("L6", "yellow", "ON Yellow");
    strengthStr = "Weak: ";
  } else {
    document.getElementById("passwordStrength").style.backgroundColor = "green";
    document.getElementById("strengthHeader").style.backgroundColor = "green";
    lightToColour("on", 6, greenHue);
    setHueIndicator("L6", "green", "ON Green");
    strengthStr = "STRONG: ";
  }

  //Now provide the text explanation to the user
  passwordStrengthMessage =
    strengthStr + strengthCount + " " + passwordStrengthMessage;
  document.getElementById(
    "strengthComment"
  ).textContent = passwordStrengthMessage;
}

/*
  Hue light management section of code
  Key elements taken from the lab work and adapted
*/

function getLightURI(lightNum) {
  //using home Hue lights for testing
  var IP = "http://192.168.0.17/api/"; //!!!! Change this back to http://192.168.0.50/api/
  var username = "xME26iv6t6YwFvx26rRmOkxU4a5MuwZGuXztilX0"; // !!!!!! Change back to "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz" when back in the labs;
  var lights = "/lights/";
  var URI = IP + username + lights;
  return URI + lightNum + "/";
}

function lightToColour(onStatus, lightNum, colorHue) {
  // this function will set a numbered light to a requested colour and confirm success
  // the brightness and saturation values remain the same for all calls
  var lightState = { on: onStatus, hue: colorHue, sat: 245, bri: 100 };

  $.ajax({
    url: getLightURI(lightNum) + "state/",
    type: "PUT",
    data: JSON.stringify(lightState)
  });
}

function activateAllHueLights() {
  //this checks the link to the hue lights works and sets all 6 lights to red
  //first switch them all off to ensure we get rid off any other settings
  for (i = 1; i < 7; i++) {
    //change this to i once all lights working
    lightToColour(false, i, redHue); //hue is ignored
  }
  //now set them all to on and red
  for (i = 1; i < 7; i++) {
    //change this to i once all lights working
    lightToColour(true, i, redHue);
    var idStr = "L" + i.toString();
    setHueIndicator(idStr, "red", "ON Red");
  }
   //If resetting the lights delete any password present at that time
   document.getElementById("passwordInput").value = "";
 
}

function setHueIndicator(idStr, bgColor, btnText) {
  //Feedback to show hue light status
  document.getElementById(idStr).style.backgroundColor = bgColor;
  //Saying what the colour is in case user is colour blind
  document.getElementById(idStr).textContent = btnText;
}
