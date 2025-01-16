# Interview Experiences Platform

This project is a responsive web application for users to submit and view their interview experiences. The platform is built with modern technologies and follows industry best practices to ensure scalability, security, and a seamless user experience.

---

## **Features**

- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **CRUD Operations**: Users can create, read, update, and delete their interview submissions.
- **Responsive Design**: Ensures compatibility across devices with a clean and modern UI.
- **Secure Access Control**: Users can only manage their submissions.
- **RESTful API**: A robust backend for seamless client-server communication.

---

## **Technologies Used**

### **Frontend**
- **React.js**: Component-based library for building a dynamic user interface.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI development.

### **Backend**
- **Node.js**: Server-side runtime for building fast and scalable applications.
- **Express.js**: Framework for creating RESTful APIs.

### **Database**
- **MongoDB**: NoSQL database for flexible data storage.

### **Authentication**
- **JSON Web Tokens (JWT)**: Secure user authentication and session management.

---

## **Installation and Setup**

### **Prerequisites**
Ensure the following tools are installed on your system:
- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- Git

### **Step 1: Clone the Repository**
```bash
$ git clone <repository-url>
$ cd interview-platform
```

### **Step 2: Set Up the Backend**
1. Navigate to the `server` directory:
   ```bash
   $ cd server
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Configure environment variables by creating a `.env` file:
   ```env
   PORT=3001
   MONGO_URI=<your-mongodb-connection-string>
   SECRET_KEY=<your-secret-key>
   ```
4. Start the server:
   ```bash
   $ npm start
   ```
   The backend will run on `http://localhost:3001`.

### **Step 3: Set Up the Frontend**
1. Navigate to the `client` directory:
   ```bash
   $ cd client
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the development server:
   ```bash
   $ npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## **Usage**

### **1. User Authentication**
- Register or log in to access the platform.
- Authentication is secured using JWT, ensuring data privacy and session management.

### **2. Submit an Interview Experience**
- Navigate to the submission form to add your experience.
- Fields include position, company, country, experience required, previous salary, and questions asked.

### **3. View and Manage Submissions**
- View all your submitted experiences on the dashboard.
- Edit or delete submissions directly from the dashboard.

---

## **UI Highlights**
- Clean and professional design using **Tailwind CSS**.
- Fully responsive layout for optimal viewing on desktops, tablets, and mobile devices.
- Hover effects and dynamic feedback for an interactive user experience.

---

## **API Endpoints**

### **Authentication**
- `POST /api/user/register`: Register a new user.
- `POST /api/user/login`: Log in and receive a JWT.
- `GET /api/user/signout`: Log out and blacklist the token.

### **Submissions**
- `GET /api/submissions`: Fetch all submissions for the logged-in user.
- `POST /api/submissions`: Create a new submission.
- `PUT /api/submissions/:id`: Update an existing submission.
- `DELETE /api/submissions/:id`: Delete a submission.

---

## **Contributing**
1. Fork the repository.
2. Create a new branch for your feature/fix:
   ```bash
   $ git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   $ git commit -m "Add a new feature"
   ```
4. Push to your branch:
   ```bash
   $ git push origin feature-name
   ```
5. Open a pull request on the main repository.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- **React.js** for a seamless frontend experience.
- **Tailwind CSS** for elegant UI design.
- **Node.js** and **Express.js** for backend development.
- **MongoDB** for efficient data management.
- **JSON Web Tokens (JWT)** for secure authentication.

