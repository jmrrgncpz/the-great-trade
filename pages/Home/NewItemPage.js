import React, { useState } from "react";
import {
  IndexPath,
  Layout,
  Text,
  Button,
  Select,
  SelectItem,
  Input,
} from "@ui-kitten/components";
import { Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const categories = [
    'Home',
    'Technology',
    'Health'
]

const NewItemPage = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const selectedCategoryValue = categories[selectedCategoryIndex.row]

  const [selectedCondition, setSelectedCondition] = useState("New");
  const descriptionInputState = useInputState(
    "Lorem asdkjf hajskdlh fasdfa sdkfuhj asdkjfh asdkjfh askljdfh alskjdhf lasdhjf claksjdhf askjdf hasdjkh fklasd hfkljasdhfljhasld fkjasdhf asdklfhj alskdjhf klasdhf alskdjfh "
  );

  return (
    <Layout style={{ display: 'flex', flex: 1 }}>
      {/* <Image resizeMode="cover" source={require('../assets/images/ben-kolde-xdLXPic3Wfk-unsplash.jpg')} style={{ flex: 1, width: 400, alignSelf:'center' }} /> */}
      <ScrollView style={{ flex: 1, padding: 25 }}>
        <Text category="h1" style={{ marginBottom: 24 }}>
          iPhone X
        </Text>

        <Layout style={{ marginBottom: 24 }}>
          <Text category="h6" style={{ marginBottom: 12 }}>
            Category
          </Text>
          <Select
            selectedIndex={selectedCategoryIndex}
            value={selectedCategoryValue}
            onSelect={(index) => setSelectedCategoryIndex(index)}
          >
              {categories.map((title) => <SelectItem title={title} />)}
          </Select>
        </Layout>

        <Layout style={{ marginBottom: 24 }}>
          <Text category="h6" style={{ marginBottom: 12 }}>
            Condition
          </Text>
          <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Button
              style={styles.conditionButton}
              appearance={selectedCondition == "New" ? "filled" : "outline"}
              onPress={() => setSelectedCondition("New")}
            >
              New
            </Button>
            <Button
              style={styles.conditionButton}
              appearance={selectedCondition == "LikeNew" ? "filled" : "outline"}
              onPress={() => setSelectedCondition("LikeNew")}
            >
              Like New
            </Button>
            <Button
              style={styles.conditionButton}
              appearance={selectedCondition == "Good" ? "filled" : "outline"}
              onPress={() => setSelectedCondition("Good")}
            >
              Good
            </Button>
          </Layout>
        </Layout>

        <Layout style={{ marginBottom: 24 }}>
          <Text category="h6" style={{ marginBottom: 12 }}>
            Description
          </Text>
          <Input
            multiline={true}
            {...descriptionInputState}
          />
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const CloseIcon = () => (
  <Image
    style={{ width: 24, height: 24 }}
    // source={require("../assets/icons/close-outline.png")}
  />
);
const SubmitButton = () => <Button appearance="ghost">Submit</Button>;
const HeaderOptions = {
  title: "New Item",
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  headerBackImage: CloseIcon
};

export { NewItemPage, HeaderOptions };

const styles = StyleSheet.create({
  conditionButton: {
    flex: 1,
  },
});
