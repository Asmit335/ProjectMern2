import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/about", (req, res) => {
    res.send("About page.");
});
app.get("/contact", (req, res) => {
    res.send("Contact page.");
});
app.listen(PORT, () => {
    console.log(`Server is running in Port ${PORT}`);
});
//# sourceMappingURL=app.js.map