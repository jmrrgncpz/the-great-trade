import {
  Layout,
  Text,
  Input,
  Select,
  SelectGroup,
  SelectItem,
  IndexPath,
  useTheme,
} from "@ui-kitten/components";
import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { categories } from "../../../common";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import NewItemContext from "./new-item-context";
const DetailsView = ({ name, description }) => {
  const { setItemState } = useContext(NewItemContext);
  const theme = useTheme();

  const [isNameHintVisible, setIsNameHintVisible] = useState(false);
  const [isDescriptionHintVisible, setIsDescriptionHintVisible] =
    useState(false);

  const [nameInputStatus, setNameInputStatus] = useState("default");
  const [descriptionStatus, setDescriptionStatus] = useState("default");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const onNameBlur = useCallback(
    () => {
      const isNameValid = name.length;
      setNameInputStatus(isNameValid ? "success" : "danger");
      setIsNameHintVisible(isNameValid ? false : true);
    },
    [name],
  ) ;

  const onDescriptionBlur = useCallback(
    () => {
      const isHintVisible = description.length < 5;
      setIsDescriptionHintVisible(isHintVisible);
      setDescriptionStatus(isHintVisible ? "danger" : "success");
    },
    [description],
  )

  const categoryDisplayValue = selectedIndex ?
    categories[selectedIndex.section].subcategories[selectedIndex.row]
    : null;

  useEffect(() => {
    setItemState({ category: categoryDisplayValue });
  }, [selectedIndex]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <ScrollView keyboarShoulPersistTaps="handle">
        <Layout level="2" style={{ flex: 1, padding: 25 }}>
          <Input
            accessibilityLabel="item name input"
            placeholder="Item name"
            value={name}
            onChangeText={(newItemName) => setItemState({ name: newItemName })}
            status={nameInputStatus}
            onBlur={onNameBlur}
            textStyle={{
              fontSize: 36,
              fontFamily: "Montserrat-SemiBold",
              marginLeft: -9,
              color: theme["color-info-default"],
            }}
            style={{
              borderWidth: 0,
              backgroundColor: "transparent",
              marginBottom: 24,
            }}
            caption={() => {
              return isNameHintVisible ? (
                <Text status="danger" category="c1" appearance="hint">
                  Input an appropriate name.
                </Text>
              ) : (
                <Text category="c1">
                  What is this called? What brand and model?
                </Text>
              );
            }}
          />

          <View style={{ marginBottom: 24 }}>
            <Text category="h3" style={{ marginBottom: 8 }}>
              Category
            </Text>
            <Select
              placeholder="Select one"
              selectedIndex={selectedIndex}
              value={ categoryDisplayValue && categoryDisplayValue.name}
              onSelect={(index) => setSelectedIndex(index)}
              size="large"
            >
              {categories.map((category) => (
                <SelectGroup title={category.name} key={`category-${category}`}>
                  {category.subcategories.map((subcategory) => (
                    <SelectItem
                      key={`subcategory-${subcategory}`}
                      accessoryLeft={(props) => (
                        <FontAwesomeIcon
                          color="rgb(2, 152, 239)"
                          icon={subcategory.icon}
                          size={24}
                          style={{ marginRight: 12 }}
                        />
                      )}
                      title={subcategory.name}
                      value={subcategory.name}
                    />
                  ))}
                </SelectGroup>
              ))}
            </Select>
          </View>

          <View id="description-input-field">
            <Text category="h3" style={{ marginBottom: 8 }}>
              Description
            </Text>
            <Input
              multiline={true}
              textStyle={{
                textAlignVertical: "top",
                minHeight: 120,
                paddingTop: 16,
              }}
              status={descriptionStatus}
              accessibilityLabel="item description input"
              placeholder="Provide more information about this item e.g. receipt date,
              warranty, issues/flaws, etc."
              value={description}
              onChangeText={(newItemDescription) =>
                setItemState({ description: newItemDescription })
              }
              caption={() => {
                return isDescriptionHintVisible ? (
                  <Text
                    status="danger"
                    appearance="hint"
                    category="c1"
                    style={{ marginTop: 8 }}
                  >
                    Tell us more about this item.
                  </Text>
                ) : null;
              }}
              onBlur={onDescriptionBlur}
            />
          </View>
        </Layout>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default DetailsView;
