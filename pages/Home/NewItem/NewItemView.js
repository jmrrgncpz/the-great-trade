import React, { useState, useCallback, useContext } from "react";
import {
  Layout,
  Icon,
  ViewPager,
  Button,
  ButtonGroup,
} from "@ui-kitten/components";
import { Alert, BackHandler, View } from "react-native";
import NewItemContext from "./new-item-context";
import useKeyboardBehavior from "../../../custom-hooks/view-keyboard-behavior";

// Pages
import ConditionSelectionView from "./ConditionSelectionView";
import DetailsView from "./DetailsView";
import AdditionalInfoView from "./AdditionalInfoView";
import PhotoSelectorView from "./PhotoSelectorView";
import SummaryView from "./SummaryView";
import { useEffect } from "react/cjs/react.development";

const initialState = {
  condition: null,
  category: null,
  name: "",
  description: "",
  tags: [],
  preferredItems: [],
  images: [],
};

const NewItemView = ({ navigation }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [newItem, setNewItem] = useState(initialState);
  const [isDetailsComplete, setIsDetailsComplete] = useState(false);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();

        Alert.alert(
          "Discard New Item",
          "You're currently in a process of creating a new item. \n\n Your progress will not be saved.",
          [
            {
              text: "Cancel",
            },
            {
              text: "Discard Item",
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  );

  const setItemState = useCallback(
    (item) => {
      setNewItem({
        ...newItem,
        ...item,
      });
    },
    [newItem]
  );

  useEffect(() => {
    if (
      !newItem.name.length ||
      newItem.category == null ||
      newItem.description.length < 6
    ) {
      setIsDetailsComplete(false);
    } else {
      setIsDetailsComplete(true);
    }
  }, [newItem.name, newItem.category, newItem.description]);

  return (
    <NewItemContext.Provider
      value={{ setItemState, currentPageIndex, setCurrentPageIndex }}
    >
      <Layout level="2" style={{ flex: 1 }}>
        <ViewPager
          swipeEnabled={false}
          style={{ flex: 1 }}
          selectedIndex={currentPageIndex}
        >
          <Page
            component={ConditionSelectionView}
            isPreviousVisible={false}
            isNextEnabled={(() => newItem.condition != null)()}
            condition={newItem.condition}
          />
          <Page
            component={DetailsView}
            isNextEnabled={isDetailsComplete}
            name={newItem.name}
            description={newItem.description}
          />
          <Page
            component={AdditionalInfoView}
            isNextEnabled={true}
            tags={newItem.tags}
            preferredItems={newItem.preferredItems}
          />
          <Page
            component={PhotoSelectorView}
            isNextEnabled={newItem.images.length}
            images={newItem.images}
          />
          <Page
            component={SummaryView}
            isNextSubmit={true}
            isNextEnabled={true}
            {...newItem}
          />
        </ViewPager>
      </Layout>
    </NewItemContext.Provider>
  );
};

export default NewItemView;

const Page = ({
  component: Component,
  isPreviousVisible = true,
  isNextEnabled = false,
  isNextSubmit = false,
  ...rest
}) => {
  const { currentPageIndex, setCurrentPageIndex } = useContext(NewItemContext);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

  useKeyboardBehavior(
    () => setIsNavigationVisible(false),
    () => setIsNavigationVisible(true)
  );

  return (
    <View style={{ flex: 1 }}>
      <Component {...rest} />
      {isNavigationVisible ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {isPreviousVisible ? (
            <Button
              appearance="ghost"
              size="giant"
              onPress={() => setCurrentPageIndex(currentPageIndex - 1)}
              accessoryLeft={(props) => (
                <Icon {...props} name="chevron-left-outline"></Icon>
              )}
            >
              Previous
            </Button>
          ) : null}
          {
            // is summary page open
            isNextSubmit ? (
              <Button
                status="success"
                size="giant"
                disabled={!isNextEnabled}
                accessoryRight={(props) => (
                  <Icon {...props} name="checkmark-outline"></Icon>
                )}
              >
                Submit
              </Button>
            ) : (
              <Button
                style={{ marginLeft: "auto" }}
                appearance="ghost"
                disabled={!isNextEnabled}
                size="giant"
                onPress={() => setCurrentPageIndex(currentPageIndex + 1)}
                accessoryRight={(props) => (
                  <Icon {...props} name="chevron-right-outline"></Icon>
                )}
              >
                Next
              </Button>
            )
          }
        </View>
      ) : null}
    </View>
  );
};
