import React from "react";
import renderer from "react-test-renderer";
import CategorySelectionView from "../CategorySelectionView";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "../../../custom-theme.json";
import { default as mapping } from "../../../mapping.json";
import { registerIcons } from "../../../fontawesome";

describe("CategorySelectionView", () => {
  beforeAll(() => {
    registerIcons();
  });

  it("renders correctly ", () => {
    const tree = renderer
      .create(
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...theme }}
          customMapping={mapping}
        >
          <CategorySelectionView />
        </ApplicationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
