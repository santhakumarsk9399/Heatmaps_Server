// routes/zoneRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../../Middleware/upload");

const {
    createZone,
    getZoneImages,
    updateZoneImages,
    deleteZoneImages
} = require("./heatmap.controller");

// router.post("/CreateZoneImages", createZone);
router.post("/CreateZoneImages", upload.fields([
    { name: "fullImage", maxCount: 1 },
    { name: "cropImage", maxCount: 1 }
]), createZone);
router.get("/ZoneImages", getZoneImages);
// router.put("/UpdateZoneImages/:id", updateZoneImages);
router.put(
    "/UpdateZoneImages/:id",
    upload.fields([
        { name: "fullImage", maxCount: 1 },
        { name: "cropImage", maxCount: 1 }
    ]),
    updateZoneImages
  );
router.delete("/DeleteZoneImages/:id", deleteZoneImages);

module.exports = router;