import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import NewPostScreen from "../screens/NewPostScreen";
import ReelsScreen from "../screens/ReelsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ActivityScreen from "../screens/ActivityScreen";
import NewPostFormScreen from "../screens/NewPostFormScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MainStack} />
      <Stack.Screen name="NewPost" component={NewPostScreen} />
      <Stack.Screen name="NewPostForm" component={NewPostFormScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)


export const MainStack = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size, color }) => {
        let iconName;
        let typeName;
        if (route.name === "HomeScreen") {
          typeName = "ionicon";
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Reels") {
          typeName = "font-awesome-5";
          iconName = focused ? "mobile" : "mobile-alt";
        } else if (route.name === "Search") {
          typeName = "ionicon";
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Profile") {
          typeName = "font-awesome";
          iconName = focused ? "user-circle" : "user-circle-o";
        } else if (route.name === "Activity") {
          typeName = "antdesign";
          iconName = focused ? "heart" : "hearto";
        }
        // You can return any component that you like here!
        return (
          <Icon type={typeName} name={iconName} size={30} color="white" />
        );
      },
      headerShown: false,
      tabBarShowLabel: false,
      detachInactiveScreens: false,
      tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0.3, borderTopColor: 'gray' },
      detachInactiveScreens: true,
    })}
  >
    <Tab.Screen name="HomeScreen" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Reels" component={ReelsScreen} options={{ unmountOnBlur: true }} />
    <Tab.Screen name="Activity" component={ActivityScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
