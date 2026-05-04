// controllers/zoneController.js
const Heatmap = require("./heatmap.model");


exports.createZone = async (req, res) => {
    try {
        const fullImage = req.files?.fullImage?.[0]?.filename;
        const cropImage = req.files?.cropImage?.[0]?.filename;

        const zone = await Heatmap.create({
            mall: req.body.mall,
            floor: req.body.floor,
            zoneName: req.body.zoneName,

            fullImage: fullImage ? `/uploads/${fullImage}` : null,
            cropUrl: cropImage ? `/uploads/${cropImage}` : null,

            imageW: req.body.imageW,
            imageH: req.body.imageH,

            zoneData: req.body.zoneData
                ? JSON.parse(req.body.zoneData)
            : null,
        });

        res.json(zone);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

// GET ALL
exports.getZoneImages = async (req, res) => {
    const ZoneImages = await Heatmap.find().sort({ createdAt: -1 });
    res.json(ZoneImages);
};

// UPDATE

exports.updateZoneImages = async (req, res) => {
    try {
        const fullImage = req.files?.fullImage?.[0]?.filename;
        const cropImage = req.files?.cropImage?.[0]?.filename;

        console.log("RAW zoneData:", req.body.zoneData);
        let parsedZoneData;

        try {
            parsedZoneData =
                typeof req.body.zoneData === "string"
                    ? JSON.parse(req.body.zoneData)
                    : req.body.zoneData;

            console.log("✅ Parsed zoneData:", parsedZoneData.points[1]);

        } catch (err) {
            console.error("❌ JSON Parse Failed:", req.body.zoneData);

            return res.status(400).json({
                error: "Invalid zoneData format"
            });
        }
        if (!parsedZoneData || !parsedZoneData.points) {
            return res.status(400).json({
                error: "zoneData missing or invalid"
            });
        }


        const updateData = {
            mall: req.body.mall,
            floor: req.body.floor,
            zoneName: req.body.zoneName,
            imageW: req.body.imageW,
            imageH: req.body.imageH,

            // ✅ FORCE UPDATE
            zoneData: parsedZoneData,
        };

        if (fullImage) {
            updateData.fullImage = `/uploads/${fullImage}`;
        }

        if (cropImage) {
            updateData.cropUrl = `/uploads/${cropImage}`;
        }

        const updated = await Heatmap.findByIdAndUpdate(
            req.params.id,
            {
                $set: updateData
            },
            { new: true }
          );

        res.json(updated);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteZoneImages = async (req, res) => {
    await Heatmap.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};