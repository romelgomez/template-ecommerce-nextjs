import { gql } from "@apollo/client";
import { CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from "./blocks";
import { HEADER, FOOTER } from "./globals";
import { LINK_FIELDS } from "./link";

export const PAGES = gql`
  query Pages {
    Pages(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PAGE = gql`
  query Page($slug: String ) {
    Pages(where: { slug: { equals: $slug}}) {
      docs {
        id
        title
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          media {
            url
            filename
            alt
            mimeType
            width
            height
          }
        }
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
        }
      }
    }

    ${HEADER}
    ${FOOTER}
  }
`
