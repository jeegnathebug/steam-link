(() => {
  const match = window.location.pathname.match(/^\/app\/([^/]+)/);

  if (!match) {
    return;
  }

  const id = match[1];

  const anchor = document.createElement("a");

  anchor.textContent = "SteamDB";
  anchor.href = `https://steamdb.info/app/${id}/`;
  anchor.target="_blank";

  Object.assign(anchor.style, {
    position: "fixed",
    top: "12px",
    right: "12px",
    background: "#222",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    zIndex: "999999",
  });

  document.body.appendChild(anchor);
})();
