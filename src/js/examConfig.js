// exams config

// Module exam configurations
import { moduleConfigs } from "./moduleConfig.js";

function initializeExams(containerSelector) {
  console.log(
    "initializeExams: starting execution for selector:",
    containerSelector,
  );
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(
      "initializeExams: target container not found for selector:",
      containerSelector,
    );
    return;
  }

  container.innerHTML = "";
  console.log("initializeExams: clearing container and generating modules...");

  Object.entries(moduleConfigs).forEach(([moduleId, config]) => {
    const moduleSection = document.createElement("section");
    moduleSection.classList.add("module-section");
    moduleSection.innerHTML = `<h2 class="sub-title">${config.name}</h2>`;

    config.exams.forEach((exam, index) => {
      const details = document.createElement("details");
      details.classList.add("closed");

      const summary = document.createElement("summary");

      const badge = document.createElement("span");
      badge.classList.add("badge", "badge-colored");
      badge.textContent = `გამოცდა ${index + 1}`;

      if (exam.time === null) {
        badge.classList.add("soon");
      }

      let timeBadge = "";
      if (exam.duration) {
        timeBadge = `<span class="badge badge-time">${exam.duration}</span>`;
      }

      summary.innerHTML = `
        ${badge.outerHTML}
        ${exam.text}
        ${timeBadge}
        ${exam.date ? `- ${exam.date}` : ""}
      `.trim();

      const content = document.createElement("div");
      content.classList.add("content");
      content.innerHTML =
        exam.content ||
        "<p>გამოცდის დავალება და დეტალები ჯერ არ არის ხელმისაწვდომი.</p>";

      details.appendChild(summary);
      details.appendChild(content);

      // Event listeners
      summary.addEventListener("click", (e) => {
        const now = Date.now();

        if (exam.time === null) {
          e.preventDefault();
          alert("გამოცდის თარიღი მალე დაემატება");
        } else if (!details.open && now < exam.time) {
          e.preventDefault();
          alert(`გამოცდა გაიხსნება ${exam.date} რიცხვში`);
        } else {
          if (details.open) {
            details.classList.remove("opening");
            details.classList.add("closing");
          } else {
            details.classList.remove("closing");
            details.classList.add("opening");
          }
        }
      });

      details.addEventListener("toggle", () => {
        if (details.open) {
          details.classList.add("open");
          details.classList.remove("closed", "closing");
          setTimeout(() => details.classList.remove("opening"), 300);
        } else {
          details.classList.add("closed");
          details.classList.remove("open", "opening");
          setTimeout(() => details.classList.remove("closing"), 300);
        }
      });

      moduleSection.appendChild(details);
    });

    container.appendChild(moduleSection);
  });
}

export { initializeExams, moduleConfigs };
