
const apiUrl = "https://script.google.com/macros/s/AKfycbxyIPBoUrJbHtOeRdIpsT1QS_W3gY6tDQY5R2e3CZLVWLSd1CPu24RJwCDVfHhdj3u6/exec";

async function fetchChecklist(pc) {
  const res = await fetch(`${apiUrl}?sheet=移行前チェックリスト&id=${pc}`);
  return await res.json();
}

async function updateItem(pc, item, checked) {
  await fetch(`${apiUrl}?sheet=移行前チェックリスト`, {
    method: "POST",
    body: JSON.stringify({ computer_id: pc, item: item, checked: checked })
  });
}

window.onload = async () => {
  const params = new URLSearchParams(location.search);
  const pc = params.get("pc");
  const user = params.get("user");
  document.getElementById("title").textContent = `作業者: ${user}（PC: ${pc}）`;

  const list = document.getElementById("checklist");
  const items = await fetchChecklist(pc);

  items.forEach(({ item, checked }) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = checked === true || checked === "TRUE";
    cb.onchange = () => updateItem(pc, item, cb.checked);
    label.appendChild(cb);
    label.append(item);
    li.appendChild(label);
    list.appendChild(li);
  });
};
