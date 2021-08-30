module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongodb",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_IP: process.env.REDIS_IP || "redis",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET || 'yoursecret',
    JWT_SECRET: process.env.JWT_SECRET || 'yoursecret',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
}