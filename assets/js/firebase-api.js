import { firebaseEnabled } from './firebase-config.js';

export async function getSiteSettings(){
  if(!firebaseEnabled){
    return { companyName:'誠創科技網站 V2 測試版', intro:'等待串接 Firebase，目前先用本地預設文字。' };
  }
  // TODO: 接 Firestore getDoc(doc(db,'siteSettings','main'))
}

export async function getServices(){
  if(!firebaseEnabled){
    return [
      {title:'POS 系統',desc:'餐飲、零售、美業 POS 與設備整合'},
      {title:'電子發票',desc:'發票申請、串接與上線支援'},
      {title:'網站設計',desc:'形象網站、後台與表單中心'},
      {title:'雲端管理',desc:'客戶資料、圖片與權限集中管理'}
    ];
  }
  // TODO: 接 Firestore collection services
}
