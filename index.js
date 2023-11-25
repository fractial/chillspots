const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.port || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const newFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, newFileName);
        req.newFileName = newFileName;
    },
});

const upload = multer({storage: storage});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const filePath = 'public/markers.json';

app.post('/submit', upload.single('file'), (req, res) => {
    let name = req.body.name;
    let desc = req.body.desc;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let img = req.newFileName;

    if (!req.file) {
        res.send({
            error: 'error',
        });
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error', err);
            return;
        }
    
        const jsonArray = JSON.parse(data);
    
        const newEntry = {
            name: name,
            desc: desc,
            lat: lat,
            lng: lng,
            image: img,
            auth: false,
        };

        console.log(newEntry);
    
        jsonArray.push(newEntry);
    
        const jsonString = JSON.stringify(jsonArray, null, 2);
    
        fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
            if (err) {
                console.error('Error', err);
                return;
            }
        });
        console.log('Added')
    });
    res.status(204).end()
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});