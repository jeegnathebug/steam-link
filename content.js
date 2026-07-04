const STEAMDB_LINK_CLASS = "steamdb-link";
const STEAMDB_LINK_TEXT = "SteamDB";

function getIdFromHref(url) {
  const itemPageMatch = url.pathname.match(/^\/app\/([^/]+)/);
  if (itemPageMatch) {
    return itemPageMatch[1];
  } else {
    return null;
  }
}

function createAnchor(id, extraStyles) {
  const anchor = document.createElement("a");
  anchor.className = STEAMDB_LINK_CLASS;
  anchor.textContent = STEAMDB_LINK_TEXT;
  anchor.href = `https://steamdb.info/app/${id}/`;
  anchor.target="_blank";

  Object.assign(anchor.style, {
    top: "12px",
    right: "12px",
    background: "#222",
    color: "#fff",
    padding: "5px 7px",
    borderRadius: "6px",
    fontSize: "12px",
    zIndex: "999999",
    ...extraStyles,
  });

  return anchor;
}

function main() {
  const gamePageMatch = window.location.pathname.includes("app");
  const wishlistPageMatch = window.location.pathname.includes("wishlist");

  if (gamePageMatch) {
    addLinkToGamePage();
  } else if (wishlistPageMatch) {
    // observe wishlist page because it refreshes and lazy loads
    const observer = new MutationObserver(() => {
      addLinksToWishListPage();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

function addLinkToGamePage() {
  const id = getIdFromHref(window.location);

  if (!id) {
    return;
  }

  const anchor = createAnchor(id, { position: "fixed" });
  document.body.appendChild(anchor);
}

function addLinksToWishListPage() {
  const pageAnchors = document.querySelectorAll(".Panel > a");

  pageAnchors.forEach(pageAnchor => {
    if (!pageAnchor.href) {
      return;
    }

    const parent = pageAnchor.closest(".Panel");;

    if (!parent) {
      return;
    }

    // do not add duplicate links
    if (parent.querySelector(`.${STEAMDB_LINK_CLASS}`)) {
      return;
    }

    const id = getIdFromHref(new URL(pageAnchor.href, window.location.origin));

    if (!id) {
      return;
    }

    const anchor = createAnchor(id, { position: "absolute" });
    parent.appendChild(anchor);
  });
}

main();
