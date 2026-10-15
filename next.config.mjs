/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pages live at /toolbox/ etc. Each Confu deck is a self-contained HTML file under /public/confu/<ep>/
  // with relative asset paths, so its pretty URL keeps the trailing slash and is rewritten to index.html.
  trailingSlash: true,
  // 团队内部站点：所有路径（包括 public/ 下托管的整页 HTML 和 zip）都不进搜索引擎
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
  },
  async rewrites() {
    return [
      { source: '/confu/:ep/', destination: '/confu/:ep/index.html' },
      { source: '/toolbox/atlas/', destination: '/toolbox/atlas/index.html' },
      { source: '/confu/:ep/:page/', destination: '/confu/:ep/:page/index.html' },
      // 项目的托管整页：public/projects/<slug>/[<key>/[<page>/]]index.html。
      // 这一组是 afterFiles rewrite，app/ 里已有的页面优先，所以只对没有 React 页面的路径生效。
      { source: '/projects/:slug/', destination: '/projects/:slug/index.html' },
      { source: '/projects/:slug/:key/', destination: '/projects/:slug/:key/index.html' },
      { source: '/projects/:slug/:key/:page/', destination: '/projects/:slug/:key/:page/index.html' },
    ]
  },
}
export default nextConfig
