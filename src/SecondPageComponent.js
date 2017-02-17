import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import CartPageComponent from './CartPageComponent';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Body, Left, Right, Thumbnail, Picker, Button, Text } from 'native-base';

export default class SecondPageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {amount: 1, gg: 0, product: props.product};
    }

    _addToCart() {
        this.state.product.amount = this.state.amount;
        this.props.dispatch({type: 'ADD_TO_CARTS', cart: this.state.product});
        Actions.FirstPage({type: ActionConst.RESET});
    }

    _toCartPage() {
        Actions.CartPage();
    }

    render() {
        return (
            <Container>
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{this.state.product.title}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={{justifyContent: 'center'}}>
                        <Image source={{uri: this.state.product.image}} style={{width: 80, height: 80}} />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={{flex: 1}}>選擇數量</Text>
                            <Picker style={{flex: 1}}
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
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Button transparent onPress={this._addToCart.bind(this)}>
                                <Text>加入購物車</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
            </Container>
        );
    }
}