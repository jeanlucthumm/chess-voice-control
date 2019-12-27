chrome.browserAction.onClicked.addListener(() => {
  let scripts = ['movement.js', 'content.js'];
  multipleInjection(scripts);
});

function multipleInjection(scripts) {
  function step(index) {
    if (index >= scripts.length) return;
    chrome.tabs.executeScript({
      file: scripts[index]
    }, () => step(index + 1));
  }

  step(0);
}
