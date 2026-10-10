const app = require('./app');
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(process.env.PORT, () => {
            console.log(`server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error('Unable to start server because the MongoDB connection failed:', error.message);
        process.exitCode = 1;
    }
};

startServer();