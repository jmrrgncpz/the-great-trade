import React, { useState, useCallback } from "react";
import {
  Layout,
  Icon,
  ViewPager,
  Button,
  ButtonGroup,
} from "@ui-kitten/components";
import { View } from "react-native";
import NewItemContext from "./new-item-context";
import useKeyboardBehavior from "../../../custom-hooks/view-keyboard-behavior";

// Pages
import ConditionSelectionView from "./ConditionSelectionView";
import DetailsView from "./DetailsView";
import AdditionalInfoView from "./AdditionalInfoView";
import NewItemImagesView from "./PhotoSelectorView";
import SummaryView from "./SummaryView";

const initialState = {
  condition: "",
  category: "",
  name: "",
  description: "",
  tags: [],
  preferredItems: [],
  images: [],
};

const NewItemPage = () => {
  const [newItem, setNewItem] = useState(initialState);
  const setItemState = useCallback(
    (item) => {
      setNewItem({
        ...newItem,
        ...item,
      });
    },
    [newItem]
  );

  useKeyboardBehavior(
    () => setIsNavigationVisible(false),
    () => setIsNavigationVisible(true)
  );

  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  return (
    <NewItemContext.Provider value={setItemState}>
      <Layout level="2" style={{ flex: 1 }}>
        <ViewPager
          swipeEnabled={false}
          style={{ flex: 1 }}
          selectedIndex={currentPageIndex}
          onSelect={(index) => setCurrentPageIndex(index)}
        >
          <ConditionSelectionView condition={newItem.condition} />
          <DetailsView
            name={newItem.name}
            description={newItem.description}
            category={newItem.selectedCategory}
          />
          <AdditionalInfoView
            tags={newItem.tags}
            preferredItems={newItem.preferredItems}
          />
          <NewItemImagesView images={newItem.images} />
          <SummaryView {...newItem} />
        </ViewPager>
        {isNavigationVisible ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {currentPageIndex == 0 ? null : (
              <Button
                appearance="ghost"
                  size='giant'
                  onPress={() => setCurrentPageIndex(currentPageIndex - 1)}
                accessoryLeft={(props) => (
                  <Icon {...props} name="chevron-left-outline"></Icon>
                )}
              >
                Previous
              </Button>
            )}

            {
              // is summary page open
              currentPageIndex == 4 ? (
                <Button
                  appearance="ghost"
                  status="success"
                  size='giant'
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
                  size='giant'
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
      </Layout>
    </NewItemContext.Provider>
  );
};

export default NewItemPage;
