import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

export async function getCompanyData() {
  const ref = doc(db, "siteSettings", "company");
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return {
      companyName: "誠創科技工作室",
      phone: "",
      lineID: "",
      email: "",
      website: "",
      address: ""
    };
  }

  return snap.data();
}

export async function saveCompanyData(data) {
  const ref = doc(db, "siteSettings", "company");

  await setDoc(ref, {
    companyName: data.companyName || "",
    phone: data.phone || "",
    lineID: data.lineID || "",
    email: data.email || "",
    website: data.website || "",
    address: data.address || "",
    updatedAt: serverTimestamp()
  }, { merge: true });

  return true;
}
