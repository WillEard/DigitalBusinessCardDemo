# PelagoPass Server - Refactored Architecture

## Project Structure

```
src/
├── app.js                 # Express app setup & middleware
├── index.js              # Entry point & server startup
├── config/               # Configuration files
│   ├── database.js       # MongoDB connection
│   ├── environment.js    # Environment variables & validation
│   ├── cors.js          # CORS & security headers config
│   └── email.js         # Email templates
├── models/               # MongoDB schemas
│   ├── User.js          # User schema & validations
│   └── CV.js            # CV/Resume schema
├── controllers/          # Route handlers
│   ├── authController.js
│   ├── userController.js
│   └── cvController.js
├── services/             # Business logic layer
│   ├── authService.js
│   ├── userService.js
│   └── cvService.js
├── routes/               # API routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── cvRoutes.js
├── middleware/           # Custom middleware
│   ├── auth.js          # JWT authentication
│   ├── errorHandler.js  # Global error handling
│   ├── logger.js        # Request logging
│   └── security.js      # Security headers
├── utils/                # Utility functions
│   ├── jwt.js           # JWT helpers
│   ├── otp.js           # OTP generation & validation
│   ├── email.js         # Email sending
│   ├── password.js      # Password hashing & comparison
│   └── validation.js    # Input validation
└── constants/            # App constants
    └── errorMessages.js  # Error & success messages
```

## Key Improvements

### 1. **Separation of Concerns**

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contains business logic
- **Models**: Define data schemas
- **Middleware**: Handle cross-cutting concerns

### 2. **Better Error Handling**

- Centralized error handler middleware
- Custom error classes
- Consistent error responses
- Validation errors

### 3. **Centralized Configuration**

- All environment variables in one place
- CORS configuration centralized
- Email templates organized
- Better validation of required variables

### 4. **Reusable Utilities**

- JWT token management
- OTP generation & validation
- Password hashing with bcrypt
- Email sending helpers
- Input validation

### 5. **Improved Security**

- Security headers middleware
- Better password hashing defaults (10 rounds)
- Input validation for emails, usernames, phones
- Secure cookie options based on environment

### 6. **Better Logging**

- Request logging middleware
- Timestamps and status codes
- Easier debugging

## Migration from Old Structure

### Old File Mappings

```
OLD                                  NEW
────────────────────────────────────────────────────────
server.js                   →   src/app.js + src/index.js
config/mongodb.js           →   src/config/database.js
config/emailTemplates.js    →   src/config/email.js
config/cors.js              →   src/config/cors.js (new)
models/userModel.js         →   src/models/User.js
models/cvModel.js           →   src/models/CV.js
controllers/authController.js → src/controllers/authController.js
controllers/userController.js → src/controllers/userController.js
middleware/userAuth.js      →   src/middleware/auth.js
routes/authRoutes.js        →   src/routes/authRoutes.js
```

## Running the Server

```bash
# Development (with hot reload)
npm start

# Production
npm run dev
```

## Environment Variables

Required in `.env`:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=4000
NODE_ENV=development
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

### Auth Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout (protected)
- `GET /is-Auth` - Check authentication (protected)
- `POST /send-verify-otp` - Send verification OTP (protected)
- `POST /verify-account` - Verify email with OTP (protected)
- `POST /send-reset-otp` - Send password reset OTP
- `POST /reset-password` - Reset password
- `POST /verify-password` - Verify current password (protected)
- `POST /verify-reset-otp` - Verify reset OTP (protected)

### User Routes (`/api/user`) - All Protected

- `GET /data` - Get user data
- `POST /update` - Update user settings
- `DELETE /delete` - Delete account

### CV Routes (`/api/cv`) - All Protected

- `POST /save` - Save CV data
- `GET /data` - Get CV data

## Database Models

### User

- `name`, `username`, `email`, `password` (required)
- `phoneNumber`, `subscriptionType`, `role`
- `isVerified`, `isActive`, `lastLogin`
- OTP fields for email verification & password reset
- Timestamps (createdAt, updatedAt)

### CV

- `user_id` (references User)
- Education, experience, skills, certifications, projects
- Languages, hobbies, achievements
- Color customization (textColor, backgroundColor)
- Timestamps

## Best Practices Implemented

✓ Modular architecture
✓ DRY principle (Don't Repeat Yourself)
✓ Error handling and validation
✓ Security middleware
✓ Environment-based configuration
✓ Consistent response format
✓ Indexed database queries
✓ Password security (bcrypt with salt rounds)
✓ JWT expiration handling
✓ CORS configuration for development & production
✓ Request logging

## Future Improvements

- Add rate limiting middleware
- Implement refresh tokens
- Add input sanitization
- Add request validation middleware (joi/zod)
- Add database connection pooling
- Add caching layer (Redis)
- Add comprehensive API documentation (Swagger)
- Add unit tests
- Add CI/CD pipeline

## Old Files to Archive/Remove

Once verified everything works, you can safely remove:

- `server.js`
- `config/mongodb.js`
- `config/nodemailer.js` (now in utils/email.js)
- `controllers/` (old directory)
- `middleware/userAuth.js`
- `routes/` (old directory)
- `utils/jwtUtils.js`
- `models/` (old directory)

These are all replaced by the new `src/` structure.
