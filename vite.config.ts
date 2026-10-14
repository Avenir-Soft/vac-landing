import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		// API админки — PHP. Локально: `npm run dev:api` (Docker), данные в .dev-data/.
		proxy: Object.fromEntries(
			['/api', '/content', '/uploads'].map(path => [path, 'http://localhost:8080']),
		),
	},
})
