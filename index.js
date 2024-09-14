const express = require("express")
const db = require("./DB/index")
const authRoutes = require("./Routes/authRoutes/index")
const userRoutes = require("./Routes/userRoutes/index")
const guardRoutes = require("./Routes/guardRoutes/index")
const adminRoutes = require("./Routes/adminRoutes/index")
const cors = require('cors');



const app = express();

app.use(cors({
  origin: '*', // Allows all origins; adjust this as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json())


const startServer = async () => {
    try {
        await db.checkConnection();
        
        console.log('Starting the server...');
      

    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); 
    }
};

startServer();

app.use("/api/v1", authRoutes)

app.use("/api/v1", userRoutes)

app.use("/api/v1", guardRoutes)

app.use("/api/v1", adminRoutes)

app.listen(3000,()=>console.log("App listening 5300"))

