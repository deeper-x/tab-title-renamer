(function () {
  let enforcedTitle = null;

  function applyTitle() {
    if (enforcedTitle && document.title !== enforcedTitle) {
      document.title = enforcedTitle;
    }
  }

  chrome.storage.local.get([location.href], (res) => {
    if (res[location.href]) {
      enforcedTitle = res[location.href];
      applyTitle();
    }
  });

  // Only observe if head exists
  if (document.head) {
    const observer = new MutationObserver(applyTitle);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  // Fallback for SPA pages or dynamically added head
  const headCheckInterval = setInterval(() => {
    if (!document.head) return;
    clearInterval(headCheckInterval);
    const observer = new MutationObserver(applyTitle);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }, 100);
  
  // Ensure interval still reapplies title
  setInterval(applyTitle, 1000);
})();
