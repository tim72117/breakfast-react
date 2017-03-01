import React, { Component } from 'react';
import { View,  StyleSheet, TouchableOpacity, Navigator } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';
import { Button, Text } from 'native-base';
import { MKColor } from 'react-native-material-kit';
import FirstPageComponent from './FirstPageComponent';
import SecondPageComponent from './SecondPageComponent';
import CartPageComponent from './CartPageComponent';

const RouterWithRedux = connect()(Router);
const store = createStore((state = {}, action = {}) => {
    switch(action.type) {
        case 'CARTS':
            return {...state, carts: action.carts};
        case 'ADD_TO_CARTS':
            return {...state, carts: [...state.carts, action.cart]};
        case 'REMOVE_ALL_CARTS':
            return {...state, carts: []};
        case 'REMOVE_PRODUCT':
            var i = state.carts.indexOf(action.product);
            state.carts.splice(i);
            console.log('carts');
            console.log(i);
            console.log(state.carts);
            console.log('end');
            return {...state, carts: []};
        default:
            return state;
    }
});

store.dispatch({type: 'CARTS', carts: []});

export default class MenuNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this._renderRightButton = this._renderRightButton.bind(this);
    }

    _renderRightButton() {
        return <TouchableOpacity onPress={this._toCartPage.bind(this)}><Text style={{fontSize: 16, color: 'white'}}>購物車</Text></TouchableOpacity>
    }

    _toCartPage() {
        console.log(1)
        Actions.CartPage();
    }

    render() {
        return (
            <Provider store={store}>
            <RouterWithRedux navigationBarStyle={styles.navBar} renderRightButton={this._renderRightButton} leftButtonIconStyle={{tintColor: 'white'}}>
                <Scene key="modal" component={Modal}>
                <Scene key="root">
                    <Scene style={styles.page} key="FirstPage" component={FirstPageComponent} title="餐點目錄" direction="leftToRight" />
                    <Scene style={styles.page} key="SecondPage" component={SecondPageComponent} title="選擇餐點" />
                    <Scene style={styles.page} key="CartPage" component={CartPageComponent} title="購物車" direction="leftToRight" />
                </Scene>
                </Scene>
            </RouterWithRedux>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
    },
    navBar: {
        backgroundColor: MKColor.Red
    }
});
