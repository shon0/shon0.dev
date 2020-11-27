import unified from 'unified'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import slug from 'rehype-slug'
import autolink from 'rehype-autolink-headings'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'

const markdownToHtml = async (content: string) => {
  return await unified()
    .use(markdown)
    .use(gfm)
    .use(remark2rehype)
    .use(slug)
    .use(autolink, {
      content: linkIcon,
    })
    .use(html)
    .process(content)
}

export default markdownToHtml

const linkIcon = {
  type: 'element',
  tagName: 'svg',
  properties: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 20 20',
    fill: 'currentColor',
    width: '16',
    height: '16',
    className: ['inline', 'align-baseline'],
  },
  children: [
    {
      type: 'element',
      tagName: 'path',
      properties: {
        fillRule: 'evenodd',
        d:
          'M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z',
        clipRule: 'evenodd',
      },
      children: [],
    },
  ],
}