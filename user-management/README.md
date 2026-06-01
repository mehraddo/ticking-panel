# 🚀 User Management Dashboard

A TypeScript-based user management application that allows users to register, view, and delete accounts. User data is stored in `localStorage`, and the registration form includes multiple validation checks to ensure data integrity.

## ✨ Features

* User registration form
* User list display
* User deletion
* LocalStorage persistence
* English-only name validation
* Email format validation
* Age verification (18+)
* Password strength validation using zxcvbn
* Profile photo validation
* Dynamic country list loaded from the REST Countries API
* Alphabetically sorted country dropdown

---

## 📦 Installation & Setup

### Prerequisites

* Node.js 18+
* npm
* TypeScript

Install TypeScript globally:

```bash
npm install -g typescript
```

### Clone the Repository

```bash
git clone https://github.com/mehraddo/ticking-panel.git
cd ticking-panel
```

### Install Dependencies

```bash
npm install
```

### Compile TypeScript

```bash
npx tsc
```

### Run the Project

Using a simple static server:

```bash
npx http-server .
```

Open your browser and visit:

```text
http://localhost:8080
```

---

## 💡 Usage

### Add a User

1. Click the **Create Account** button.
2. Fill in all required fields.
3. Submit the form.

### Delete a User

Click the **Delete** button next to any user in the list.

### Country Selection

The country list is loaded automatically from the REST Countries API and displayed in alphabetical order.

---

## 📂 Project Structure

```text
ticking-panel/
├── dist/
├── img/
├── src/
├── index.html
├── style.css
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠 Technologies Used

* TypeScript
* JavaScript
* HTML5
* CSS3
* LocalStorage API
* REST Countries API
* zxcvbn

---

## 📞 Contact

GitHub: https://github.com/mehraddo

Email: [mhraddo@gmail.com](mailto:mhraddo@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.
