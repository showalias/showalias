chrome.storage.local.get("aliases", (result) => {
  const aliases = result.aliases || [];
	console.log(aliases);

  document.addEventListener("input", (event) => {
    if (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT") {
      let value = event.target.value;
	console.log('input text:'+value);
      aliases.forEach(({ name, value: aliasValue }) => {
	const regex = new RegExp(`${name}`, "g");
	console.log('alias text:'+aliasValue);
	value = value.replace(regex, aliasValue);
	console.log('value text:'+value);
      });
      event.target.value = value;
	console.log('replace input text:'+event.target.value);
    }
  });
});

