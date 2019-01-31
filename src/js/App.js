import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { headerStyles } from './theme/headerStyles';

import HomeScreen from './screens/HomeScreen';
import FormTestScreen from './screens/FormTestScreen';

const AppNavigator = createStackNavigator({
    "Home": HomeScreen,
    "FormTestScreen": FormTestScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: headerStyles
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component{
  render() {
    return <AppContainer/>;
  }
}

export default App;