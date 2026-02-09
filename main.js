let users = [];
let editIndex = null;
const userList = document.getElementById('userList');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const form = document.getElementById('userForm');
const errorMessage = document.getElementById('errorMassage');
const emailInput = document.getElementById('emailInput');
const nameInput = document.getElementById('nameInput');

function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
function renderUsers() {
    userList.innerHTML = '';

    users.forEach(function (user, index) {
        const li = document.createElement('li');

        li.textContent = `${user.name} - ${user.email} `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'حذف';

        deleteBtn.setAttribute('data-index', index);

        li.appendChild(deleteBtn);

        userList.appendChild(li);
    });
}
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (!nameValue || !emailValue) {
        errorMessage.classList.remove('hidden');
        alert('برای ثبت نام لازمه که پر کنی 🙂');
        return;
    }

    errorMessage.classList.add('hidden');

    const user = {
        name: nameValue,
        email: emailValue,
    };

    users.push(user);

    renderUsers();

    nameInput.value = '';
    emailInput.value = '';

    closeModal();
});
userList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');

        users.splice(index, 1);

        renderUsers();
    }
});
