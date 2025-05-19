import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Use Vite’s Dev-Server Proxy (recommended)
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			// any request to /api/... will be forwarded to localhost:8082/api/...
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
