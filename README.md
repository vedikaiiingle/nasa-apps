# Will It Rain On My Parade? 🌦️

**NASA Space Apps Challenge 2025** - Weather Probability App using NASA Earth Observation Data

Plan your outdoor events with confidence using real satellite data from NASA's Earth observation missions. Get weather probabilities for any location and date worldwide.

## 🚀 Features

- **Global Location Search** - Find any location worldwide
- **Historical Weather Analysis** - Based on NASA satellite data
- **Multiple Weather Conditions** - Temperature, precipitation, wind, air quality, comfort
- **Probability Visualization** - Interactive charts and risk indicators
- **Data Export** - Download results in CSV/JSON format
- **Mobile Responsive** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Query** - Data fetching and caching
- **Recharts** - Data visualization
- **Mapbox GL JS** - Interactive maps

### Backend
- **Node.js + Express** - API server
- **Redis** - Caching layer
- **PostgreSQL + Prisma** - Database
- **NASA APIs** - Earth observation data
- **Joi** - Data validation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Redis (optional, for caching)
- PostgreSQL (optional, for data persistence)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-parade-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment setup**
   ```bash
   # Copy environment files
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your credentials
   # Add NASA Earthdata username/password
   # Add Mapbox access token
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## 🔧 Environment Variables

### Backend (.env)
```env
# NASA Earthdata credentials
NASA_USERNAME=your_nasa_username
NASA_PASSWORD=your_nasa_password

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/weatherparade"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# API Keys
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🗂️ Project Structure

```
weather-parade-app/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities and hooks
│   └── styles/              # Global styles
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── index.js         # Server entry point
│   └── temp/                # Temporary files
└── README.md
```

## 📊 API Endpoints

### Weather
- `POST /api/weather/probabilities` - Get weather probabilities
- `GET /api/weather/historical/:lat/:lng` - Get historical data
- `POST /api/weather/batch` - Batch processing

### Location
- `GET /api/location/search` - Search locations
- `GET /api/location/reverse/:lat/:lng` - Reverse geocoding
- `GET /api/location/popular` - Popular locations

### Export
- `POST /api/export/weather` - Export weather data
- `POST /api/export/historical` - Export historical data
- `POST /api/export/report` - Generate PDF report

## 🌍 NASA Data Sources

- **MODIS** - Temperature and land surface data
- **TRMM** - Precipitation measurements
- **MERRA-2** - Atmospheric reanalysis
- **GIBS** - Global Imagery Browse Services
- **Earthdata Search** - Data discovery and access

## 🎯 Usage

1. **Select Location** - Search for any location worldwide
2. **Choose Date** - Pick the date for your event
3. **Select Conditions** - Choose weather conditions to analyze
4. **View Results** - Get probability percentages and recommendations
5. **Export Data** - Download results for further analysis

## 🔬 How It Works

1. **Data Collection** - Fetches historical weather data from NASA APIs
2. **Statistical Analysis** - Calculates probabilities based on historical patterns
3. **Risk Assessment** - Determines likelihood of adverse weather conditions
4. **Visualization** - Presents data in easy-to-understand formats
5. **Recommendations** - Provides actionable insights for event planning

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Heroku)
```bash
cd backend
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- NASA for providing Earth observation data
- NASA Space Apps Challenge organizers
- Open source community for amazing tools

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for NASA Space Apps Challenge 2025**
