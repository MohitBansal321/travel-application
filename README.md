# Travel Application

A production-grade full-stack travel map application using React, Mapbox GL, Express, MongoDB, and Mongoose.

## Features
- Interactive 3D map via Mapbox GL
- Create, view, and rate travel pins
- User authentication (register / login) with bcrypt
- Real-time reviews without login; pinned reviews require account

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React, Mapbox GL, Material UI |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Auth | bcrypt, JWT-ready |
| Build | Create React App (ejected for production control) |

## Project Structure
```
travel-application/
├── client/          # React frontend (ejected CRA for full build control)
│   ├── src/         # Components, App, styles
│   ├── config/      # Webpack, Babel, Jest configs
│   └── scripts/     # Build / start / test scripts
├── server/          # Express backend
│   ├── routes/      # API endpoints (pins, users)
│   ├── models/      # Mongoose schemas
│   ├── .env.example # Required environment variables
│   └── index.js     # Server entry point
├── .env.example     # Root env template
└── README.md        # This file
```

## Environment Variables
Copy the example files and fill in your secrets:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Required variables:
- `PORT` — server port (default: 7800)
- `MONGO_CONNECTION_STRING` — MongoDB Atlas connection URI
- `NODE_ENV` — `development` or `production`
- `REACT_APP_BASE_URL` — backend URL (e.g., `http://localhost:7800`)
- `REACT_APP_TOKEN` — Mapbox public access token

## Installation (Local Development)
```bash
# 1. Clone repository
git clone https://github.com/MohitBansal321/travel-application.git
cd travel-application

# 2. Install dependencies
npm install --prefix server
npm install --prefix client

# 3. Configure environment (see above)
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Run both services (development)
npm run start --prefix server   # Terminal 1
npm run start --prefix client # Terminal 2
```

## Production Build
```bash
# 1. Build client
npm run build --prefix client

# 2. Start server in production mode
NODE_ENV=production npm start --prefix server
```

## Code Quality & Security
- Dependency vulnerabilities monitored and patched (see `package-lock.json` updates)
- Backend routes use `try/catch` with safe returns (no fall-through after `res.status`)
- Client uses clean JSX indentation and semantic component keys
- Readable formatting applied to all server routes and frontend components

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |
| POST | `/api/pins` | Create pin |
| GET | `/api/pins` | Get all pins |

## Feedback
For questions or issues, contact: bmohit162001@gmail.com

## License
ISC
