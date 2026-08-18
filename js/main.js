(() => {
  const header = document.getElementById("header");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");
  const WA_PHONE = "9779817315737";
  const WA_LOCAL = "9817315737";

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      toggle.setAttribute(
        "aria-expanded",
        document.body.classList.contains("nav-open") ? "true" : "false"
      );
    });
    document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => document.body.classList.remove("nav-open"));
    });
  }

  if (year) year.textContent = new Date().getFullYear();

  const date = document.getElementById("date");
  if (date) {
    const today = new Date().toISOString().split("T")[0];
    date.min = today;
    if (!date.value) date.value = today;
  }

  const waUrl = (text) => {
    const base = "https://wa.me/" + WA_PHONE;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  };

  const showWaSheet = (url) => {
    let sheet = document.getElementById("wa-sheet");
    if (!sheet) {
      sheet = document.createElement("div");
      sheet.id = "wa-sheet";
      sheet.className = "wa-sheet";
      document.body.appendChild(sheet);
    }
    sheet.innerHTML = `
      <div class="wa-sheet-card" role="dialog" aria-label="Open WhatsApp">
        <p class="kicker">WhatsApp</p>
        <h3>Message Hotel Itaewon</h3>
        <p>If the app did not open, tap the green button again or save this number.</p>
        <a class="btn btn-gold" href="${url}">Open WhatsApp</a>
        <a class="btn btn-ghost" href="tel:+977${WA_LOCAL}">Call ${WA_LOCAL}</a>
        <p class="form-note">${WA_LOCAL}</p>
        <button type="button" class="wa-sheet-close" id="wa-sheet-close">Close</button>
      </div>`;
    sheet.classList.add("open");
    const close = () => sheet.classList.remove("open");
    document.getElementById("wa-sheet-close").addEventListener("click", close);
    sheet.addEventListener("click", (e) => {
      if (e.target === sheet) close();
    });
  };

  const form = document.getElementById("book-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [
        "Namaste, I would like to book at Hotel Itaewon.",
        "Request: " + (data.get("kind") || "Booking"),
        "Name: " + (data.get("name") || ""),
        "Phone: " + (data.get("phone") || ""),
        "Guests: " + (data.get("guests") || ""),
        "Date: " + (data.get("date") || "") + (data.get("time") ? " · " + data.get("time") : ""),
        data.get("note") ? "Note: " + data.get("note") : "",
      ].filter(Boolean);
      const url = waUrl(lines.join("\n"));
      showWaSheet(url);
    });
  }
})();
