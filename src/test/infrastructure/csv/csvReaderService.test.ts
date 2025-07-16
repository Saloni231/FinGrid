import { handleCSVRead } from "../../../infrastructure/csv/csvReaderService";

describe("handleCSVRead", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("mocked CSV file"),
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches CSV correctly", async () => {
    await handleCSVRead();

    expect(fetch).toHaveBeenCalledWith("/ReactDataTest_Input.csv");
  });
});
