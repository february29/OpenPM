module.exports = {
  upload: (req, res) => {
    const file = req.file
    const size = file.size
    const path = file.path
    const mimetype = file.mimetype
    const originalname = file.originalname
    res.send({
      code: 200,
      msg: '上传成功',
      data: {
        size,
        path,
        mimetype,
        originalname
      }
    })
  }
}
