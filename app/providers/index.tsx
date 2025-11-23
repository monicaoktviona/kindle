import { type ReactNode } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { toast } from "sonner";

import { Toaster } from "~/components/ui/sonner";

import Wrapper from "./Wrapper";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const msg = query?.meta?.errorMessage;
      if (error && msg !== undefined && msg !== null) {
        const text = typeof msg === "string" ? msg : JSON.stringify(msg);
        toast.error(text);
      }
    },
  }),
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter>
      <Wrapper>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-center" />
          {children}
        </QueryClientProvider>
      </Wrapper>
    </NuqsAdapter>
  );
}
