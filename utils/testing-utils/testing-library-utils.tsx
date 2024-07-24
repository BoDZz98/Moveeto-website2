import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import React, { ReactElement } from "react";
import { MovieDetailsCtx } from "../movie-details-ctx";

// If we have more than 1 provider
// const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <SessionProvider>
//       <MovieDetailsCtx.Provider value={{ movieData: movie }}>
//         {children}
//       </MovieDetailsCtx.Provider>
//     </SessionProvider>
//   );
// };

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: SessionProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
