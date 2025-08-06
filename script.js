console.log("====================================")
console.log("Bundle Builder Connected")
console.log("====================================")

// Bundle Builder Class
class BundleBuilder {
  constructor() {
    this.selectedProducts = new Map()
    this.discountThreshold = 3
    this.discountPercentage = 0.3

    this.init()
  }

  init() {
    // Bind event listeners
    this.bindEvents()

    // Initial render
    this.updateUI()

    console.log("Bundle Builder initialized")
  }

  bindEvents() {
    // Add to bundle button clicks
    document.querySelectorAll(".add-to-bundle-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Use currentTarget instead of target to get the button element
        const productId = e.currentTarget.getAttribute("data-product-id")
        this.toggleProduct(productId)
      })
    })

    // Add bundle to cart button
    document.querySelector(".add-bundle-btn").addEventListener("click", () => {
      this.addBundleToCart()
    })
  }

  //Toggle Product

  toggleProduct(productId) {
    const productCard = document.querySelector(`[data-id="${productId}"]`)

    if (!productCard) {
      console.error(`Product card with id ${productId} not found`)
      return
    }

    const productData = this.getProductData(productCard)

    if (this.selectedProducts.has(productId)) {
      // Remove product from bundle
      this.selectedProducts.delete(productId)
      this.updateProductButton(productId, false)
      productCard.classList.remove("selected")
      console.log(`Removed product ${productId} from bundle`)
    } else {
      // Add product to bundle with quantity 1
      productData.quantity = 1
      this.selectedProducts.set(productId, productData)
      this.updateProductButton(productId, true)
      productCard.classList.add("selected")
      console.log(`Added product ${productId} to bundle`)
    }

    this.updateUI()
  }

  //Get Product Data
  getProductData(productCard) {
    if (!productCard) {
      console.error("Product card is null")
      return null
    }

    return {
      id: productCard.getAttribute("data-id"),
      name: productCard.getAttribute("data-name"),
      price: Number.parseFloat(productCard.getAttribute("data-price")),
      image: productCard.getAttribute("data-image"),
      quantity: 1,
    }
  }

  //Update Product Button
  updateProductButton(productId, isSelected) {
    const button = document.querySelector(`[data-product-id="${productId}"]`)

    if (!button) {
      console.error(`Button with product-id ${productId} not found`)
      return
    }

    if (isSelected) {
      button.classList.add("added")
    } else {
      button.classList.remove("added")
    }
  }

  //Update Quantity
  updateQuantity(productId, change) {
    if (this.selectedProducts.has(productId)) {
      const product = this.selectedProducts.get(productId)
      const newQuantity = Math.max(1, product.quantity + change)
      product.quantity = newQuantity
      this.selectedProducts.set(productId, product)
      this.updateUI()
    }
  }

  //Update Ui Logic
  updateUI() {
    this.updateSelectedProductsList()
    this.updatePricing()
    this.updateAddBundleButton()
  }

  //Update Selected Product List
  updateSelectedProductsList() {
    const selectedProductsContainer = document.querySelector(".selected-products")

    if (!selectedProductsContainer) {
      console.error("Selected products container not found")
      return
    }

    if (this.selectedProducts.size === 0) {
      selectedProductsContainer.innerHTML = `
                <div class="empty-state">
                    <p>Select 3 or more items to unlock 30% discount</p>
                </div>
            `
      return
    }

    let html = ""
    this.selectedProducts.forEach((product) => {
      html += `
                <div class="selected-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="selected-item-info">
                        <div class="selected-item-name">${product.name}</div>
                        <div class="selected-item-price">$${product.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="bundleBuilder.updateQuantity('${product.id}', -1)">−</button>
                            <span class="quantity-display">${product.quantity}</span>
                            <button class="quantity-btn" onclick="bundleBuilder.updateQuantity('${product.id}', 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="bundleBuilder.toggleProduct('${product.id}')">
                        🗑
                    </button>
                </div>
            `
    })

    selectedProductsContainer.innerHTML = html
  }

  //Update pricing
  updatePricing() {
    const subtotal = this.calculateSubtotal()
    const hasDiscount = this.selectedProducts.size >= this.discountThreshold
    const discountAmount = hasDiscount ? subtotal * this.discountPercentage : 0
    const total = subtotal - discountAmount

    // Update discount row
    const discountRow = document.querySelector(".discount-row")
    const discountElement = document.querySelector(".discount")

    if (discountRow && discountElement) {
      if (hasDiscount) {
        discountRow.style.display = "flex"
        discountElement.textContent = `$${discountAmount.toFixed(2)} (30%)`
      } else {
        discountRow.style.display = "none"
      }
    }

    // Update total (Aactually subtotal in the reference)
    const totalElement = document.querySelector(".total")
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`
    }
  }

  //Calculate Subtotal
  calculateSubtotal() {
    let subtotal = 0
    this.selectedProducts.forEach((product) => {
      subtotal += product.price * product.quantity
    })
    return subtotal
  }

  updateAddBundleButton() {
    const addBundleBtn = document.querySelector(".add-bundle-btn")

    if (!addBundleBtn) {
      console.error("Add bundle button not found")
      return
    }

    const hasMinimumItems = this.selectedProducts.size >= this.discountThreshold

    addBundleBtn.disabled = !hasMinimumItems

    if (hasMinimumItems) {
      const totalItems = Array.from(this.selectedProducts.values()).reduce((sum, product) => sum + product.quantity, 0)
      addBundleBtn.textContent = `Add ${totalItems} Items to Cart`
    } else {
      const remaining = this.discountThreshold - this.selectedProducts.size
      addBundleBtn.textContent = `Add ${remaining} More Item${remaining !== 1 ? "s" : ""} to Cart`
    }
  }

  addBundleToCart() {
    if (this.selectedProducts.size < this.discountThreshold) {
      console.log("Not enough items selected for bundle")
      return
    }

    // Simulate adding bundle to cart
    const bundleData = {
      products: Array.from(this.selectedProducts.values()),
      subtotal: this.calculateSubtotal(),
      discount: this.calculateSubtotal() * this.discountPercentage,
      total: this.calculateSubtotal() * (1 - this.discountPercentage),
      discountPercentage: this.discountPercentage * 100,
    }

    console.log("Bundle added to cart:", bundleData)

    // Show success message
    alert(
      `Bundle added to cart! \n\nItems: ${bundleData.products.length}\nSubtotal: $${bundleData.subtotal.toFixed(2)}\nDiscount: -$${bundleData.discount.toFixed(2)}\nTotal: $${bundleData.total.toFixed(2)}\n\nYou saved $${bundleData.discount.toFixed(2)} (${bundleData.discountPercentage}% off)!`,
    )
  }

  resetBundle() {
    // Clear all selections
    this.selectedProducts.clear()

    // Reset all product buttons and cards
    document.querySelectorAll(".product-card").forEach((card) => {
      card.classList.remove("selected")
    })

    document.querySelectorAll(".add-to-bundle-btn").forEach((btn) => {
      btn.classList.remove("added")
    })

    // Update UI
    this.updateUI()

    console.log("Bundle reset")
  }

  getBundleState() {
    return {
      selectedProducts: Array.from(this.selectedProducts.values()),
      count: this.selectedProducts.size,
      subtotal: this.calculateSubtotal(),
      hasDiscount: this.selectedProducts.size >= this.discountThreshold,
      discountAmount:
        this.selectedProducts.size >= this.discountThreshold ? this.calculateSubtotal() * this.discountPercentage : 0,
    }
  }
}

// Initialize the bundle builder when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.bundleBuilder = new BundleBuilder()
})

// Helper functions for debugging
window.debugBundle = () => {
  console.log("Current bundle state:", window.bundleBuilder.getBundleState())
}

window.resetBundle = () => {
  window.bundleBuilder.resetBundle()
}
