import { render, screen } from "@/utils/testing-utils/testing-library-utils";
import ActorImage from "../ActorImage";

describe("testing actor image component", () => {
  test("render actor image  component correctly", () => {
    const mockActor = {
      character: "Felonious Gru / Chet (voice)",
      name: "Steve Carell",
      profile_path: "/any_profile_path",
    };
    render(<ActorImage actor={mockActor} imgSize="h-56" />);

    // Checking data
    const actorImage = screen.getByRole("img", { name: /steve carell/i });
    const characterName = screen.getByText(/felonious gru \/ chet \(voice\)/i);
    const actorName = screen.getByText(/steve carell/i);

    expect(actorImage).toBeInTheDocument();
    expect(actorImage).toHaveClass('h-56')
    expect(characterName).toBeInTheDocument();
    expect(actorName).toBeInTheDocument();
  });
});
