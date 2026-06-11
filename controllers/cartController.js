const Cart = require('../models/Cart')

// Get cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart) {
      return res.status(200).json({ items: [] })
    }
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, quantity }],
      })
    } else {
      const itemExists = cart.items.find(
        item => item.product.toString() === productId
      )

      if (itemExists) {
        itemExists.quantity += quantity
      } else {
        cart.items.push({ product: productId, quantity })
      }

      await cart.save()
    }

    res.status(200).json({ message: 'Item added to cart' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    )

    await cart.save()
    res.status(200).json({ message: 'Item removed from cart' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Clear cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id })
    res.status(200).json({ message: 'Cart cleared' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCart, addToCart, removeFromCart, clearCart }