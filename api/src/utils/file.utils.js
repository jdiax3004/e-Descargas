const fs = require('fs-extra')
const path = require('path')
const { randomNumber } = require('./random.utils')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const fileUploader = {}

fileUploader.upload = async (file, location) => {
  const UUID = randomNumber()

  const fileTempPath = file.path
  const ext = path.extname(file.originalname).toLowerCase()
  const targetPath = path.resolve(`public/temp/${UUID}${ext}`)

  // you wil need the public/temp path or this will throw an error
  await fs.rename(fileTempPath, targetPath)
  const folder = `${process.env.CLOUDINARY_FOLDER.toString()}${location ? location : ''}`
  // upload to cludinary
  const result = await cloudinary.v2.uploader.upload(targetPath, { folder, resource_type: 'auto' })

  // remove image
  await fs.unlink(targetPath)

  return result.secure_url

}


fileUploader.delete = async (path) => {
  let arr = path.split('/')
  arr = arr.slice(Math.max(arr.length - 4, 0))
  const name = arr.join('/').split('.')[0]
  const type = path.split('/').slice(Math.max(path.split('/').length - 7, 0))[0]
  return await cloudinary.v2.uploader.destroy(name, {
    resource_type: type
  })
}

module.exports = fileUploader