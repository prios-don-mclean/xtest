import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Icon, Button } from 'native-base';
class FormTestScreen extends Component {
  static navigationOptions = {
    tabBarTestID: 'formTestScreenbackButtonID',
    tabBarAccessibilityLabel: 'formTestScreenbackButtonID'
  };

  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        view: undefined
      }
    }

    this.onInputChange = this.onInputChange.bind(this)
  }
  onViewPickerChange(value) {
    this.setState({ form: {...this.state.form, view: value} })
  }
  onInputChange(formKey, value) {
    this.setState({ form: {...this.state.form, [formKey]: value} });
  }
  onSubmitForm() {
    alert( JSON.stringify(this.state.form) );
  }
  render() {
    return (
      <Container testID="formScreenContainerID" accessibilityLabel="formScreenContainerID">
        <Content>
          <Form>
            <Item floatingLabel>
              <Input testID="firstNameInputID" accessibilityLabel="firstNameInputID"
                onChangeText={(value) => this.onInputChange("firstName", value)} placeholder="First Name" />
            </Item>
            <Item floatingLabel>
              <Input testID="lastNameInputID" accessibilityLabel="lastNameInputID"
                 onChangeText={(value) => this.onInputChange("lastName", value)} placeholder="Last Name" />
            </Item>
            <Item floatingLabel>
              <Input testID="emailInputID" accessibilityLabel="emailInputID"
                onChangeText={(value) => this.onInputChange("email", value)} placeholder="Email" />
            </Item>
            <Item>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined, marginTop: 10, marginBottom: 10 }}
                placeholder="Select your View"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.form.view}
                onValueChange={this.onViewPickerChange.bind(this)}
              >
                <Picker.Item label="A View" value="a" />
                <Picker.Item label="B View" value="b" />
                <Picker.Item label="C View" value="c" />
                <Picker.Item label="D View" value="d" />
              </Picker>
            </Item>
          </Form>
          <Button testID="submitButtonID" accessibilityLabel="submitButtonID"
            onPress={this.onSubmitForm.bind(this)} style={styles.submitButton} dark>
            <Text style={styles.submitButtonText}>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: { 
    width: '90%', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    marginTop: 20, 
    paddingLeft: 20, 
    paddingRight: 20
  },
  submitButtonText: {
    color: 'white', 
    marginLeft: 'auto', 
    marginRight: 'auto'
  }
});

export default FormTestScreen;