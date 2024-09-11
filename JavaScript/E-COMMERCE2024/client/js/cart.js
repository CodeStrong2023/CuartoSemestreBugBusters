const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  // Modal Header
  const modalHeader = document.createElement("div");
  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Cart";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);
  modalContainer.append(modalHeader);

  // Modal Body
  if (cart.length > 0) {
    cart.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
        <div class="product">
          <img class="product-img" src="${product.img}" />
          <div class="product-info">
            <h4>${product.productName}</h4>
          </div>
          <div class="quantity">
            <span class="quantity-btn-decrease">-</span>
            <span class="quantity-input">${product.quanty}</span>
            <span class="quantity-btn-increase">+</span>
          </div>
          <div class="price">${product.price * product.quanty} $</div>
          <div class="delete-product">❌</div>
        </div>
      `;
      modalContainer.append(modalBody);

      const decrease = modalBody.querySelector(".quantity-btn-decrease");
      decrease.addEventListener("click", () => {
        if (product.quanty !== 1) {
          product.quanty--;
          displayCart();
          displayCartCounter();
        }
      });

      const increase = modalBody.querySelector(".quantity-btn-increase");
      increase.addEventListener("click", () => {
        product.quanty++;
        displayCart();
        displayCartCounter();
      });

      // Delete
      const deleteProduct = modalBody.querySelector(".delete-product");
      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(product.id);
      });
    });

    // Modal Footer
    const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
      <div class="total-price">Total: ${total} $</div>
      <button class="btn-primary" id="checkout-btn">Checkout</button>
      <div id="wallet_container"></div>
    `;
    modalContainer.append(modalFooter);

    const mp = new MercadoPago("", { locale: "es-AR" }); //Agregar public key

    const generateCartDescription = () => {
      return cart.map(product => `${product.productName} (x${product.quanty})`).join(", ");
    };

    document.getElementById("checkout-btn").addEventListener("click", async () => {
      try {
        const orderData = {
          title: generateCartDescription(),
          quantity: 1,
          price: total,
        };

        const response = await fetch("http://localhost:8080/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);
      } catch (error) {
        alert("Error al generar la preferencia.");
      }
    });

    const createCheckoutButton = async (preferenceId) => {
        const bricksBuilder = mp.bricks();
        console.log("Preference ID:", preferenceId); // Verifica que obtienes el ID correctamente
      
        const renderComponent = async () => {
          if (window.checkoutButton) {
            window.checkoutButton.unmount();
          }
      
          window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
              preferenceId: preferenceId,
            },
          });
        };
      
        renderComponent();
      };
  } else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "Tu carrito está vacío";
    modalContainer.append(modalText);
  }
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = cart.findIndex((element) => element.id === id);
  cart.splice(foundId, 1);
  displayCart();
  displayCartCounter();
};

const displayCartCounter = () => {
  const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
  if (cartLength > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLength;
  } else {
    cartCounter.style.display = "none";
  }
};

