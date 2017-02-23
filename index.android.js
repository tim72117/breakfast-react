import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import MenuNavigator from './src/MenuNavigator';

class Breakfast extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MenuNavigator />
        );
    }
}

AppRegistry.registerComponent('breakfast_react', () => Breakfast);