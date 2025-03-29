// Custom Next.js server with debugging
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

// Force debugging for path operations
const originalRelative = path.relative
path.relative = function(from, to) {
  if (from === undefined || to === undefined) {
    console.error('Path.relative called with undefined arguments!');
    console.error(`From: ${from}, To: ${to}`);
    console.error(new Error().stack);
    return '';
  }
  return originalRelative(from, to);
}

// Force environment variables
process.env.DISABLE_CLIENT_REFERENCE_MANIFEST = 'true'
process.env.NEXT_DISABLE_EXTRACTION = '1'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

// Start Next.js app
console.log('Starting Next.js app with debugging...')
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
}) 