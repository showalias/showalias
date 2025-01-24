chrome.runtime.onInstalled.addListener(() => {
  console.log("Alias Replacer installed.");
});

document.addEventListener("input", (event) => {
	console.log('input');
  if (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT") {
    chrome.storage.local.get("aliases", (result) => {
      const aliases = result.aliases || [];
	console.log(aliases);
      let value = event.target.value;
	console.log('value:'+value);
      aliases.forEach(({ name, value: aliasValue }) => {
        const regex = new RegExp(`\\b${name}\\b`, "g");
        value = value.replace(regex, aliasValue);
      });
      event.target.value = value;
    });
  }
});

