import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    Navigator,
    ActivityIndicator
} from 'react-native';

export default class CartPageComponent extends Component {
    constructor(props) {
        super(props);
        const { navigator, amount } = this.props;
        this.state = {amount: amount};
    }

    render() {
        return (
            <Text>{this.state.amount}</Text>
        )
    }
}