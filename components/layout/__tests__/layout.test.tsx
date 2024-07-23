import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import Layout from "../layout";

//---------------------------------------------------------------------
describe("Testing layout", () => {
  test("Layout renders correctly", () => {
    render(
      <Layout>
        <h6>Any text</h6>
      </Layout>
    );
    // Make sure header is rendered
    const searchBox = screen.getByRole("searchbox");

    // Make sure sideBar is rendered
    const homeElement = screen.getByRole("heading", {
      name: /home/i,
    });

    // Make sure children is rendered
    const children = screen.getByRole("heading", {
      name: /any text/i,
      level: 6,
    });

    expect(searchBox).toBeInTheDocument();
    expect(homeElement).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });
});

// const push = vi.fn();
// render(
//   <AppRouterContextProviderMock router={{ push }}>
//     <Header />
//   </AppRouterContextProviderMock>,
//   { wrapper: SessionProvider }
// );
