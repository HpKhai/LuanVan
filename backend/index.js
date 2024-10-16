
const connectDb = require('./utils/connectDb') // Đường dẫn tới file connectDb.js
const express = require('express')
const app = express();
const routes = require('./src/routes')
const bodyParser = require ('body-parser')
const cookieParser = require ('cookie-parser')


const cors = require('cors');   

app.use(express.json());

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(bodyParser.json())
app.use(cookieParser())

const startServer = async () => {
    // Kết nối cơ sở dữ liệu
    const db = await connectDb();  // Khởi tạo biến db từ kết nối MongoDB
    
    routes(app);

    app.get('/LuanVan', async (req, res) => {
        const collection = db.connection.collection('cart'); // Truy cập vào collection
        const data = await collection.find({}).toArray(); // Thực hiện query
        res.json(data);
    });

    // Khởi động server
    app.listen(5000, () => {
        console.log('Server đang chạy tại http://localhost5000');
    });
    
};

// Khởi động server
startServer();
