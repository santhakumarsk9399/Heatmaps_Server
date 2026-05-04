const app = require("./app");
const port = process.env.PORT || 7000;
const fs = require("fs");
const https = require("https");
const PORT = process.env.PORT || 7000;


app.listen(port, () => console.log(`Server started on port ${port}`));