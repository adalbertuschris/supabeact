import { Suspense, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./api/base/api-client";
import { router } from "./app-router";
import { useAppDispatch } from "./core/hooks";
import { checkAuth } from "./features/auth/store/effects";

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Suspense fallback="loading app">
      <Main />
    </Suspense>
  );
}
