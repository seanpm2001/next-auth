import {
  PropSidebarItemLink,
  SidebarsConfig,
} from "@docusaurus/plugin-content-docs"
import manifest from "./manifest.mjs"
import { existsSync } from "fs"

const clerk: PropSidebarItemLink = {
  type: "link",
  href: "https://clerk.com?utm_source=sponsorship&utm_medium=docs&utm_campaign=authjs&utm_content=callout",
  label: "Clerk (hosted auth)",
}

export default {
  gettingStartedSidebar: [
    { type: "autogenerated", dirName: "getting-started" },
    clerk,
  ],
  guidesSidebar: [{ type: "autogenerated", dirName: "guides" }, clerk],
  referenceSidebar: [
    "reference/index",
    ...manifest.frameworks.map((framework) => {
      const moduleIndexId = `reference/${framework.id}/module.index`
      const indexId = `reference/${framework.id}/index`
      return {
        type: "category",
        label: framework.packageName,
        link: {
          type: "doc",
          id: existsSync(`./docs/${moduleIndexId}.md`)
            ? moduleIndexId
            : indexId,
        },
        items: require(`./docs/reference/${framework.id}/typedoc-sidebar.cjs`),
      }
    }),
    ...(process.env.TYPEDOC_SKIP_ADAPTERS
      ? []
      : [
          {
            type: "category",
            label: "Database Adapters",
            collapsed: false,
            items: manifest.adapters.map((adapter) => ({
              type: "doc",
              id: `reference/adapter/${adapter.id}/index`,
            })),
          },
        ]),
    "reference/warnings",
    clerk,
  ],
  conceptsSidebar: [{ type: "autogenerated", dirName: "concepts" }, clerk],
} as SidebarsConfig
