let menuLinks = document.querySelectorAll(".menu-item > a");

let productsButtons = document.getElementsByClassName("products-button");

let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");

let prices = document.getElementsByClassName("products-item-price");

// MENU NAV SCROLL

document.getElementById("main-action-button").onclick = function () {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};

for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].onclick = function () {
    document
      .getElementById(menuLinks[i].getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
  };
}

for (let i = 0; i < productsButtons.length; i++) {
  productsButtons[i].onclick = function () {
    // Change order value
    const parentDiv = productsButtons[i].closest(".products-item");
    const titleDiv = parentDiv.querySelector(".products-item-title");
    const titleText = titleDiv ? titleDiv.textContent.trim() : "";

    if (burger.value === "") {
      burger.value = titleText;
    } else {
      burger.value = burger.value + ", " + titleText;
    }

    // Scroll to order
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  };
}

// VALIDATION

document.getElementById("order-action").onclick = function () {
  let hasError = false;

  // Inputs error outline
  [burger, name, phone].forEach((item) => {
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasError = true;
    } else {
      item.parentElement.style.background = "";
    }
  });

  // PHONE VALIDATION

  const phoneRegexp =
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

  if (!phoneRegexp.test(phone.value) && !hasError) {
    hasError = true;
    phone.parentElement.style.background = "red";
    alert("Введите валидный номер телефона");
  }

  // Submit
  if (!hasError) {
    [burger, name, phone].forEach((item) => {
      item.value = "";
    });

    alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
  }
};

// CHANGE CURRENCY

document.getElementById("change-currency").onclick = function (e) {
  let currentCurrency = e.target.innerText;
  let newCurrency = "$";
  let coefficient = 1;

  if (currentCurrency === "$") {
    newCurrency = "€";
    coefficient = 0.91;
  } else if (currentCurrency === "€") {
    newCurrency = "₴";
    coefficient = 36.86;
  }

  e.target.innerText = newCurrency;

  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText =
      +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) +
      " " +
      newCurrency;
  }
};
