import React, { Component } from 'react';
import { Left } from 'native-base';
import { Text } from 'react-native';

export default class TotalBar extends Component {

    constructor(props) {
        super(props);
        this.state = {total: 0};
    }

    render() {
        return (
            <Left style={{marginLeft: 10}}>
                <Text style={{fontSize: 16}}>總計{this.state.total}元</Text>
            </Left>
        )
    }

}