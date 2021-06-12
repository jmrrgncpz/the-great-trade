import React from 'react';
import {
    Text,
    Layout,
    TopNavigation,
  } from "@ui-kitten/components";

const Explore = () => {
    return (
        <Layout level="4">
          <TopNavigation
            alignment="center"
            title={() => (
              <Text category="h1" style={{ fontSize: 16 }}>
                Explore
              </Text>
            )}
          />
        </Layout>
    )
}
export default Explore;