# Flick The Show - Project Summary

## Project Overview

**Flick The Show** is a full-stack movie ticket booking web application developed by Shreyas and Apurva. The platform enables users to browse movies, view detailed movie information, and book tickets for currently running movies at various theatres. The application features separate dashboards for regular users and administrators, with role-based access control.

---

## Platform Overview: Movie Ticket Booking Perspective

**Flick The Show** is a comprehensive digital movie ticket booking platform that revolutionizes the way moviegoers discover, explore, and book cinema tickets. The platform serves as a one-stop destination for movie enthusiasts, offering a seamless booking experience from movie discovery to ticket confirmation.

### For Moviegoers

**Discover & Explore**
- Browse featured movies through an engaging carousel showcasing the latest releases and popular films
- Explore currently running movies with rich visual content including posters and trailers
- Access comprehensive movie information including synopsis, ratings, cast details, and production information
- Watch official movie trailers directly on the platform before making a booking decision
- View available theatres and their locations to choose the most convenient venue

**Easy Booking Experience**
- **Simple 3-Step Process**: The booking journey is streamlined into three intuitive steps:
  1. Select your preferred theatre from a list of partnered cinemas (INOX, PVR, M2K, Cinepolis, Miraj)
  2. Choose your seats from an interactive seat map with real-time availability
  3. Review and confirm your booking with all details clearly displayed
- **Visual Seat Selection**: Interactive seat map showing available and booked seats, allowing users to select multiple seats at once
- **Instant Confirmation**: Receive immediate booking confirmation with a unique transaction ID
- **Booking Management**: Access your personal dashboard to view active tickets for today and review your complete booking history

**User Benefits**
- **Convenience**: Book tickets from anywhere, anytime without visiting the theatre
- **Transparency**: See real-time seat availability before booking
- **Choice**: Select from multiple theatres and preferred seating
- **History**: Keep track of all your movie bookings in one place
- **Information**: Access detailed movie information to make informed decisions

### For Theatre Partners

**Multi-Theatre Support**
- The platform supports multiple theatre chains and independent cinemas
- Each theatre maintains its brand identity with custom logos and branding
- Real-time seat inventory management per theatre
- Theatre-specific movie assignments and show scheduling

**Operational Efficiency**
- Automated seat reservation system prevents double bookings
- Real-time synchronization of seat availability across all users
- Theatre maintenance tools for managing show schedules and seat availability

### For Administrators

**Content Management**
- **Dynamic Carousel Control**: Update featured movies and promotional content without technical intervention
- **Movie Catalog Management**: Add or remove currently running movies, manage movie trailers and metadata
- **Theatre Administration**: Reset theatres, manage show assignments, and maintain seat inventory
- **Real-time Updates**: Changes reflect immediately across the platform for all users

**Platform Control**
- Complete control over what movies are available for booking
- Ability to feature specific movies in the carousel for promotional purposes
- Theatre and show management capabilities
- User role management (admin and regular user roles)

### Platform Value Proposition

**For Users:**
- **Time-Saving**: No need to visit theatres or call for bookings
- **Better Planning**: View all available options (movies, theatres, seats) before making a decision
- **Transparency**: Clear visibility of seat availability and booking details
- **Accessibility**: Works on all devices - desktop, tablet, and mobile
- **Reliability**: Secure booking system with transaction tracking

**For Theatres:**
- **Increased Reach**: Online presence expands customer base beyond walk-in customers
- **Reduced Overhead**: Automated booking system reduces manual ticket sales workload
- **Real-time Inventory**: Accurate seat availability tracking prevents booking conflicts
- **Brand Visibility**: Theatre branding and information prominently displayed

**For the Platform:**
- **Scalability**: Architecture supports multiple theatres and high user traffic
- **Maintainability**: Admin dashboard allows content updates without code changes
- **User Engagement**: Rich movie information and trailers keep users engaged
- **Data-Driven**: Booking history and user data enable future analytics and improvements

### Booking Flow

1. **Discovery**: Users land on the homepage and browse featured movies in the carousel or browse the currently running movies list
2. **Exploration**: Click on a movie to view detailed information, watch trailers, and check if it's available for booking
3. **Selection**: If the movie is currently running, users can proceed to book tickets
4. **Theatre Choice**: Select from available theatres showing the movie
5. **Seat Selection**: Choose preferred seats from the interactive seat map (seats already booked by others are clearly marked as unavailable)
6. **Confirmation**: Review booking details (movie, theatre, seats, show time) and confirm
7. **Ticket Management**: Access booked tickets in the user dashboard, view active tickets for today, and browse booking history

### Key Differentiators

- **Rich Movie Information**: Integration with The Movie Database (TMDB) provides comprehensive movie details, ratings, and metadata
- **Real-time Seat Availability**: Live seat tracking ensures accurate availability and prevents double bookings
- **Multi-Theatre Support**: One platform for multiple theatre chains
- **User-Centric Design**: Material Design principles ensure an intuitive and accessible user experience
- **Mobile-First**: Fully responsive design optimized for mobile devices
- **Admin Control**: Content management system allows non-technical staff to update movies and features

---

## Architecture

### Frontend
- **Framework**: React 19.1.1 with React Router DOM 7.8.2
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **UI Animations**: Motion 12.23.12
- **Icons**: React Icons 5.5.0
- **Deployment**: Vercel (configured with vercel.json)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.19.2
- **CORS**: Configured for multiple origins including production and development environments

---

## Main Features

### 1. **User Authentication & Authorization**
- Firebase Authentication integration for user sign-up and login
- Role-based access control (Admin and User roles)
- Protected routes using custom guards (`RequireAuth`, `RequireAdmin`)
- User session management with Firebase Auth state persistence
- User data stored in Firestore with role information

### 2. **Landing Page**
- **Main Carousel**: Dynamic carousel displaying featured movie posters
  - Auto-rotating slides with 3-second intervals
  - Manual navigation controls (previous/next buttons)
  - Clickable posters that navigate to movie detail pages
  - Responsive design with loading states
- **Movie List**: Grid/carousel view of currently running movies
  - Mobile-responsive with separate mobile carousel component
  - Movie cards with poster images
- **Theatre List**: Display of available theatres with logos
  - Theatre branding (INOX, PVR, M2K, Cinepolis, Miraj)
  - Visual theatre cards

### 3. **Movie Details Page**
- **Comprehensive Movie Information**:
  - Hero section with backdrop image and movie title
  - Detailed overview and synopsis
  - Movie statistics (runtime, release date, ratings, popularity)
  - Genre tags
  - Production company information
  - Financial information (budget, revenue)
  - External links (official website, IMDb)
- **Trailer Integration**:
  - YouTube trailer embedding
  - Custom trailer URLs stored in database
  - YouTube URL conversion utilities
- **Booking Availability Check**:
  - Real-time verification if movie is currently running
  - Conditional "Book Tickets" button display
- **Data Source**: The Movie Database (TMDB) API integration

### 4. **Ticket Booking System**
- **Multi-Step Booking Process**:
  1. **Theatre Selection**: Choose from available theatres with logos
  2. **Seat Selection**: Interactive seat map (8 rows × 12 columns)
     - Visual seat grid (A1-H12 format)
     - Real-time seat availability
     - Disabled seats (already booked)
     - Multiple seat selection
     - Screen indicator
  3. **Booking Summary**: Review movie, theatre, and selected seats
- **Booking Features**:
  - Transaction ID generation
  - Automatic show time calculation (2 hours from booking time)
  - Seat reservation in backend database
  - Ticket storage in Firestore per user
  - Booking date tracking

### 5. **User Dashboard**
- **Active Tickets**: Display of today's bookings
  - Movie title (fetched from TMDB API)
  - Theatre name
  - Show time
  - Transaction ID
  - Selected seats
  - Booking date
- **Previous Bookings**: History of past ticket bookings
  - Last 4 previous bookings displayed
  - Sorted by date (newest first)
  - Same ticket details as active tickets
- **Personalized Welcome**: Greeting with user's name

### 6. **Admin Dashboard**
- **Carousel Management**:
  - Add new carousel posters
  - Delete existing carousel posters
  - Link posters to movies
- **Currently Running Movies Management**:
  - Add movies to currently running list
  - Delete movies from list
  - Movie trailer URL management
- **Theatre Management**:
  - Reset all theatres (assigns random movies and clears seats)
  - Theatre maintenance tools

### 7. **Responsive Design**
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Separate mobile components (e.g., `MovieList_Mobile`)
- Touch-friendly interface elements

### 8. **Material Design System**
- Custom CSS variables for Material Design color system
- Consistent theming across the application
- Surface containers, primary/secondary colors
- Accessible color contrast

---

## Tools & Technologies Used

### Frontend Technologies
1. **React 19.1.1** - UI library
2. **React Router DOM 7.8.2** - Client-side routing
3. **Vite 7.1.2** - Build tool and dev server
4. **Tailwind CSS 4.1.12** - Utility-first CSS framework
5. **Motion 12.23.12** - Animation library
6. **React Icons 5.5.0** - Icon library
7. **Firebase 12.2.1** - Authentication and Firestore database
8. **ESLint 9.33.0** - Code linting

### Backend Technologies
1. **Node.js** - JavaScript runtime
2. **Express.js 5.1.0** - Web application framework
3. **Mongoose 8.19.2** - MongoDB object modeling
4. **CORS 2.8.5** - Cross-origin resource sharing
5. **dotenv 17.2.3** - Environment variable management
6. **Nodemon 3.1.10** - Development auto-reload tool

### External APIs & Services
1. **The Movie Database (TMDB) API** - Movie data, posters, and metadata
2. **Firebase Authentication** - User authentication
3. **Firebase Firestore** - User data and ticket storage
4. **YouTube** - Trailer embedding

### Database
1. **MongoDB** - Primary database for:
   - Movies (movieName, movieId, movieTrailer)
   - Theatres (theatreName, movieId, filledSeats)
   - Carousel Posters (movieName, movieId, posterLink)
2. **Firebase Firestore** - User-specific data:
   - User profiles (name, email, role)
   - User tickets (transactionId, movieId, theatreName, seats, showTime, etc.)

### Development Tools
1. **Git** - Version control
2. **ESLint** - Code quality
3. **Vercel** - Frontend deployment
4. **Environment Variables** - Configuration management

### Design & UI
1. **Material Design System** - Design language
2. **Custom CSS Variables** - Theming
3. **Responsive Images** - TMDB image CDN
4. **Custom Assets** - Logos, posters, QR codes

---

## Project Structure

```
flick-the-show/
├── flick_the_show_backend/     # Backend server
│   ├── app.cjs                 # Express server
│   ├── models/                 # Mongoose models
│   │   ├── carouselPostersModel.cjs
│   │   ├── movieModel.cjs
│   │   └── theatreModel.cjs
│   └── package.json
├── src/
│   ├── Components/            # Reusable components
│   │   ├── ActiveTickets.jsx
│   │   ├── AddMovieModal.jsx
│   │   ├── AddPosterModal.jsx
│   │   ├── EditCaraouselPosters.jsx
│   │   ├── EditCurrentlyRunning.jsx
│   │   ├── MainCarousel.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   ├── MovieList_Mobile.jsx
│   │   ├── MovieTicket.jsx
│   │   ├── Navbar.jsx
│   │   ├── PreviousBookings.jsx
│   │   ├── TheatreCard.jsx
│   │   ├── TheatreList.jsx
│   │   ├── TicketModal.jsx
│   │   └── guards.jsx          # Route protection
│   ├── Pages/                  # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── BookTicket.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── MoviePage.jsx
│   │   ├── SignUp.jsx
│   │   └── UserDashboard.jsx
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── firebase/
│   │   └── config.js           # Firebase configuration
│   ├── services/
│   │   └── api.js              # Backend API client
│   ├── utils/
│   │   └── youtubeUtils.js     # YouTube URL utilities
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── public/                      # Static assets
│   ├── cards/                  # Movie card images
│   ├── posters/                # Movie posters
│   ├── qrcodes/                # QR code images
│   └── Theatre Logo/           # Theatre logos
├── package.json
├── vite.config.js
└── vercel.json                 # Vercel deployment config
```

---

## Key API Endpoints

### Backend Routes
- `GET /health` - Health check
- `GET /readCarouselPosters` - Fetch carousel posters
- `POST /addCarouselPoster` - Add carousel poster
- `GET /deleteCarouselPoster/:id` - Delete carousel poster
- `GET /readMovies` - Fetch currently running movies
- `POST /addMovie` - Add movie to running list
- `GET /deleteMovie/:id` - Delete movie
- `GET /getMovieTrailer/:id` - Get movie trailer URL
- `GET /readTheatres` - Fetch theatres
- `POST /addTheatre` - Add theatre
- `POST /resetTheatres` - Reset all theatres
- `POST /addFilledSeats` - Update booked seats

---

## Security Features

1. **CORS Configuration**: Whitelisted origins for API access
2. **Route Guards**: Protected routes requiring authentication/admin roles
3. **Environment Variables**: Sensitive data stored in environment variables
4. **Firebase Security**: Firebase Authentication and Firestore security rules

---

## Deployment

- **Frontend**: Deployed on Vercel (https://flick-the-show.vercel.app)
- **Backend**: Separate Node.js server (configured for multiple deployment environments)
- **Database**: MongoDB Atlas (cloud database)
- **Authentication**: Firebase (Google Cloud Platform)

---

## Notable Features

1. **Real-time Seat Availability**: Seats are tracked in real-time to prevent double booking
2. **TMDB Integration**: Rich movie data from The Movie Database API
3. **Dynamic Content Management**: Admin can manage carousel and running movies without code changes
4. **Transaction Tracking**: Unique transaction IDs for each booking
5. **User History**: Complete booking history stored per user
6. **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
7. **Material Design**: Modern, accessible UI following Material Design principles

---

## Future Enhancement Possibilities

- Payment gateway integration
- Email notifications for bookings
- QR code generation for tickets
- Seat selection with pricing tiers
- Multiple show timings per day
- User reviews and ratings
- Movie recommendations
- Search and filter functionality
- Booking cancellation feature
- Admin analytics dashboard

