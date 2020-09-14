var ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const glob = require('glob')


module.exports = {
  configureWebpack: {
    plugins: [
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            maxFileSize: 10000, // Only apply this one to files equal to or under 10kb
            jpegtran: { progressive: false },
            plugins: [
                imageminMozjpeg({
                  quality: 90,
                  progressive: false
                }),
            ]
          }),
          new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            minFileSize: 10000, // Only apply this one to files over 10kb
            jpegtran: { progressive: true },
            plugins: [
                imageminMozjpeg({
                  quality: 90,
                  progressive: true
                }),
            ]
          }),
    ],
  },
  lintOnSave: false
}