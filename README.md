
URl for the weather app : https://weatherapp-lokesh.netlify.app/

Register with any mail : test@gmail.com
create password : test123

Login with mail & password which u have created.


# 🌦️ Personal Weather Dashboard

A full-stack web application where users can register, log in, update their location, and view real-time weather data based on their saved location.

---

## 🚀 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Flask (Python)
- **Auth:** JWT (1-hour expiry)
- **Database:** SQLite
- **Weather API:** OpenWeatherMap

---

## 🛠️ Setup Instructions

### 🔧 Backend (Flask API)

1. **Clone the repo** and navigate to the backend folder:

```bash
git clone https://github.com/your-username/weather-backend.git
cd backend
```

2. **Create virtual environment** and activate it:

```bash
python -m venv venv
# For Windows:
venv\Scripts\activate
# For macOS/Linux:
source venv/bin/activate
```

3. **Install required packages:**

```bash
pip install -r requirements.txt
```

4. **Run the server:**

```bash
python run.py
```

Server will start at: `http://localhost:5000`

---

### 🌐 Frontend (React App)

1. Navigate to frontend folder:

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file with backend URL:**

```env
VITE_API_BASE=http://localhost:5000
```

4. **Start the React app:**

```bash
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## ✅ Requirements File (`requirements.txt`)

```
flask
flask-cors
flask-bcrypt
flask-jwt-extended
flask-sqlalchemy
python-dotenv
```

---

## 🧪 How to Test the App

### 📝 1. Register

- Open `http://localhost:5173/register`
- Enter a new email and password
- Click **Register**

### 🔐 2. Login

- Open `http://localhost:5173/login`
- Enter your registered credentials
- Click **Login**
- You'll be redirected to the dashboard

### 📍 3. Set Location

- Enter a city (e.g., `Hyderabad`) and country code (e.g., `IN`)
- Click **Update**
- OR click **Auto-Detect My Location** (browser permission required)

### 🌤️ 4. View Weather

- Weather data will be displayed:
  - Temperature
  - Humidity
  - Condition (e.g., Rain)
  - Wind speed

---

## 👤 Sample Test Credentials

You can use these for demo/testing:

```
Email: testuser@example.com
Password: test1234
```

Or simply register your own account.

---

## 📦 Project Structure

```
personal_weather_dashboard/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes/
│   │       ├── auth_routes.py
│   │       ├── profile_routes.py
│   │       └── weather_routes.py
│   ├── run.py
│   ├── config.py
│   ├── requirements.txt
│   └── render.yaml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   └── index.html
```

---

## 📡 Deployment

- **Backend:** Render (Free plan)
- **Frontend:** Netlify (Free plan)

Ensure CORS is enabled in Flask and API URLs match in `.env` files.

---

## 🙌 Credits

Developed by: **Lokesh Krishna**

Powered by Flask, React, and OpenWeatherMap 🌍
