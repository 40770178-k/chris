// Will use this later for booking or tracking actions
console.log("SwiftTrans Homepage Loaded");
// admin login
if (window.location.pathname.includes("login.html")) {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const password = document.getElementById("password").value;
        if (password === "admin123") {
          localStorage.setItem("isAdmin", "true");
          window.location.href = "admin.html";
        } else {
          document.getElementById("error-msg").textContent = "Incorrect password!";
        }
      });
    }
  }
  // protect admin page
if (window.location.pathname.includes("admin.html")) {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "login.html";
    } else {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const listDiv = document.getElementById("orders-list");
  
      if (orders.length === 0) {
        listDiv.innerHTML = "<p>No orders found.</p>";
      } else {
        orders.forEach((order, index) => {
          const el = document.createElement("div");
          el.innerHTML = `<strong>Order ${index + 1}</strong>: ${order}`;
          listDiv.appendChild(el);
        });
      }
    }
  
    window.logout = function () {
      localStorage.removeItem("isAdmin");
      window.location.href = "login.html";
    };
  }
  // handle booking form
if (window.location.pathname.includes("booking.html")) {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const pickup = document.getElementById("pickup").value;
        const destination = document.getElementById("destination").value;
        const date = document.getElementById("date").value;
  
        const order = `Name: ${name}, Email: ${email}, Pickup: ${pickup}, Destination: ${destination}, Date: ${date}`;
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
  
        window.location.href = "thankyou.html";
      });
    }
  }
  