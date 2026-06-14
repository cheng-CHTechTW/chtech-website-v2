import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { app } from "./firebase-config.js";
import { getCompanyData, saveCompanyData } from "./firebase-api.js";

const auth = getAuth(app);

const loginBox = document.getElementById("loginBox");
const panelBox = document.getElementById("panelBox");
const loginStatus = document.getElementById("loginStatus");

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const saveCompanyBtn = document.getElementById("saveCompanyBtn");

const companyName = document.getElementById("companyName");
const phone = document.getElementById("phone");
const lineID = document.getElementById("lineID");
const emailContact = document.getElementById("emailContact");
const website = document.getElementById("website");
const address = document.getElementById("address");

loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    alert("登入失敗：" + err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBox.style.display = "none";
    panelBox.style.display = "block";
    loginStatus.textContent = "已登入：" + user.email;

    const data = await getCompanyData();

    companyName.value = data.companyName || "";
    phone.value = data.phone || "";
    lineID.value = data.lineID || "";
    emailContact.value = data.email || "";
    website.value = data.website || "";
    address.value = data.address || "";
  } else {
    loginBox.style.display = "block";
    panelBox.style.display = "none";
  }
});

saveCompanyBtn.addEventListener("click", async () => {
  await saveCompanyData({
    companyName: companyName.value,
    phone: phone.value,
    lineID: lineID.value,
    email: emailContact.value,
    website: website.value,
    address: address.value
  });

  alert("公司資料已儲存到 Firebase");
});
