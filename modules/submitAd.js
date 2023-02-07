// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  getDatabase,
  set,
  update,
  get,
  ref,
  child,
  remove,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

import { firebaseConfig } from "./firebase.js";

// Initialize Firebase, authentication, database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//submit add
const submitAd = () => {
  const adTitle = document.getElementById("exampleFormControlInput1").value;
  const adPrice = document.querySelector(".price-input").value;
  const adDesc = document.querySelector(".desc-input").value;
  const adCategory = document.getElementById("dropdownMenuButton1").textContent;
  const adUser = auth.currentUser.email;
  const adDate = new Date();

  if (adTitle == "" || adCategory == "") {
    console.log("Please fill all fields");
    let errorInfo = document.createElement("div");
    errorInfo.classList.add("alert", "alert-danger", "mt-3");
    errorInfo.setAttribute("role", "alert");
    errorInfo.setAttribute("id", "adAlert");
    errorInfo.textContent = "Please fill all fields";
    document.querySelector(".category-selection").appendChild(errorInfo);
    setTimeout(() => {document.querySelector(".category-selection").removeChild(errorInfo);}, '1000');
    return;
  } else {
    console.log("ad submitted");
    let adAdded = document.createElement("div");
    adAdded.classList.add("alert", "alert-success", "mt-3");
    adAdded.setAttribute("role", "alert");
    adAdded.setAttribute("id", "adAlert");
    adAdded.textContent = "Ad added successfully";
    document.querySelector(".category-selection").appendChild(adAdded);
    setTimeout(() => {document.querySelector(".category-selection").removeChild(adAdded);}, '1000');
  }

  //pushinam i database
  push(ref(database, "ads/"), {
    title: adTitle,
    price: adPrice,
    description: adDesc,
    category: adCategory,
    user: adUser,
    date: adDate,
  });

  

};

export { submitAd };
