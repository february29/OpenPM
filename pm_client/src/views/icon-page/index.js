// const files = require.context('../../assets/icons/svg', true, /\.svg$/)

const files = require.context('../../icons/svg', true, /\.svg$/)

const iconName = []
files.keys().forEach((key) => {
  iconName.push(key.replace(/(\.\/|\.svg)/g, ''))
})
export default iconName
