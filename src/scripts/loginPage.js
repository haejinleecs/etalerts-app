// import bcrypt from 'bcrypt';
const signup = document.getElementById('signup-text');
const email = document.getElementById('emailInput')
const password = document.getElementById('passwordInput')
const loginButton = document.getElementById('login-button')
 
async function validateLogin(data){
  const valid = await fetch("/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const user = await valid.json()
  return user
}

signup.addEventListener('click', async (e) => {
  window.location = "/signup"
});

loginButton.addEventListener('click', async (e) => {
  if(email.value == "" || password.value == ""){
    alert("PLEASE ENTER AN EMAIL AND PASSWORD")
    return
  }
  const user = await validateLogin({"email": email.value, "password": password.value})
  if(user != null){
    console.log("USER IS ", user)
    sessionStorage.setItem('User', JSON.stringify(user));
    window.location = '/'
  }
  else{
    alert("INVALID LOGIN")
  }
});

