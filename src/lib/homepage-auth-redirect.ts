// Keep auth callback bytes intact rather than parsing/rebuilding router search state.
export function homepageAuthDestination(href: string): string | null {
  const url = new URL(href, "https://languagebridge.app");
  if (url.pathname !== "/") return null;
  const parts = [url.search.slice(1), url.hash.slice(1)];
  const isAuthLink = parts.some((part) => {
    const params = new URLSearchParams(part);
    return params.has("access_token") || params.has("token_hash") || params.has("code")
      || params.getAll("type").some((type) => type === "invite" || type === "recovery");
  });
  return isAuthLink ? `/dashboard${url.search}${url.hash}` : null;
}