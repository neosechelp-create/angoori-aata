(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  const form = document.getElementById('quote-form');
  const product = document.getElementById('product');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.focus();
    }
  });
  document.querySelectorAll('.product-enquire').forEach(button => {
    button.addEventListener('click', () => {
      product.value = button.dataset.product;
      document.getElementById('enquiry').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
      product.focus({preventScroll: true});
    });
  });
  function enquiryUrl() {
    const data = new FormData(form);
    const destination = String(data.get('destination') || '').trim();
    const requirement = String(data.get('message') || '').trim();
    const message = [
      'Hello Waseem, I would like a quotation.',
      'Product: ' + data.get('product'),
      'Packing: ' + data.get('packing') + ' per bag',
      'Quantity: ' + data.get('quantity') + ' bag(s)',
      ...(destination ? ['Delivery city: ' + destination] : []),
      ...(requirement ? ['Requirement: ' + requirement] : []),
      'Please confirm the current rate, minimum order, availability and delivery charges.'
    ].join('\n');
    return 'https://wa.me/919991408128?text=' + encodeURIComponent(message);
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    window.open(enquiryUrl(), '_blank', 'noopener,noreferrer');
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
