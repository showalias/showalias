document.addEventListener("DOMContentLoaded", () => {
  const aliasNameInput = document.getElementById("alias-name");
  const aliasValueInput = document.getElementById("alias-value");
  const addButton = document.getElementById("add-button");
  const aliasList = document.getElementById("alias-list");
//  const saveButton = document.getElementById("save-button");

  let aliases = [];

  function renderList() {
    aliasList.innerHTML = "";
    aliases.forEach(({ name, value }, index) => {
      const li = document.createElement("li");
      li.textContent = `${name}: ${value}`;
      li.dataset.index = index;
      li.addEventListener("click", () => {
        aliasNameInput.value = name;
        aliasValueInput.value = value;
        addButton.textContent = "\u{1F4BE}";//"Save";
      });
      const deleteButton = document.createElement("button");
      //deleteButton.textContent = "Delete";
      deleteButton.textContent = "\u{274C}";
      deleteButton.title="Delete Alias";
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        aliases.splice(index, 1);
        renderList();
    chrome.storage.local.set({ aliases }, () => {
      console.log("Settings saved.");
    });
      });
      li.prepend(deleteButton);
      aliasList.appendChild(li);
    });
  }

  addButton.addEventListener("click", () => {
    const name = aliasNameInput.value.trim();
    const value = aliasValueInput.value.trim();

    if (name && value) {
      const existingIndex = aliases.findIndex((alias) => alias.name === name);
      if (existingIndex >= 0) {
        aliases[existingIndex] = { name, value };
      } else {
        aliases.push({ name, value });
      }
      aliasNameInput.value = "";
      aliasValueInput.value = "";
      addButton.textContent = "\u{2795}";//"Add";
      renderList();
    chrome.storage.local.set({ aliases }, () => {
      console.log("Settings saved.");
    });
    }
  });
/*
  saveButton.addEventListener("click", () => {
    chrome.storage.local.set({ aliases }, () => {
      console.log("Settings saved.");
    });
  });
  */

  chrome.storage.local.get("aliases", (result) => {
    aliases = result.aliases || [];
    renderList();
  });
});
