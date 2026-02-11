import express from 'express'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3003

app.set('trust proxy', true)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

const rateLimitPerMinute = parseInt(process.env.CONTACT_RATE_LIMIT_PER_MINUTE || '5', 10)
const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: rateLimitPerMinute,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateInput(value, maxLength = 10000) {
  if (typeof value !== 'string') return false
  if (value.trim().length === 0) return false
  if (value.length > maxLength) return false
  return true
}

function sanitizeInput(value) {
  if (typeof value !== 'string') return ''
  return value.trim().substring(0, 10000)
}

const validTopics = ['General Inquiry', 'Hiring / Job Opportunity', 'Other']

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: true }
  if (!token || typeof token !== 'string') {
    console.warn('reCAPTCHA: no token in request')
    return { ok: false }
  }
  try {
    const qs = new URLSearchParams({ secret, response: token })
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.toString(),
    })
    const data = await resp.json()
    const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.3', 10)
    const ok = data.success && (data.score == null || data.score >= minScore)
    if (!ok) {
      console.warn('reCAPTCHA verify failed:', {
        success: data.success,
        score: data.score,
        'error-codes': data['error-codes'],
        action: data.action,
        hostname: data.hostname,
      })
    }
    return { ok }
  } catch (e) {
    console.error('reCAPTCHA verify error:', e)
    return { ok: false }
  }
}

async function handleContact(req, res) {
  try {
    if (req.body.website) {
      return res.status(200).json({ success: true })
    }

    if (process.env.RECAPTCHA_SECRET_KEY) {
      const recaptcha = await verifyRecaptcha(req.body.recaptchaToken)
      if (!recaptcha.ok) {
        return res.status(400).json({ success: false, error: 'Captcha verification failed. Please try again.' })
      }
    }

    const name = req.body.name
    const email = req.body.email
    const organization = req.body.organization || ''
    const topic = req.body.topic
    const message = req.body.message

    const errors = []
    if (!validateInput(name, 200)) errors.push('Name is required and must be less than 200 characters.')
    if (!email || !validateEmail(email)) errors.push('Valid email is required.')
    if (!validateInput(topic, 100) || !validTopics.includes(topic)) errors.push('Please select a valid topic.')
    if (!validateInput(message, 5000)) errors.push('Message is required and must be less than 5000 characters.')
    if (organization && !validateInput(organization, 200)) errors.push('Organization must be less than 200 characters.')

    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = email.toLowerCase().trim()
    const sanitizedOrganization = organization ? sanitizeInput(organization) : ''
    const sanitizedTopic = topic
    const sanitizedMessage = sanitizeInput(message)
    const clientIp = req.ip || req.connection?.remoteAddress || 'unknown'

    const mailOptions = {
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `Contact (elinorbahiti.ca): ${sanitizedTopic} - ${sanitizedName}`,
      text: `
Contact form submission (elinorbahiti.ca):

Topic: ${sanitizedTopic}
Name: ${sanitizedName}
Email: ${sanitizedEmail}
${sanitizedOrganization ? `Organization: ${sanitizedOrganization}` : ''}

Message:
${sanitizedMessage}

---
Submitted from IP: ${clientIp}
      `.trim(),
      html: `
        <h2>Contact Form (elinorbahiti.ca)</h2>
        <p><strong>Topic:</strong> ${sanitizedTopic}</p>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
        ${sanitizedOrganization ? `<p><strong>Organization:</strong> ${sanitizedOrganization}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted from IP: ${clientIp}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message. I will get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({
      success: false,
      error: 'An error occurred while sending your message. Please try again later.',
    })
  }
}

app.post('/api/contact', contactLimiter, handleContact)
app.post('/contact', contactLimiter, handleContact)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Resume contact API running on port ${PORT}`)
})
