chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(null, (items) => {
    Object.entries(items).forEach(([folderId, color]) => {
      applyBookmarkColor(folderId, color);
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'updateBookmarkColor') {
    applyBookmarkColor(message.folderId, message.color);
  }
});

function applyBookmarkColor(folderId, color) {
  chrome.bookmarks.get(folderId, (bookmarks) => {
    if (bookmarks.length > 0) {
      const folder = bookmarks[0];
      chrome.bookmarks.update(folder.id, {
        title: `<span style="color: ${color};">${folder.title}</span>`
      });
    }
  });
}

