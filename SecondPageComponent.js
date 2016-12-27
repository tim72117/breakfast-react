import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    Picker
} from 'react-native';

export default class SecondPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {amount: 1};
    }

    render() {
        return (
            <View>
                <Text>選擇數量</Text>
                <Picker
                selectedValue={this.state.amount}
                onValueChange={(lang) => this.setState({language: lang})}>
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
            </View>
        );
    }
}