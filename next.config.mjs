//  @type {import('next').NextConfig}

const nextConfig = {
    images: {
        unoptimized: true
    },
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './build', // Changes the build output directory to `./dist`.
    // For Vercel deployment, no basePath needed (it's at root)
    // For GitHub Pages, you would add: basePath: '/AlgorithmVisualizer', assetPrefix: '/AlgorithmVisualizer',
}
   
export default nextConfig;