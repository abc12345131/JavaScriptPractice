module.exports = {
    MONGO_IP: process.env.MONGO_IP,
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    CLIENT_ADDRESS: process.env.CLIENT_ADDRESS || "http://localhost:3000"
}