// This script get's injected when url matches "*://leetcode.com/problems/*"

// LeetCode's Code Editor attribute.
// If LeetCode changes this string this extension breaks.
const editorAttribute = '[data-track-load="code_editor"]';
const effectClassName = "invisible-ink";

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "SLIDER_KEY") {
      $("." + effectClassName).css("filter", `blur(${newValue}px)`);
    }
  }
});

/**
 * The mutationObserver is needed as LeetCode adds the editor content dynamically.
 * This mutationObserver
 *  1. Injects the correct css class into the editor.
 *  2. Adds a click event handler so that the code is unblurred when clicked.
 */
function initMutationObserver() {
  const domObserver = new MutationObserver(function (mutations, observer) {
    let elements = $(editorAttribute);
    if (elements && elements.length > 0) {
      let codeEditor = elements[0];
      codeEditor.classList.add(effectClassName);
      codeEditor.addEventListener("click", function () {
        codeEditor.classList.remove(effectClassName);
        observer.disconnect();
      });
    }
  });

  // Configuration of the observer:
  var config = { childList: true, subtree: true };

  // Start observing the body for added nodes
  domObserver.observe(document.body, config);
}

function waitForDocumentReady() {
  if (document.body) {
    initMutationObserver();
  } else {
    window.addEventListener("DOMContentLoaded", initMutationObserver);
  }
}

waitForDocumentReady();
