import { type ReactNode } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { Toaster } from "~/components/ui/sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error && query?.meta?.errorMessage) {
        toast.error(query?.meta?.errorMessage);
      }
    },
  }),
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      {children}
    </QueryClientProvider>
  );
}
