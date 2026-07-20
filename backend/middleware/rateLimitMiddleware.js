import rateLimit from 'express-rate-limit';

// Generous ceiling for normal browsing — catches runaway scripts, not shoppers.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again shortly.' },
});

// Tight limit on credential endpoints to blunt brute-force attempts.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    message: 'Too many sign-in attempts. Please try again in 15 minutes.',
  },
});
