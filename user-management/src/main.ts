// TypeScript check
console.log('ts check');
// Declare zxcvbn
declare const zxcvbn: any;
// Initialize user array
let users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
// Get DOM elements
const userList = document.getElementById('userList')!;
const openBtn = document.getElementById('openModal')!;
const closeBtn = document.getElementById('closeModal')!;
const modal = document.getElementById('modal')!;
const overlay = document.getElementById('overlay')!;
const form = document.getElementById('userForm') as HTMLFormElement;
const errorMessage = document.getElementById('errorMassage')!;
const emailInput = document.getElementById('emailInput') as HTMLInputElement;
const firstnameInput = document.getElementById(
    'firstnameInput',
)! as HTMLInputElement;
const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const birthday = document.getElementById('dateofbrith') as HTMLInputElement;
const countryInput = document.getElementById('country') as HTMLSelectElement;
const photoInput = document.getElementById('profilePhoto') as HTMLInputElement;
// Function to check if a string is English
function isEnglishName(value: string): boolean {
    return /^[A-Za-z]+$/.test(value);
}
// Function to check if a person is 18 years old or older
function isAdult(dateString: string): boolean {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && birthDate < today;
}
// Function to save users to localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}
// Function to open modal
function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
// Function to close modal
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
// Add event listeners
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
// Function to render users
function renderUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      ${user.firstnameInput} ${user.lastName} - ${user.email}
      <button class="delete-btn" data-index="${index}">حذف</button>
    `;
        userList.appendChild(li);
    });
    saveUsers();
}
// Function to validate email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
// Form submission handler
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Validate form inputs
    if (!firstnameInput.value || !emailInput.value) {
        errorMessage.classList.remove('hidden');
        alert('تمام فیلدا رو باید پر کنید');
        return;
    }
    if (!isEnglishName(firstnameInput.value)) {
        alert('نام رو انگلیسی وارد کن مشتی ');
        return;
    }
    if (!isEnglishName(lastNameInput.value)) {
        alert('نام خانوادگی انگلیسی باید پر کنی ');
        return;
    }
    if (!isAdult(birthday.value)) {
        alert('زیر 18 ثبت نام نداریم:(');
        return;
    }
    if (passwordInput.value.length < 8) {
        alert('پسورد باید بالا تر از 8 کارکتر باشه');
        return;
    }
    if (!isValidEmail(emailInput.value)) {
        alert('ایمیلیت معتبر نیست');
        return;
    }
    // Password strength check
    const result = zxcvbn(passwordInput.value);
    if (result.score < 2) {
        alert('پسوردت ضعیفههه:(');
        return;
    }
    // Process profile photo
    let profilePhoto: any = 'no-photo';
    if (photoInput.files && photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('فرمت عکس معتبر نیست.');
            return;
        }
        if (file.size > 80 * 1024) {
            alert('سایز عکست زیاده resize کن:(');
            return;
        }
        profilePhoto = file;
    }
    // Create user object
    const user = {
        firstnameInput: firstnameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        birthday: birthday.value,
        country: countryInput.value,
        profilePhoto: profilePhoto,
    };
    // Add user to array and render
    users.push(user);
    renderUsers();
    // Reset form and close modal
    form.reset();
    closeModal();
});
// User list click handler
userList.addEventListener('click', (e: any) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = Number(e.target.getAttribute('data-index'));
        users.splice(index, 1);
        renderUsers();
    }
});
// Function to load countries
async function loadCountries(): Promise<void> {
    try {
        const response: Response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name',
        );

        const countries = await response.json();

        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        countryInput.innerHTML = '';

        countries.forEach((country) => {
            const option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;

            countryInput.appendChild(option);
        });
    } catch (error) {
        console.error('Country API error:', error);

        const fallbackCountries = [
            'Afghanistan',
            'Australia',
            'Brazil',
            'Canada',
            'France',
            'Germany',
            'India',
            'Iran',
            'Japan',
            'Turkey',
            'United Kingdom',
            'United States',
        ];

        fallbackCountries.sort();

        fallbackCountries.forEach((country) => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;

            countryInput.appendChild(option);
        });
    }
}
// Initialize app
renderUsers();
loadCountries();
