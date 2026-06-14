const title = document.getElementById('panelTitle');
const content = document.getElementById('panelContent');
document.querySelectorAll('aside button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const name = btn.textContent;
    title.textContent = name;
    content.innerHTML = `「${name}」模組已預留。接上 Firebase 後，這裡會變成真正的新增、修改、刪除與圖片上傳介面。`;
  });
});
document.getElementById('loginBtn').addEventListener('click',()=>{
  document.getElementById('loginStatus').textContent='目前為測試外殼：Firebase 建立後才會啟用真正登入。';
});
