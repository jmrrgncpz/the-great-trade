import { Layout, Text, Button, ButtonGroup } from "@ui-kitten/components";
import React from "react";
import FloatingMonitor from "../../components/floating-monitor";

const conditionButtons = [
  {
    text: "New",
    status: "success",
  },
  {
    text: "Used - Like New",
    status: "info",
  },
  {
    text: "Used - Good",
    status: "warning",
  },
  {
    text: "Used - Fair",
    status: "danger",
  },
];

const ConditionSelectionView = ({ navigation }) => {
  return (
    <Layout level="2" style={{ display: "flex", flex: 1, padding: 25 }}>
      <Layout style={{ flex: 1, backgroundColor: "transparent" }}>
        <FloatingMonitor
          style={{ transform: [{ scale: 1.5 }, { translateX: 25 }] }}
        />
      </Layout>
      <Layout
        style={{ display: "flex", flex: 1, backgroundColor: "transparent" }}
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
          {conditionButtons.map((condition) => (
            <Button
              key={`btn-${condition.text}`}
              size="giant"
              style={{
                  marginLeft: -26,
                  marginRight: -26
              }}
              status={condition.status}
              onPress={() => navigation.navigate("DetailsView")}
            >
              {condition.text}
            </Button>
          ))}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ConditionSelectionView;
