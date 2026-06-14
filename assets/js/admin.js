import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { app, db } from "./firebase-config.js";

const auth = getAuth(app);

const loginBox = document.getElementById("loginBox");
const panelBox = document.getElementById("panelBox");
const loginStatus = document.getElementById("loginStatus");
const resultBox = document.getElementById("resultBox");

const pages = {
  dashboard: document.getElementById("dashboardPage"),
  company: document.getElementById("companyPage"),
  services: document.getElementById("servicesPage"),
  forms: document.getElementById("formsPage")
};

function showPage(name) {
  Object.values(pages).forEach(page => page.style.display = "none");
  pages[name].style.display = "block";
}

document.querySelectorAll("[data-tab]").forEach(btn => {
  btn.onclick = () => showPage(btn.dataset.tab);
});

document.getElementById("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value.trim(),
      document.getElementById("password").value.trim()
    );
  } catch (err) {
    alert("登入失敗：" + err.message);
  }
};

document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    loginBox.style.display = "block";
    panelBox.style.display = "none";
    return;
  }

  loginBox.style.display = "none";
  panelBox.style.display = "block";
  loginStatus.textContent = "已登入：" + user.email;

  await loadCompany();
});

async function loadCompany() {
  const snap = await getDoc(doc(db, "siteSettings", "company"));
  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("companyName").value = data.companyName || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("emailContact").value = data.email || "";
  document.getElementById("lineID").value = data.lineID || "";
  document.getElementById("website").value = data.website || "";
  document.getElementById("address").value = data.address || "";
  document.getElementById("description").value = data.description || "";
}

document.getElementById("saveCompanyBtn").onclick = async () => {
  await setDoc(doc(db, "siteSettings", "company"), {
    companyName: document.getElementById("companyName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("emailContact").value,
    lineID: document.getElementById("lineID").value,
    website: document.getElementById("website").value,
    address: document.getElementById("address").value,
    description: document.getElementById("description").value,
    updatedAt: serverTimestamp()
  }, { merge: true });

  resultBox.textContent = "✅ 公司資料已儲存";
};

document.getElementById("loadServicesBtn").onclick = async () => {
  const snap = await getDocs(collection(db, "services"));
  const box = document.getElementById("servicesList");

  box.innerHTML = "";

  snap.forEach(docItem => {
    const data = docItem.data();
    box.innerHTML += `
      <div style="border:1px solid #ccc;margin:8px;padding:8px;">
        <strong>${data.title || docItem.id}</strong><br>
        <span>${data.desc || data.description || ""}</span>
      </div>
    `;
  });
};
