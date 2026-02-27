console.log('ts chek');
let users = JSON.parse(localStorage.getItem('users') || '[]');
const userList = document.getElementById('userList');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const form = document.getElementById('userForm');
const errorMessage = document.getElementById('errorMassage');
const emailInput = document.getElementById('emailInput');
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById('lastName');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dateofbrith');
const countryInput = document.getElementById('country');
const photoInput = document.getElementById('profilePhoto');
function isEnglishName(value) {
    return /^[A-Za-z]+$/.test(value);
}
function isAdult(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && birthDate < today;
}
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}
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
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      ${user.nameInput} ${user.lastName} - ${user.email}
      <button class="delete-btn" data-index="${index}">حذف</button>
    `;
        userList.appendChild(li);
    });
    saveUsers();
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!nameInput.value || !emailInput.value) {
        errorMessage.classList.remove('hidden');
        alert('فرم ناقصه');
        return;
    }
    if (!isEnglishName(nameInput.value)) {
        alert('نام باید انگلیسی باشد');
        return;
    }
    if (!isEnglishName(lastNameInput.value)) {
        alert('نام خانوادگی انگلیسی باشد');
        return;
    }
    if (!isAdult(dobInput.value)) {
        alert('سن باید بالای 18 باشد');
        return;
    }
    if (passwordInput.value.length < 8) {
        alert('رمز حداقل 8 کاراکتر باشد');
        return;
    }
    const result = zxcvbn(passwordInput.value);
    if (result.score < 2) {
        alert('رمز ضعیفه');
        return;
    }
    let profilePhoto = 'no-photo';
    if (photoInput.files && photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('فرمت عکس معتبر نیست');
            return;
        }
        if (file.size > 80 * 1024) {
            alert('حجم عکس زیاد است');
            return;
        }
        profilePhoto = file;
    }
    const user = {
        nameInput: nameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        dob: dobInput.value,
        country: countryInput.value,
        profilePhoto: profilePhoto,
    };
    users.push(user);
    renderUsers();
    form.reset();
    closeModal();
});
userList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = Number(e.target.getAttribute('data-index'));
        users.splice(index, 1);
        renderUsers();
    }
});
async function loadCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const countries = await response.json();
        countryInput.innerHTML = '';
        countries.forEach((country) => {
            const option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;
            countryInput.appendChild(option);
        });
    }
    catch (error) {
        console.error('Country API error:', error);
    }
}
renderUsers();
loadCountries();
