import { getSiteSettings, getServices } from './firebase-api.js';

document.getElementById('year').textContent = new Date().getFullYear();
const settings = await getSiteSettings();
document.getElementById('companyName').textContent = settings.companyName;
document.getElementById('companyIntro').textContent = settings.intro;
const services = await getServices();
document.getElementById('services').innerHTML = services.map(s=>`<article class="item"><h3>${s.title}</h3><p>${s.desc}</p></article>`).join('');
