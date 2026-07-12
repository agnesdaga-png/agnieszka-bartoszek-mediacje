document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const revealElements = [...document.querySelectorAll(".reveal")];

  const updateHeader = () => {
    if (!header) return;

    const scrolled = window.scrollY > 24;

    header.classList.toggle("is-scrolled", scrolled);
    header.style.position = scrolled ? "fixed" : "absolute";
    header.style.background = scrolled ? "rgba(5,5,5,.96)" : "transparent";
    header.style.backdropFilter = scrolled ? "blur(12px)" : "none";

    let current = "start";

    sections.forEach(section => {
      const offset = section.offsetTop - 230;
      if (window.scrollY >= offset) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold:0.12,
        rootMargin:"0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("is-visible"));
  }

  window.addEventListener("scroll", updateHeader, { passive:true });
  window.addEventListener("resize", updateHeader);

  updateHeader();
});
