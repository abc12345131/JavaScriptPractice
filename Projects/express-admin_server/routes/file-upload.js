const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  // destination: 'upload', auto make dir
    destination: function (req, file, callback) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    callback(null, dirPath)
                }
            })
        } else {
            callback(null, dirPath)
        }
    },
    filename: function (req, file, callback) {
        var ext = path.extname(file.originalname)
        callback(null, file.fieldname + '-' + Date.now() + ext)
    }
})

const upload = multer({storage})
const uploadSingle = upload.single('image')

//upload img
router.post('/manage/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) {
        if (err) {
            return res.send({
                status: 1,
                msg: 'Failed to upload file'
            })
        }
        var file = req.file
        res.send({
            status: 0,
            data: {
                name: file.filename,
                url: 'http://localhost:5000/upload/' + file.filename
            }
        })

    })
})

//delete img
router.post('/manage/img/delete', (req, res) => {
    const {name} = req.body
    fs.unlink(path.join(dirPath, name), (err) => {
    if (err) {
        console.log(err)
        res.send({
            status: 1,
            msg: 'Failed to delete file'
        })
    } else {
        res.send({
            status: 0
        })
    }
    })
})

module.exports = router