/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pages live at /toolbox/ etc. Each Confu deck is a self-contained HTML file under /public/confu/<ep>/
  // with relative asset paths, so its pretty URL keeps the trailing slash and is rewritten to index.html.
  trailingSlash: true,
  async rewrites() {
    return [{ source: '/confu/:ep/', destination: '/confu/:ep/index.html' }]
  },
}
export default nextConfig
