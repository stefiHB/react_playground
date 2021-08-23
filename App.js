import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ChatListScreen from './src/screens/ChatListScreen';
import ChatDetailsScreen from './src/screens/ChatDetailsScreen';
import MissionCreateScreen from './src/screens/MissionCreateScreen.js';
import MissionListScreen from './src/screens/MissionListScreen.js';
import MissionFormScreen from './src/screens/MissionFormScreen.js';

import { Provider as BusReportProvider} from "./src/context/BusReportContext";



const bottomTabNavigator = createBottomTabNavigator({
  missionFlow: createStackNavigator({
    CreateMission: MissionCreateScreen,
    ViewMissions: MissionListScreen,
    CreateMissionForm: MissionFormScreen
  }),
  chatFlow: createStackNavigator({
    ViewChats: ChatListScreen,
    ViewChatDetails: ChatDetailsScreen
  })

});


const App = createAppContainer(bottomTabNavigator);

export default () => {
  return <BusReportProvider>
    <App />
  </BusReportProvider>
};



