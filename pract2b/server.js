const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/fileUploadDB')
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("Connection Error: ", err));

let bucket;

mongoose.connection.once('open', () => {
    bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
    console.log("GridFS Bucket Ready");
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file selected.");
    }

    const uploadStream = bucket.openUploadStream(req.file.originalname);
    
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
        res.send(`
            <h2>File uploaded successfully!</h2>
        `);
    });

    uploadStream.on('error', (err) => {
        res.status(500).send("Upload failed: " + err.message);
    });
});

app.get('/file/:filename', (req, res) => {
    try {
        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
        
        downloadStream.on('error', () => {
            res.status(404).send("File not found.");
        });

        downloadStream.pipe(res);
    } catch (err) {
        res.status(500).send("Error retrieving file.");
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));