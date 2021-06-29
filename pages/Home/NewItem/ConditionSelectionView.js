import {
  Layout,
  Text,
  Button,
  useTheme,
} from "@ui-kitten/components";
import React, { useState, useContext } from "react";
import FloatingMonitor from "../../../components/floating-monitor";
import NewItemContext from "./new-item-context";

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

const ConditionSelectionView = ({ condition }) => {
  const setItemState = useContext(NewItemContext);
  const theme = useTheme();

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
            const isConditionSelected = value == condition.value;

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
                onPress={() => setItemState({ condition: { text, status, value} })}
              >
                <Text
                  style={{
                    fontWeight: isConditionSelected
                    ? '700'
                    : '500',
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
    </Layout>
  );
};

export default ConditionSelectionView;
