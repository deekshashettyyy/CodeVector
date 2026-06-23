import connectDB from "./config/db.js";
import app from "./app.js";

connectDB()
.then(() => {
    // db successfully connected

    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is listening at PORT = ${process.env.PORT}`);
    });
})