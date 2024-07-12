import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

const customRender = (ui, options) =>
  render(ui, { wrapper: SessionProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

