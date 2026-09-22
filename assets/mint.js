'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
const form=document.querySelector('#contact-form');
if(form){
 const kind=document.querySelector('#kind');
 const selected=new URLSearchParams(location.search).get('klus');
 if([...kind.options].some(o=>o.value===selected))kind.value=selected;
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.querySelector('#name');const message=document.querySelector('#message');
  name.setCustomValidity(name.value.trim()?'':'Vul uw naam in.');
  message.setCustomValidity(message.value.trim()?'':'Beschrijf kort uw plannen.');
  if(!form.reportValidity())return;
  const text=`Hallo Luka, ik wil graag mijn klus bespreken.\n\nNaam: ${name.value.trim()}\nSoort klus: ${kind.selectedOptions[0].text}\n\n${message.value.trim()}`;
  document.querySelector('#preview-text').textContent=text;
  const link=document.querySelector('#whatsapp-link');
  link.href=`https://wa.me/31617321266?text=${encodeURIComponent(text)}`;
  document.querySelector('#email-link').href=`mailto:info@klussenbedrijfmint.nl?subject=${encodeURIComponent('Klusaanvraag via de website')}&body=${encodeURIComponent(text)}`;
  form.hidden=true;document.querySelector('#message-preview').hidden=false;link.focus();
 });
 form.addEventListener('input',event=>event.target.setCustomValidity?.(''));
 document.querySelector('.edit-message').addEventListener('click',()=>{document.querySelector('#message-preview').hidden=true;form.hidden=false;document.querySelector('#message').focus();});
}
