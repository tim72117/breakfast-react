import React, { Component, PropTypes  } from 'react';
import { createStore } from 'redux';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Icon, Left, Body, Right, Thumbnail, Button, List, Content, Footer } from 'native-base';
import TotalBar from './TotalBar';
import { ListItem } from 'react-native-elements';

class FirstPageComponent extends Component {

    constructor(props) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {loading: false, products: [], refreshing: true};
        this._onRefresh();
    }

    _pressButton(product) {
        console.log(this.props);
        Actions.SecondPage({product: product});
    }

    _toCartPage() {
        Actions.CartPage();
    }

    _onRefresh() {
        fetch('http://104.199.155.0:82/products')
        .then((response) => response.json())
        .then((responseJSON) => {
            var index = 0;
            responseJSON.products.forEach(function(product) {
                product.index = index;
                index++;
            }, this);
            console.log(responseJSON);
            this.setState({products: responseJSON.products, refreshing: false});
        });

    }

    _renderRow(product) {
        return (
            <ListItem
                avatar={{uri: product.image ? product.image : 'http://104.199.155.0:82/images/128-128-661117d81dd8ad0fa59a79fda9ca6425-egg.png'}}
                avatarStyle={{width: 50, height: 50}}
                title={product.title}
                titleStyle={{fontSize: 18}}
                onPress={this._pressButton.bind(this, product)}
                containerStyle={{height: 80, justifyContent: 'center'}}>
            </ListItem>
        )
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator
                animating={this.state.loading}
                style={{flex: 1}}
                size={60}
            />
        } else {
            return (
                <Container>
                <List style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    dataArray={this.state.products} renderRow={this._renderRow.bind(this)}>
                </List>
                <Footer style={{backgroundColor: MKColor.Red, height: 40}}>
                    <TotalBar />
                </Footer>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    row: {
        borderBottomColor: '#ededed',
    }
});

export default connect(store => store)(FirstPageComponent);