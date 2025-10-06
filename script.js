/* ==========================
   Hiltop Primary School
   scripts.js
   ========================== */

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Hiltop Primary School!");

  // --------------------------
  // MOBILE NAV TOGGLE
  // --------------------------
  const nav = document.querySelector(".nav-links");
  const burger = document.createElement("div");
  burger.classList.add("burger");
  burger.innerHTML = "&#9776;"; // menu icon
  document.querySelector(".navbar").insertBefore(burger, nav);

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("open");
  });

  // Add mobile nav styles dynamically
  const style = document.createElement("style");
  style.innerHTML = `
    .burger {
      display: none;
      font-size: 2rem;
      color: white;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      .burger { display: block; }
      .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        background: #ffcc00;
        padding: 1rem;
        border-top: 2px solid rgba(0,0,0,0.1);
      }
      .nav-links.active { display: flex; }
      .nav-links a {
        padding: 0.5rem 0;
        color: #005f73;
      }
    }
  `;
  document.head.appendChild(style);

  // --------------------------
  // SMOOTH SCROLL
  // --------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  // --------------------------
  // SCROLL REVEAL ANIMATION
  // --------------------------
  const revealElements = document.querySelectorAll(".card, .section-title, .hero-content");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Add reveal animation CSS dynamically
  const revealStyle = document.createElement("style");
  revealStyle.innerHTML = `
    .card, .section-title, .hero-content {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.6s ease;
    }
    .card.show, .section-title.show, .hero-content.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(revealStyle);

  // --------------------------
  // FORMSPREE SUCCESS MESSAGE
  // --------------------------
  const forms = document.querySelectorAll("form[action*='formspree.io']");
  forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const action = form.getAttribute("action");

      try {
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          showSuccess(form);
        } else {
          alert("Oops! Something went wrong, please try again.");
        }
      } catch (error) {
        alert("Error sending form: " + error.message);
      }
    });
  });

  function showSuccess(form) {
    const successMsg = document.createElement("div");
    successMsg.textContent = "✅ Thank you! Your message has been sent successfully.";
    successMsg.style.cssText = `
      background: #ffcc00;
      color: #005f73;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 10px;
      text-align: center;
      font-weight: 600;
      animation: fadeIn 0.5s ease;
    `;
    form.parentNode.insertBefore(successMsg, form.nextSibling);

    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  }
});
