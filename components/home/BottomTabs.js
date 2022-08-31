import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { bottomTabsIcons } from "../../data/bottomTabsIcons";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function BottomTabs() {
  const [active, setActive] = useState("Home");
  const navigation = useNavigation()

  const handleIconPress = (item) => {
    setActive(item.name)
    return item?.screen && navigation.navigate(item.screen)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bottomTabsIcons}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        horizontal
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>handleIconPress(item)} key={item.id}>
            <Icon
              style={styles.icon}
              type={
                active === item.name ? item.Active.type : item.Inactive.type
              }
              name={
                active === item.name ? item.Active.name : item.Inactive.name
              }
              color="white"
              size={40}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    zIndex: 10,
  },
  icon: {
    color: "white",
  },
});
