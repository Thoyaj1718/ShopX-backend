const mongoose = require('mongoose')
const Product = require('../models/Product')
require('dotenv').config()

const products = [
  {
    title: 'iPhone 15',
    price: 79999,
    description: 'Latest Apple iPhone with A16 Bionic chip',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    rating: 4.5,
    stock: 10,
  },
  {
    title: 'Nike Air Max',
    price: 8999,
    description: 'Comfortable running shoes with air cushioning',
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.2,
    stock: 25,
  },
  {
    title: 'Samsung 4K TV',
    price: 49999,
    description: '55 inch 4K Ultra HD Smart LED TV',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    rating: 4.3,
    stock: 8,
  },
  {
    title: 'Levi\'s Jeans',
    price: 2999,
    description: 'Classic fit denim jeans',
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    rating: 4.0,
    stock: 50,
  },
  {
    title: 'Sony Headphones',
    price: 14999,
    description: 'Wireless noise cancelling headphones',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.6,
    stock: 15,
  },
  {
    title: 'Cooking Essentials Book',
    price: 499,
    description: 'Complete guide to Indian cooking',
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    rating: 4.1,
    stock: 30,
  },
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('Products seeded successfully')
    process.exit()
  } catch (error) {
    console.log('Error seeding:', error.message)
    process.exit(1)
  }
}

seedDB()