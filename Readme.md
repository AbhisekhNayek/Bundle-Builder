# 🛍️ Bundle Builder – Save 30% on 3+ Items!

Welcome to the **Bundle Builder** project! This is a responsive and accessible product bundling web page that lets users create a personalized bundle of fashion products — and save 30% when they select 3 or more items! 🎉

## 🔍 Features

- 🎯 **Add-to-Bundle Logic**: Users can add and remove products from their bundle.
- 💸 **Automatic Discount**: Once 3 or more items are selected, a 30% discount is applied automatically.
- 📊 **Live Summary Updates**: Real-time updates of subtotal, discount, and savings.
- 🧠 **Accessible UI**: Follows best practices for screen readers and ARIA attributes.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

## 📂 Project Structure

```

bundle-builder/
├── assets/
│   │── Icons/
│   └── Products/
│       └── Product-1.jpg ... Product-7.jpg
├── style.css
├── script.js
├── index.html
└── README.md

````

## 🚀 Getting Started

To run this project locally:

1. **Clone this repo**  
  ```bash
   git clone https://github.com/AbhisekhNayek/Bundle-Builder.git
  ```

2. **Navigate into the folder**

   ```bash
   cd Bundle-Builder
   ```

3. **Open in your browser**
   Just open `index.html` in any modern browser.

## 🧩 How It Works

1. Click **"Add to Bundle"** on products you like.
2. Once 3+ items are selected, the discount applies automatically.
3. The sidebar updates with:

   * ✅ Selected Items
   * 🧾 Subtotal
   * 💰 Discount
   * 🎉 Savings
4. Button becomes active to **Add to Cart** when eligible.

## ✅ Accessibility Notes

* Uses `aria-*` attributes for screen reader support.
* Keyboard navigation and screen-reader-friendly labels included.
* Live updates use `aria-live="polite"` for dynamic content.

## ✨ Future Improvements

* 🛒 Cart integration
* 📦 Backend checkout
* 🧪 Unit tests for JS logic
* 🌍 Multi-language support

## ✨ Deploy Link

- See Here [Live Demo](https://your-demo-link.com)