import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "../../../custom-theme.json";
import { default as mapping } from "../../../mapping.json";
import DetailsView from "../DetailsView";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

describe("DetailsView", () => {
  let detailsView;
  let onNextPressedMock;
  
  beforeEach(() => {
    onNextPressedMock = jest.fn();
    detailsView = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...theme }}
          customMapping={mapping}
        >
          <DetailsView onNextPressed={onNextPressedMock} />
        </ApplicationProvider>
      </>
    );
  });

  describe("Next Button", () => {
    it("renders disabled when not enough details are given", () => {
      fireEvent.changeText(detailsView.getByPlaceholderText("Name"), "IPHONE10");
      fireEvent.press(detailsView.getByA11yLabel("next button"));

      expect(onNextPressedMock).not.toHaveBeenCalled();
    });

    it("renders enabled when enough details are given", () => {
      fireEvent.changeText(detailsView.getByPlaceholderText("Name"), "IPHONE10");
      fireEvent.changeText(detailsView.getByA11yLabel("item description input"), "This a description that exceeds 5 characters.")

      fireEvent.press(detailsView.getByA11yLabel("next button"));

      expect(onNextPressedMock).toHaveBeenCalled();
    })

    it("renders disabled when description character count is below 5", () => {
      fireEvent.changeText(detailsView.getByPlaceholderText("Name"), "IPHONE10");
      fireEvent.changeText(detailsView.getByA11yLabel("item description input"), "1234")

      fireEvent.press(detailsView.getByA11yLabel("next button"));

      expect(onNextPressedMock).not.toHaveBeenCalled();
    })
  });
});
