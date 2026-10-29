import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => { throw redirect({ href: `/dashboard${location.searchStr}${location.hash ? `#${location.hash}` : ''}`, replace: true }); },
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Administration"
      },
      {
            "name": "description",
            "content": "Authorized LanguageBridge account administration."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Administration"
      },
      {
            "property": "og:description",
            "content": "Authorized LanguageBridge account administration."
      },
      {
            "property": "og:type",
            "content": "website"
      },
      {
            "name": "twitter:card",
            "content": "summary_large_image"
      },
      {
            "name": "robots",
            "content": "noindex, nofollow"
      }
]
  }),
});
