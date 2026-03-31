import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from '@playwright/test'

const root = process.cwd()
const port = 4187

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
}

function resolvePath(urlPath) {
  const relativePath = urlPath === '/' ? 'og-template.html' : urlPath.replace(/^\/+/, '')
  const filePath = path.resolve(root, relativePath)
  if (!filePath.startsWith(root)) {
    throw new Error('Unsafe path')
  }
  return filePath
}

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, `http://127.0.0.1:${port}`).pathname
    const filePath = resolvePath(pathname)
    const data = await readFile(filePath)
    const extension = path.extname(filePath)
    response.writeHead(200, { 'content-type': mimeTypes[extension] ?? 'application/octet-stream' })
    response.end(data)
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
})

await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve))

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(`http://127.0.0.1:${port}/og-template.html`, { waitUntil: 'networkidle' })
await page.screenshot({ path: path.join(root, 'og-image.png') })
await browser.close()
await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
