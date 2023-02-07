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

//my modules
import { createRegisterLoginForm } from "./registerForm.js";
import { logOutButton } from "./logOutBtn.js";
import { createCategoryAdmin } from "./createCategoryAdmin.js";
import { navbarFunc } from "./navbar.js";
import { adForm } from "./adForm.js";
import { submitAd } from "./submitAd.js";
import { myAds } from "./myAds.js";


import { firebaseConfig } from "./firebase.js";

// Initialize Firebase, authentication, database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
//______________________________

const register_new_user = (e) => {
  e.preventDefault();

  //lauku validacija, ar uzpildyti, ar teisingai uzplidyti
  const user_email = document.querySelector("#email-input").value;
  const user_passwd = document.querySelector("#pass-input").value;

  createUserWithEmailAndPassword(auth, user_email, user_passwd)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("New User Created");
      const loginTime = new Date();
      set(ref(database, "users/" + user.uid), {
        email: user_email,
        passwd: user_passwd,
        role: "simple_user",
        timestamp: `${loginTime}`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//prisijungimo funkcija
function loginUserFunc(e) {
  e.preventDefault();
  const user_email = document.querySelector("#email-input").value;
  const user_passwd = document.querySelector("#pass-input").value;

  signInWithEmailAndPassword(auth, user_email, user_passwd)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Logged in sucssesfuly");
      const login_time = new Date();
      update(ref(database, "users/" + user.uid), {
        timestamp: `${login_time}`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// user signed in function
const users = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    //jai useris prisijunges, uzkrauna atsijungimo mygtuka
    navbarFunc();
    //kokia userio role
    get(ref(database, "users/" + user.uid)).then((snapshot) => {
      const userData = snapshot.val();
      //jai user admin
      if (userData.role === "admin") {
        console.log("useris admin");

        //rodyk kategorijos ivedima
        createCategoryAdmin();
        const addCategory = (e) => {
          e.preventDefault();
          const categoryName = document.getElementById("category_name").value;

          //pushinam i database
          push(ref(database, "categories/"), {
            name: categoryName,
          })
          .then(console.log(`${categoryName} saved`)) .catch((error) => {
            console.log(error);
          });
        };
        document.getElementById("category").addEventListener("click", addCategory);

        //rodyk kategoriju sarasa

        onValue(ref(database, "categories/"), (snapshot) => {
          let categories = snapshot.val();

          let cat_table = document.getElementById('table');
          cat_table.innerHTML = '';
          let th_row = document.createElement('thead');
          th_row.innerHTML = `
            <tr class="my-3">
              <th scope="col">Category name</th>
              <th scope="col">Remove Category</th>
            </tr>`;
          cat_table.appendChild(th_row);

          for (let x in categories) {
            let cat_tr = document.createElement("tr");
            cat_tr.className = "table_secondary";
            let cat_td = document.createElement("td");
            cat_td.innerHTML = categories[x].name;

            let category_td = document.createElement("td");
            let category_deleteBtn = document.createElement("button");
            category_deleteBtn.classList.add("btn", "btn-outline-danger");
            category_deleteBtn.textContent = "Delete";
            category_td.appendChild(category_deleteBtn);

            // delete category
            const deleteCategory = () => {
              remove(ref(database, "categories/" + x));
              console.log("category deleted")
            }
            category_deleteBtn.addEventListener("click", deleteCategory);

            cat_tr.appendChild(cat_td);
            cat_tr.appendChild(category_td);

            cat_table.appendChild(cat_tr);
          }
        })
        logOutButton();
        document.getElementById("logoutBtn").addEventListener("click", logoutUserFunc);

        //simple user 
      } else {
        //jai user simple user
        console.log("useris simple user");
        adForm();
        onValue(ref(database, "categories/"), (snapshot) => {
          // kategoriju rodymas dropdown'e
          let categories = snapshot.val();
          let catUl = document.getElementById("dropdown-menu");
          let catList = document.createElement("li");
          catUl.appendChild(catList);
          for (let x in categories) {
            let catList = document.createElement("li");
            catList.innerHTML = `
            <li><a class="dropdown-item" href="#">${categories[x].name}</a></li>
            `;
            catUl.appendChild(catList);
          }

          // show slected value on dropdown button
          const dropdownBtn = document.getElementById("dropdownMenuButton1");
          const dropdownItems = document.querySelectorAll(".dropdown-item");
          dropdownItems.forEach((item) => {
            item.addEventListener("click", () => {
              dropdownBtn.textContent = item.textContent;
            });
          });
          //calling function to create ad
          const submitBtn = document.getElementById("submitBtn");
          submitBtn.addEventListener("click", submitAd);
        });
        
        myAds();
        //show ads that user created
        onValue(ref(database, "ads/"), (snapshot) => {
          let ads = snapshot.val();

          let myAdsTable = document.getElementById("adsTable")
          myAdsTable.innerHTML = "";
          let adTh_row = document.createElement('thead');
          adTh_row.innerHTML = `
            <tr class="my-3">
              <th scope="col">Category</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Remove Ad</th>
            </tr>`;
          myAdsTable.appendChild(adTh_row);

          for (let x in ads) {
            let ad_tr = document.createElement('tr');
            ad_tr.className = "table_secondary";
            let ad_td = document.createElement('td');
            ad_td.innerHTML = ads[x].category;
            let ad_title = document.createElement('td');
            ad_title.innerHTML = ads[x].title;
            let ad_price = document.createElement('td');
            ad_price.innerHTML = ads[x].price;
            let ad_description = document.createElement('td');
            ad_description.innerHTML = ads[x].description;

            let ad_td_delete = document.createElement('td');
            let ad_deleteBtn = document.createElement('button');
            ad_deleteBtn.classList.add("btn", "btn-outline-danger");
            ad_deleteBtn.textContent = "Delete";
            ad_td_delete.appendChild(ad_deleteBtn);

            // delete ad
            const deleteAd = () => {
              remove(ref(database, "ads/" + x));
              console.log("ad deleted")
            };
            ad_deleteBtn.addEventListener("click", deleteAd);

            ad_tr.appendChild(ad_td);
            ad_tr.appendChild(ad_title);
            ad_tr.appendChild(ad_price);
            ad_tr.appendChild(ad_description);
            ad_tr.appendChild(ad_td_delete);

            myAdsTable.appendChild(ad_tr);
          }

        });

        //atsijungimo mygtukas
        logOutButton();
        document.getElementById("logoutBtn").addEventListener("click", logoutUserFunc);
      }
    });
  } else {
    //jai atsijunges, rodome prisijungimo forma
    console.log("useris neprisijunges");
    createRegisterLoginForm();
    const registerBtn = document.querySelector("#registerBtn");
    registerBtn.addEventListener("click", register_new_user);
    document.getElementById("loginBtn").addEventListener("click", loginUserFunc);
  }
});

//atsijungimo funkcija
const logoutUserFunc = (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      console.log("Signed out sucssesfuly");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
