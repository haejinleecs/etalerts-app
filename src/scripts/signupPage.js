// import client from '../../database.js'

const login = document.getElementById('login-text');
const username = document.getElementById('usernameInput')
const fname = document.getElementById('fnameInput')
const lname = document.getElementById('lnameInput')
const email = document.getElementById('emailInput')
const password = document.getElementById('passwordInput')
const confirmpassword = document.getElementById('confirmpasswordInput')
const signupButton = document.getElementById('signup-button');

let user = undefined

async function registerUser(data) {
  // Use the client instance to perform database operations
  console.log(data)
  fetch("/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
  // Continue using the client for other operations as needed
};

login.addEventListener('click', async (e) => {
  window.location = "/login"
});

function directToHomepage(user){
  sessionStorage.setItem('User', JSON.stringify(user));
  window.location = "/"
}

signupButton.addEventListener('click', async (e) => {
  if(username.value == "" || email.value == "" || password.value == "" || confirmpassword.value == ""){
    alert("PLEASE FILL OUT ALL FIELDS")
    return
  }
  if(password.value != confirmpassword.value){
    alert("TWO DIFFERENT PASSWORD WERE ENTERED")
    return
  }
  const user = {"username": username.value, "email": email.value, "password": password.value, "fname": fname.value,
  "lname": lname.value}
  registerUser(user)
  directToHomepage(user)
});


