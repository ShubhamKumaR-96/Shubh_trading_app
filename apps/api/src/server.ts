import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'

dotenv.config({ path: '../../.env' })

const app=express()

const PORT=process.env.PORT || 5000

app.use(helmet())

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true  
}))

app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Max 100 requests per 15 min
  message: 'Too many requests, please try again later'
})
app.use('/api', limiter)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TradeMirror API is running',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/auth',authRoutes)

// ─────────────────────────────────────────
// SERVER START
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Shubh_Trading API running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

export default app
