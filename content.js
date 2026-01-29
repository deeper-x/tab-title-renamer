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

  const observer = new MutationObserver(applyTitle);

  observer.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true
  });

  setInterval(applyTitle, 1000);
})();
