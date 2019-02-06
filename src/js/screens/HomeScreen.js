import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Card, CardItem  } from 'native-base';

const platformName = Platform.select({
  ios: 'iOS',
  android: 'Android'
});

class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Home'
  };
  render() {
    return (
      <View testID="homeScreenContainerID" accessibilityLabel="homeScreenContainerID" style={styles.container}>
        {(Platform.OS === 'ios') ? (
          <Text testID="welcomeTextID" style={styles.welcome}>YTEST on {platformName}!</Text>
        ): (
          <Text accessibilityLabel="welcomeTextID" style={styles.welcome}>YTEST on {platformName}!</Text>
        )}
        <Container>
          <Content>
            <Card>
                <CardItem testID="formTestScreenButtonID" accessibilityLabel="formTestScreenButtonID" bordered button 
                    onPress={() => this.props.navigation.navigate('FormTestScreen')}>
                  <Text>Testing Forms</Text>
                </CardItem>
                <CardItem bordered button onPress={() => alert("To Be Implemented...")}>
                  <Text>Test 2</Text>
                </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navButton: {
    textAlign: 'center',
    color: 'blue',
    paddingLeft: 5,
    paddingRight: 5
  },
  navButtonContainer: {
    textAlign: 'center',
    color: 'blue',
  }
});

export default HomeScreen;