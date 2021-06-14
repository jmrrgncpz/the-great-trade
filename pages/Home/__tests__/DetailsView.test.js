import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "../../../custom-theme.json";
import { default as mapping } from "../../../mapping.json";
import DetailsView from "../DetailsView";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

describe("DetailsView", () => {
  it("renders next button disabled ", () => {
    const onNextPressedMock = jest.fn();

    const { getByPlaceholderText, getByText, getByA11yLabel } = render(
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

    fireEvent.changeText(getByPlaceholderText('Name'), 'IPHONE10');
    fireEvent.press(getByA11yLabel('next button'));

    expect(onNextPressedMock).not.toHaveBeenCalled();
  });
});
