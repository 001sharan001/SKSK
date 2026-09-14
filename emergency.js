// ================================
// CampusGo - Emergency Page
// ================================

const PRODUCTS = [
  {
    id: 1,
    name: "First Aid Kit (Compact)",
    cat: "firstaid",
    tags: "Bandages · Antiseptic · Emergency",
    price: 149,
    img: "assets/images/First Aid Kit (Compact).jpg"
  },
  {
    id: 2,
    name: "Antiseptic Spray",
    cat: "firstaid",
    tags: "Wound care · Antiseptic",
    price: 99,
    img: "assets/images/Antiseptic Spray.jpg"
  },
  {
    id: 3,
    name: "Paracetamol Strip (500mg)",
    cat: "fever",
    tags: "Fever · Pain relief",
    price: 25,
    img: "assets/images/Paracetamol Strip (500mg).png"
  },
  {
    id: 4,
    name: "Digital Thermometer",
    cat: "fever",
    tags: "Temperature · Digital",
    price: 199,
    img: "assets/images/Digital Thermometer.jpg"
  }
];

const emGrid = document.getElementById("emGrid");
const emResultCount = document.getElementById("emResultCount");
const categoryCards = document.querySelectorAll(".em-cat-card");

let activeCat = "firstaid";

// ================================
// Render Products
// ================================

function renderProducts() {
  if (!emGrid) return;

  const filteredProducts = PRODUCTS.filter(
    p => p.cat === activeCat
  );

  if (emResultCount) {
    emResultCount.textContent =
      `${filteredProducts.length} item${filteredProducts.length !== 1 ? "s" : ""}`;
  }

  if (filteredProducts.length === 0) {
    emGrid.innerHTML = `
      <div class="card" style="padding:30px; text-align:center;">
        <h3>No items available</h3>
        <p class="faint">Try another category.</p>
      </div>
    `;
    return;
  }

  emGrid.innerHTML = filteredProducts.map(p => `
    <article class="card product-card">

      <div
        class="em-cover"
        style="background-image: url('${p.img}');"
      ></div>

      <div class="em-body">

        <div class="em-name">
          ${p.name}
        </div>

        <div class="em-tags">
          ${p.tags}
        </div>

        <div class="em-foot">

          <span class="em-price">
            ₹${p.price}
          </span>

          <button
            class="em-add-btn"
            data-product-id="${p.id}"
          >
            Add
          </button>

        </div>

      </div>

    </article>
  `).join("");
}

// ================================
// Category Click
// ================================

categoryCards.forEach(card => {

  card.addEventListener("click", () => {

    activeCat = card.dataset.cat;

    categoryCards.forEach(c => {
      c.classList.remove("is-active");
    });

    card.classList.add("is-active");

    renderProducts();
  });

});

// ================================
// Add to Cart
// ================================

if (emGrid) {

  emGrid.addEventListener("click", event => {

    const button = event.target.closest(".em-add-btn");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    const product = PRODUCTS.find(
      p => p.id === productId
    );

    if (!product) return;

    // Use existing CampusGo cart system if available
    if (typeof addToCart === "function") {
      addToCart(product);
    } else {

      let cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existing = cart.find(
        item => item.id === product.id
      );

      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({
          ...product,
          qty: 1
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }

    button.textContent = "Added ✓";

    setTimeout(() => {
      button.textContent = "Add";
    }, 1000);

  });

}

// ================================
// Initial Render
// ================================

renderProducts();