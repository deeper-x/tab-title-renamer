const input = document.getElementById("title");
const button = document.getElementById("save");

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  input.value = tab.title;
});

button.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    const newTitle = input.value.trim();
    if (!newTitle) return;

    chrome.storage.local.set({
      [tab.url]: newTitle
    }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (title) => { document.title = title; },
        args: [newTitle]
      });
      window.close();
    });
  });
});
