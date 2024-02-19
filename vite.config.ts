import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VT_");
  return {
    define: {
      plugins: [react()],
      "process.env.VT_REACT_APP_SUPABASE_URL": JSON.stringify(
        env.VT_REACT_APP_SUPABASE_URL
      ),
      "process.env.VT_REACT_APP_SUPABASE_KEY": JSON.stringify(
        env.VT_REACT_APP_SUPABASE_KEY
      ),
    },
  };
});
