const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click' , () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');

    const isHidden = mobileMenu.classList.contains('hidden');
    menuToggle.setAttribute('aria-expanded', !isHidden);
})