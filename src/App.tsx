import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./api/base/api-client";
import { router } from "./app-router";

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <Suspense fallback="loading app">
      <Main />
    </Suspense>
  );
}
