import "tailwindcss/tailwind.css";
import { AuthProvider } from "../hooks/useAuth";
import { Provider as SupabaseProvider } from "react-supabase";
import client from "../supabase";

function MyApp({ Component, pageProps }) {
  return (
    <SupabaseProvider value={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SupabaseProvider>
  );
}

export default MyApp;
