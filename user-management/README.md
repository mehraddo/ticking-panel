
# 🚀 User Management Dashboard

A simple app for registering, displaying, and deleting users. All data is stored in `localStorage`. The form validates:

- English-only names
- Age ≥ 18
- Strong password (using zxcvbn)
- Valid email
- Country list loaded from the restcountries API

## 📦 Installation & Setup

### Prerequisites

- Node.js ≥ 18
- npm (or yarn)
- TypeScript (global install)

```bash
npm i -g typescript
```

### Steps

1. **Clone the repo:**

   ```bash
   git clone https://github.com/mehraddo/ticking-panel
   cd user-management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Compile TypeScript:**

   ```bash
   npx tsc  # Output in dist/main.js
   ```

4. **Serve the app:** (using any simple static server like `http-server`)

   ```bash
   npx http-server dist  # Opens in http://localhost:8080
   ```

---

## 💡 Usage

- **Add a user:** Click **ایجاد حساب کاربری**, fill the form, and click **ثبت نام**.
- **Delete a user:** Click the **حذف** button next to the user in the list.
- **Countries:** Loaded automatically from the API.

---

## 📂 Project Structure

user-management/
├─ dist/               # Compiled JavaScript files
├─ img/                #log-in-jpg
├─ dist/               # Compiled JavaScript files
├─ index.html
├─ style.css
├─ package.json
├─ tsconfig.json
└─ README.md

This project is licensed under the MIT License – see the `LICENSE` file for details.

---

## 📞 Contact

- **GitHub:** [mehraddo](https://github.com/mehraddo)

- **Email:** [mhraddo@gmail.com]
