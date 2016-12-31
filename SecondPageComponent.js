import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    Picker,
    Button,
    TouchableHighlight
} from 'react-native';
import CartPageComponent from './CartPageComponent';

export default class SecondPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {amount: 1, gg: 0, product: props.product};
    }

    _addToCart() {
        this.setState({gg: this.state.amount});
    }

    _cartPage() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: '購物車',
                component: CartPageComponent,
                params: {
                    amount: 2
                }
            })
        }
    }

    render() {
        return (
            <View>
                <Text>{this.state.product.title}</Text>
                <Text>選擇數量{this.state.gg}</Text>
                <Picker
                selectedValue={this.state.amount}
                onValueChange={(amount) => this.setState({amount: amount})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
                <Button
                onPress={this._addToCart.bind(this)}
                title="加入購物車"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
                <TouchableHighlight onPress={this._cartPage.bind(this)}><Text>購物車</Text></TouchableHighlight>
            </View>
        );
    }
}