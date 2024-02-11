const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const router = express.Router();
const os = require('os');


app.use(express.static("dist"));
// Parsing json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/infrastructures-list', (req, res) => {
    fs.readFile('./infrastructures.json', 'utf-8', (err, data) => {
        if (!err) {
            if (!data || data === '{}') {
                res.send({ code: 'Error', message: 'Without Data' })
            } else {
                res.send({ code: 0, message: 'success', data: JSON.parse(data) })
            }
        } else {
            res.send({ code: 'Error', message: 'read file failure' })
        }
    })
})

router.post('/update-infrastructures-list', (req, res) => {
    const data = req.body;
    fs.readFile('./experiments.json', 'utf-8', (err, experimentsData) => {
        if (!err) {
            if (experimentsData && experimentsData !== '{}') {
                const entries = Object.entries(data);
                const newData = JSON.parse(experimentsData);
                const keys = [];
                // Change the value of original data
                entries.forEach(([key, value]) => {
                    if (newData[key]) {
                        newData[key] = value;
                    }
                    keys.push(key);
                });
                // Delete data
                const experimentsDataKeys = Object.keys(newData);
                experimentsDataKeys.forEach(key => {
                    if (!keys.includes(key)) {
                        delete newData[key];
                    }
                });
                // Rewrite data
                fs.writeFile('./experiments.json', JSON.stringify(newData), err => {
                })
            }
        }
    })

    fs.writeFile('./infrastructures.json', JSON.stringify(data), err => {
        if (!err) {
            res.send({ code: 0, message: 'success' })
        } else {
            res.send({ code: 'Error', message: 'write file failure' })
        }
    })
});

router.get('/experiments-list', (req, res) => {
    fs.readFile('./experiments.json', 'utf-8', (err, data) => {
        if (!err) {
            if (!data || data === '{}') {
                res.send({ code: 'Error', message: 'Without Data' })
            } else {
                res.send({ code: 0, message: 'success', data: JSON.parse(data) })
            }
        } else {
            res.send({ code: 'Error', message: 'read file failure' })
        }
    })
})


router.post('/update-experiments-list', (req, res) => {
    const data = req.body;
    fs.writeFile('./experiments.json', JSON.stringify(data), err => {
        if (!err) {
            res.send({ code: 0, message: 'success' })
        } else {
            res.send({ code: 'Error', message: 'write file failure' })
        }
    })
});

app.use(router);


// Get local IP
const getIpAddress = _ => {
    const interfaces = os.networkInterfaces()
    for (const dev in interfaces) {
        const interface = interfaces[dev]
        for (let i = 0; i < interface.length; i++) {
            let { family, address, internal } = interface[i]
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                return address
            }
        }
    }
};

app.listen(3000, function () {   // liseten to http://127.0.0.1:3000
    console.log(`The node service is ready, please access it on the http://${getIpAddress()}:3000.`);
});
