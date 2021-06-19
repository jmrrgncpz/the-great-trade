import {
  Layout,
  Text,
  Button,
  ButtonGroup,
  StyleService,
  useTheme,
  Icon,
} from "@ui-kitten/components";
import React, { useState } from "react";
import FloatingMonitor from "../../../components/floating-monitor";

const ConditionSelectionView = ({ navigation, route }) => {
  const theme = useTheme();
  const conditions = [
    {
      text: "New",
      status: "success",
      value: 0,
    },
    {
      text: "Used - Like New",
      status: "info",
      value: 1,
    },
    {
      text: "Used - Good",
      status: "warning",
      value: 2,
    },
    {
      text: "Used - Fair",
      status: "danger",
      value: 3,
    },
  ];
  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);

  return (
    <Layout level="2" style={{ display: "flex", flex: 1, padding: 25 }}>
      <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
        <FloatingMonitor
          style={{ transform: [{ scale: 1.5 }, { translateX: 25 }] }}
        />
      </Layout>
      <Layout
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "transparent",
          marginBottom: 24,
        }}
      >
        <Text category="h1" style={{ fontSize: 36, marginBottom: 24 }}>
          Condition
        </Text>
        <Layout
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "space-between",
          }}
        >
          {conditions.map(({ text, status, value }) => {
            const isConditionSelected = value == selectedCondition.value;

            return (
              <Button
                key={`btn-${text}`}
                style={{
                  borderRadius: 12,
                  elevation: isConditionSelected ? 3 : 0,
                  borderWidth: 0,
                  backgroundColor: isConditionSelected
                    ? theme[`color-${status}-200`]
                    : "transparent",
                }}
                onPress={() => setSelectedCondition(conditions[value])}
              >
                <Text
                  style={{
                    color: isConditionSelected
                      ? theme[`color-${status}-700`]
                      : theme[`color-primary-default`],
                    fontSize: isConditionSelected ? 20 : 16,
                  }}
                >
                  {text}
                </Text>
              </Button>
            );
          })}
        </Layout>
      </Layout>

      <Button
        style={{ marginTop: "auto" }}
        size="giant"
        onPress={() => navigation.navigate("DetailsView", { ...route.params, condition: selectedCondition })}
        accessoryRight={(props) => (
          <Icon {...props} name="chevron-right-outline"></Icon>
        )}
      >
        Next
      </Button>
    </Layout>
  );
};

export default ConditionSelectionView;
