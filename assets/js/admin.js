import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { app, db } from "./firebase-config.js";

const auth = getAuth(app);

const loginBox = document.getElementById("loginBox");
const panelBox = document.getElementById("panelBox");
const loginStatus = document.getElementById("loginStatus");
const resultBox = document.getElementById("resultBox");

document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("登入失敗：" + err.message);
  }
};

document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBox.style.display = "none";
    panelBox.style.display = "block";
    loginStatus.textContent = "已登入：" + user.email;
  } else {
    loginBox.style.display = "block";
    panelBox.style.display = "none";
  }
});

document.getElementById("initBtn").onclick = async () => {
  if (!confirm("確定要初始化 Firebase 資料？")) return;

  resultBox.textContent = "初始化中...";

  try {
    await setDoc(doc(db, "siteSettings", "company"), {
      companyName: "誠創科技工作室",
      companyShortName: "CHTech",
      phone: "",
      mobile: "",
      lineID: "",
      email: "service@chuang-c.com",
      website: "https://chuang-c.com",
      address: "",
      slogan: "專業・創新・服務",
      status: "active",
      version: "V2",
      updatedAt: serverTimestamp()
    }, { merge: true });

    await setDoc(doc(db, "services", "pos"), {
      title: "POS系統",
      desc: "餐飲、零售、美業 POS 系統整合服務",
      sort: 1,
      status: "active",
      updatedAt: serverTimestamp()
    }, { merge: true });

    await setDoc(doc(db, "services", "invoice"), {
      title: "電子發票",
      desc: "電子發票申請、串接與營業流程整合",
      sort: 2,
      status: "active",
      updatedAt: serverTimestamp()
    }, { merge: true });

    await setDoc(doc(db, "services", "website"), {
      title: "網站設計",
      desc: "企業形象網站、後台管理與雲端資料整合",
      sort: 3,
      status: "active",
      updatedAt: serverTimestamp()
    }, { merge: true });

    await setDoc(doc(db, "formsConfig", "contact"), {
      requiredFields: ["contactName", "phone"],
      fields: [
        "contactName",
        "phone",
        "storeName",
        "businessArea",
        "lineName",
        "serviceType",
        "contactTime",
        "note"
      ],
      emailRequired: false,
      noteRequired: false,
      updatedAt: serverTimestamp()
    }, { merge: true });

    resultBox.textContent = "✅ 初始化完成：siteSettings、services、formsConfig 已建立";
  } catch (err) {
    resultBox.textContent = "❌ 初始化失敗：" + err.message;
  }
};
