import markdownIt from 'markdown-it'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownitContainer from 'markdown-it-container'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItGithubToc from 'markdown-it-github-toc'
import markdownitIcons from 'markdown-it-icons'

class Engine {
  constructor (options = {}, extensions = []) {
    this.mdc = markdownIt(options)
    if (options.linkify === true) {
      this.mdc.linkify.set({ fuzzyLink: false })
    }
    extensions.forEach((extension) => {
      switch (extension) {
        case 'mark':
          this.mdc.use(markdownItMark)
          break
        case 'ins':
          this.mdc.use(markdownItIns)
          break
        case 'sub':
          this.mdc.use(markdownItSub)
          break
        case 'sup':
          this.mdc.use(markdownItSup)
          break
        case 'deflist':
          this.mdc.use(markdownItDeflist)
          break
        case 'abbr':
          this.mdc.use(markdownItAbbr)
          break
        case 'footnote':
          this.mdc.use(markdownItFootnote)
          break
        case 'container':
          this.mdc.use(markdownitContainer, 'success')
          this.mdc.use(markdownitContainer, 'info')
          this.mdc.use(markdownitContainer, 'warning')
          this.mdc.use(markdownitContainer, 'danger')
          break
        case 'github-toc':
          this.mdc.use(markdownItGithubToc, {
            tocFirstLevel: 2,
            tocLastLevel: 3,
            tocClassName: 'toc',
            anchorLinkSymbol: '',
            anchorLinkSpace: false,
            anchorClassName: 'anchor',
            anchorLinkSymbolClassName: 'octicon octicon-link'
          })
          break
        case 'emoji':
        case 'font-awesome':
          this.mdc.use(markdownitIcons, extension)
          break
        case 'task-list':
          const mdc = this.mdc
          mdc.renderer.renderInline = function (tokens, options, env) {
            let result = mdc.renderer.constructor.prototype.renderInline.call(this, tokens, options, env)
            if ((mdc.tags['bullet_list'] || 0) > 0 && (mdc.tags['list_item'] || 0) > 0) {
              if (tokens[0].content.startsWith('[ ] ')) {
                return '<input type="checkbox" disabled /> ' + result.substr(4)
              } else if (tokens[0].content.startsWith('[x] ')) {
                return '<input type="checkbox" disabled checked /> ' + result.substr(4)
              }
            }
            return result
          }
          break
        default:
          break
      }
    })
  }
}

export default Engine
