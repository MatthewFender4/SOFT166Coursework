# SOFT166Coursework

# PasswordChecker
SOFT166 Practical Submission
## General
This repository contains the software for a web based password strength checker.
The checker uses a REST API to connect with
a set of Hue Lights. The output from the lights (as well as local indicators on the webpage) indicates the password strength as described below.
# Application Overview
### The password strength checker application consists of 4 HTML pages:
* index.html The principal page which contains the password checker.
* About.html Which provides a basic overview of the site as well as the who and the what.
* Overview.html This page mainly describes the functional flow of the password checker using a
Flow Diagram.
* HueLightsKey.html This page provides the key to the Hue lights output in a simple table. It
also provides input examples with the expected responses.
### Other code based files included in the App are:
* ControlAndLights.js This file contains all the functions required to test a password as well
as the code to interface with the lab's Hue Lights 6 light setup.
* myStyles.js Although the main styling of the application is done through the use of Bootstrap 4,
this small style file was added to provide rounded buttons as well as some margin adjustments
to a few elements which required better alignment.
### Colour Scheme and Fonts
The main colour scheme for elements is the Bootstrap 4 default. Similary the text colours and
fonts are the Bootstrap 4 defaults.
## Password Checker Functionality
As can be seen the index.html page contains the password strength checker. **Its key features
include:**
* An overview of the purpose of the page in a Jumbotron enabling a new user to use the
checker with little need to refer to the other pages.
* A plain language input element into which the user types the password. The password is
deliberately shown in plain language to provide clarity of what has been typed in. The auto
spellchecker and auto correction have also been disabled to avoid the input being changed by
the system.
* The checker employs 4 binary checks (JS functions) to confirm at least one, lower-case,
upper-case, numeral and special character have been input.
* The system also checks the length of the password. Eight characters is required for a strong
password (Green response).
* The final check tests the password to see if it contains a common password, if it does then the
strength of the password is reduced and the user is informed. This aspect is a simple proof of concept
using a limited data set (the most common few passwords, child names and pet names) which could be
expanded upon if the system was further developed.
* Every time the user types in or deletes a character the checker runs through every check
serially. This ensures the assessment is valid at all times and the ouput reflects the improving
password as the user types it in.

* The checker employs 3 elements of feedback which advise the user of the password stength:
(1) The page includes a set of coloured badges which indicate whether each test has passed or
failed. These are not connected to the Hue Lights so the system can work without the lights. (2)
The page includes a feedback coloured button for each of the Hue Lights. (3) Each test provides
some text feedback so the user can address any issues detected and improve the password.

## Video
## Screenshots
