import { ReactNode } from "react"; // 挺有意思的
import { AuthProvider } from "./auth-context";
import { QueryClientProvider, QueryClient } from "react-query";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
