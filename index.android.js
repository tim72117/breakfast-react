/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput
} from 'react-native';
import MenuNavigator from './src/MenuNavigator';

export default class myReact extends Component {

    constructor(props) {
        super(props);
        this.state = {zip: '', name: 'gg'};
        //var ds = new ListView.DataSource({});
    }

    _handleTextChange(event) {
        this.setState({zip: event.nativeEvent.text});
    }

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

        return (
            <View style={styles.container}>
                <MenuNavigator name={this.state.name} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
});

AppRegistry.registerComponent('breakfast_react', () => myReact);
