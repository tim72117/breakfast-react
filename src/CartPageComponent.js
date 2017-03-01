import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, FooterTab, Card, CardItem, Left, Right, Body, List, Button, Text } from 'native-base';
import { MKColor } from 'react-native-material-kit';

class CartPageComponent extends Component {

    constructor(props) {
        super(props);
        const { carts } = props;
        console.log(carts);
        this.state = {carts: carts};
        this._renderRow = this._renderRow.bind(this);
    }

    _removeCart(product) {
        this.props.dispatch({type: 'REMOVE_PRODUCT', product: product});
        this.setState({carts: []});
        //console.error(product);
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
                        <Button transparent onPress={this._removeCart.bind(this, product)}>
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
            this.setState({carts: []});
        })
        .catch((error) => {
            console.error(1);
        });
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <List dataArray={this.state.carts} renderRow={this._renderRow} />
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor: MKColor.Red}}>
                        <Button light full transparent onPress={this._order.bind(this)}>
                            <Text style={{fontSize: 14}}>結帳</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

});

export default connect(({store}) => ({store}))(CartPageComponent);