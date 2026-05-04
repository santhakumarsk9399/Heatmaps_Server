const app = require("./app");
const port = 8000;
const fs = require("fs");
const https = require("https");

app.listen(port, () => console.log(`Server started on port ${port}`));