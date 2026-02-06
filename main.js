const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

if (!openBtn || !closeBtn || !modal || !overlay) {
    console.error('One or more modal elements not found');
} else {
    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });

    function closeModal() {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}
const form = document.getElementById('userForm');
form.addEventListener('submit', (evennt) => {
    evennt.preventDefault();
});
const errorMassage = document.getElementById('errorMassage');
const emailInput = document.getElementById('emailInput');
const nameInput = document.getElementById('nameInput');
form.addEventListener('submit', (evennt) => {
    evennt.preventDefault();

    const nameValu = nameInput.value.trim();
    const emailValu = emailInput.value.trim();

    if (nameValu === '' || emailValu === '') {
        errorMassage.classList.remove('hidden');
        return;
    }
    errorMassage.classList.add('hidden');
    console.log('form invalid');
});
