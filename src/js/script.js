import { tableConfig } from "./tableConfig.js";
import { initializeExams } from "./examConfig.js";

function init() {
  console.log("Dashboard initializing: starting tableConfig and initializeExams...");
  
  try {
    tableConfig();
    console.log("Table config initialized successfully.");
  } catch (error) {
    console.error("Error initializing tableConfig:", error);
  }

  try {
    initializeExams("#exams-container");
    console.log("Exam modules initialized successfully.");
  } catch (error) {
    console.error("Error initializing exams:", error);
  }
}

// Robust readyState check to avoid race conditions with DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired.");
    init();
  });
} else {
  console.log("DOM already parsed, initializing dashboard immediately.");
  init();
}
