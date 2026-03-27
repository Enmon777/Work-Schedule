Plan 1: MVVM
Goal
Implement registration with index.html as the View, main.js as the View Controller, authViewModel.js as the ViewModel, and firebaseService.js as the Model.

Responsibilities
index.html

Contains only UI markup and container elements
No validation or Firebase logic
Includes form fields: Full Name, Email, Password, Confirm Password
Includes placeholders for error/success messages
main.js

Handles DOM wiring
Listens for form submit
Calls ViewModel methods
Performs UI updates like redirecting or showing messages
authViewModel.js

Contains registration/login logic
Performs validation:
all fields required
valid email format
password length >= 6
confirm password matches
Calls firebaseService.js for auth and Firestore operations
Returns structured success/error state to the View Controller
firebaseService.js

Handles Firebase initialization
Exposes:
registerUser(email, password)
saveUserProfile(uid, profileData)
loginUser(email, password)
fetchUserRole(uid)
Writes user role document to Firestore with default role placeholder
Implementation Steps
Build registration form in index.html

id="signupForm"
fields: signupName, signupEmail, signupPassword, signupConfirmPassword
message elements: signupError, signupSuccess
Add event handling in main.js

signupForm.addEventListener("submit", async e => { ... })
collect form values
call authViewModel.signup(name, email, password, confirmPassword)
display returned error or success message
on success redirect to login page
Implement validation in authViewModel.js

signup(name, email, password, confirmPassword)
return:
{ success: true, message: "Registration complete" }
or { success: false, message: "Email invalid" }
if valid, invoke model functions
Implement Firebase Model in firebaseService.js

createUserWithEmailAndPassword
create Firestore doc:
collection users
doc ID = uid
fields: name, email, role: "Pending", createdAt
note: role assignment happens later by admin
Redirect after successful signup

from main.js, call window.location.href = "index.html" or login page
Edge cases to test
empty fields
invalid email
weak password
password mismatch
duplicate email / auth/email-already-in-use
Firebase network failure
Firestore write failure
