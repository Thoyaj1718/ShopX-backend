const Product = require('../models/Product')

// Get all products
const getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query

    let query = {}

    if (category && category !== 'ALL') {
      query.category = category
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    let products = await Product.find(query)

    if (sort === 'PRICE_HIGH') {
      products = products.sort((a, b) => b.price - a.price)
    } else if (sort === 'PRICE_LOW') {
      products = products.sort((a, b) => a.price - b.price)
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getProducts, getProductById }