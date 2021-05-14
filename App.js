/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   useColorScheme
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {
//   Colors
// } from 'react-native/Libraries/NewAppScreen';
// import NavTest from './view/nav'
// import Navigation from './view/Navigation'
// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <NavigationContainer>
//       <Navigation/>
//     </NavigationContainer>
//   );
// };


// export default App;
// In App.js in a new project

// import * as React from 'react';
import React,{useReducer} from 'react'
import { View, Text ,Image,StyleSheet,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Mine from './view/Mine'
import Film from './view/Film'
import DetailPage from './view/pages/details'
import WatchPage from './view/pages/watchPage'
import SearchPage from './view/pages/search'
import WatchHistory from './view/pages/watchhistory'
// import Ionicons from 'react-native-vector-icons/Ionicons';
function BottomTab(){
  const Tab = createBottomTabNavigator();
  return (
        <Tab.Navigator
        headerMode='none' 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Mine') {
              return <Image
              source={require('./view/assets/image/home.png')}
              style={styles.icon}
            />
            } else if (route.name === 'Film') {
              return (
                <Image
                source={require('./view/assets/image/film.png')}
                style={styles.icon}
                />
              );
            }
            
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
        <Tab.Screen name="Film" component={Film} />
        <Tab.Screen name="Mine" component={Mine} />
      </Tab.Navigator>
  )
  
}
function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen 
          name="Air影院" 
          component={ Film }
          options={{ 
            headerTitle: props => <Text></Text>
          }}
        />
        <Stack.Screen 
          name="Detail" 
          component={ DetailPage }
          options={({ route }) => {
            // console.log(route,'route')
            return { 
              title: route.params.movieItem.vod_name,
              headerBackTitle: '返回'
            }
          }} 
          // options={{ 
          //   headerTitle: route => {
          //     console.log(route,'route')
          //     return { title: route.params.movieItem.vod_name }
          //   },
          //   headerBackTitle: '返回'
          // }}
        />
        <Stack.Screen 
          name="SearchPage" 
          component={ SearchPage }
          // options={({ route }) => {
          //   // console.log(route,'route')
          //   return { title: route.params.titleName }
          // }} 
          options={{ 
            headerTitle: route => {
              // console.log(route,'route')
              return <Text>搜索资源</Text>
            },
            headerBackTitle: '返回'
            
          }}
          
        />
        <Stack.Screen 
          name="WatchPage" 
          component={ WatchPage }
          options={({ route }) => {
            // console.log(route,'route')
            return { 
                      title: route.params.titleName,
                      headerBackTitle: '返回'
                   }
          }} 
        />
        <Stack.Screen 
          name="WatchHistory" 
          component={ WatchHistory }
          options={({ route }) => {
            // console.log(route,'route')
            return { 
                      title: '观看历史',
                      headerBackTitle: '返回'
                   }
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  icon:{
    width:27,
    height:27
  }
})
export default App;