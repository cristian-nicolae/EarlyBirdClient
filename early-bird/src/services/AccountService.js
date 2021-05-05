import axios from "axios";
import jwt_decode from "jwt-decode";

async function Login(username, password) {
  let path = sessionStorage.getItem("server") + "/api/Login";
  try {
    let response = await axios.post(path, {
      username: username,
      password: password,
    });
    localStorage.setItem("jwt", response.data["token"]);
    return true; 
  } catch  {
    return false;
  }
}

async function Register(username, password, firstname, lastname, email, role) {
  let path = sessionStorage.getItem("server") + "/api/Register";
  try {
    let response = await axios.post(path, {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role
    });
    localStorage.setItem("jwt", response.data["token"]);
    return ['', true]; 
  } catch (err) {
    console.log(err, err.response);
    if(err.response.status === 403)
      return ['User already existing!', false];
      
    return ['Cannot be empty!', false];
  }
}

function IsUserLoggedIn(){
  let jwt = localStorage.getItem("jwt");
  if(jwt === null)
    return false;
  return true;

  // the below code is used to check expiration date
  // let jwtDecoded = jwt_decode(jwt);
  // let isExpired = jwtDecoded.exp < new Date().getTime();
  // return !isExpired;
}


function GetRole(){
  let jwt = DecodeJwt()
  if(jwt === null)
    return null;
  if(jwt.Admin === "true")
    return "admin"
  if(jwt.Worker === "true")
    return "worker"
  if(jwt.Publisher === "true")
    return "publisher"
  return null;
}

function GetUserName(){
  let jwt = DecodeJwt()
  return jwt.userName;
}

function GetUserId(){
  let jwt = DecodeJwt()
  return jwt.sub;
}

function GetFirstName(){
  let jwt = DecodeJwt()
  return jwt.firstName;
}

function DecodeJwt(){
  return jwt_decode(localStorage.getItem("jwt"));
}

export { Login, Register, IsUserLoggedIn, GetRole, GetUserName,GetUserId, GetFirstName };
