# Real Estate Full-Stack Application

Welcome to the Real Estate project — a modern, sleek platform designed to streamline property listings with user-friendly interfaces and secure authentication. Whether you're looking to showcase your properties or explore new homes, this app combines the power of React, Mantine UI, and Node.js with Prisma and Auth0 for a smooth, secure experience.

---

## 🚀 Getting Started

To run this project locally, you'll need to configure a few secrets and run both the backend and frontend servers concurrently.

### Important Configuration

1. **Server-side:**

   - Navigate to the `server/config` folder.
   - Open the `auth0Config.js` file and replace the placeholders with your own Auth0 credentials.
   - Update your `.env` file with the appropriate environment variables (client secrets, database URLs, etc.).  
   *Make sure to never commit your real secret keys!*

2. **Client-side:**

   - In the `client/src/main.jsx` file, insert your own secret keys or environment variables as needed for proper functionality.

---

## 💻 Running the Project

Open **two terminal windows** to start both parts of the application simultaneously:

1. **Backend Server**

   ```bash
   cd server
   yarn run start
   
2. **Frontend Server**

   ```bash
   cd client
   yarn run dev

Your backend API will be up and running on the configured port, while the React app launches on your local development server.


---

## 🔧 Technologies Used 

**Frontend:** React, Mantine UI, React Query, React Icons

**Backend:** Node.js, Express, Prisma ORM, Auth0 (JWT Authentication)

**Database:** Prisma ORM connected to your preferred database

**Deployment:** Vercel (client), Railway or custom (server)

**Other:** Cloudinary for image uploads, React Toastify for notifications

---

## 🙏 Credits
Special thanks to ZAINKEEPSCODE for the inspiration and invaluable guidance throughout this project!

Feel free to explore, contribute, and customize. Happy coding! 🚀

