const Best_products = document.querySelector(".best_products");

fetch("data/db.json")
    .then(response => response.json())
    .then(data => {
        const bestBooks = data.products.filter(product => product.best_seller === true);
        bestBooks.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "product-card cursor-pointer bg-[#2c231b] rounded-xl p-2 sm:p-3 shadow-md shadow-black/30 border border-[#4a3c30] opacity-0 translate-y-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-50 sm:h-60 object-cover rounded-lg mb-2">
                <h3 class="font-bold text-center text-xs sm:text-sm text-white truncate">${product.name}</h3>
                <p class="author text-center text-[10px] sm:text-xs text-[#c09e68] mb-2">${product.author}</p>
                <button class="addToCartBtn w-full py-1 sm:py-1.5 bg-[#725d3b] hover:bg-[#796449] transition-colors text-white text-[10px] sm:text-xs font-semibold rounded-md">
                    Add To Cart
                </button>
            `;

            card.addEventListener("click", () => {
                window.location.href = `product.html?id=${product.id}`;
            });

            Best_products.appendChild(card);

            const addBtn = card.querySelector(".addToCartBtn");

            addBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (!currentUser) {
                    alert("You must login first!");
                    localStorage.setItem("redirectAfterLogin", "index.html");
                    window.location.href = "login.html";
                    return;
                }
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existing = cart.find(item => item.id === product.id);

                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        image: product.image,
                        quantity: 1
                    });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product added to cart ✅");
            });

            setTimeout(() => {
                card.classList.remove("opacity-0", "translate-y-4");
                card.classList.add("opacity-100", "translate-y-0");
            }, index * 200);
        });
    })
    .catch(error => console.log(error));