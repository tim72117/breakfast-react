import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { MKColor } from 'react-native-material-kit';
import { Container, Content, Card, CardItem, Left, Right, Body, Footer, List, Button } from 'native-base';

class CartPageComponent extends Component {

    constructor(props) {
        const { carts } = props;
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(carts);
        this.state = {carts: carts};
    }

    _removeCart() {
    }

    _renderRow(product) {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{product.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody style={{justifyContent: 'center'}}>
                    <Image source={{uri: product.image}} style={{width: 80, height: 80}} />
                </CardItem>
                <CardItem>
                    <Text>X{product.amount}</Text>
                    <Right>
                        <Button transparent onPress={this._removeCart.bind(this)}>
                            <Text>移除</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }

    _order() {
        const { carts } = this.props;

        fetch('http://104.199.155.0:82/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: carts
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.props.dispatch({type: 'REMOVE_ALL_CARTS'});
            this.setState({listRows: this.ds.cloneWithRows([])});
            //console.error(responseJson);
        })
        .catch((error) => {
            //console.error(error);
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <List style={{flex: 1}} dataArray={this.state.carts} renderRow={this._renderRow.bind(this)} />
                </Content>
                <Button block={true} onPress={this._order.bind(this)} success><Text>結帳</Text></Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    row: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: MKColor.Red,
    }
});

export default connect(store => store)(CartPageComponent);