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
import SecondPageComponent from './SecondPageComponent';

export default class FirstPageComponent extends Component {
    constructor(props) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {loading: true, listRows: ds.cloneWithRows([{index: 0, title: 'gg'}])};
    }

    _pressButton() {
        console.log(1);
        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: '選擇數量',
                component: SecondPageComponent,
            })
        }
    }

    _renderRow(product) {
        return <TouchableHighlight onPress={this._pressButton.bind(this)}><Text>{product.title}</Text></TouchableHighlight>
    }

    componentDidMount() {
        fetch('http://104.199.155.0:82/products')
        .then((response) => response.json())
        .then((responseJSON) => {
            var index = 0;
            responseJSON.products.forEach(function(product) {
                product.index = index;
                index++;
            }, this);
            console.log(responseJSON);
            this.setState({listRows: this.state.listRows.cloneWithRows(responseJSON.products), loading: false});
        });
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator
                animating={this.state.loading}
                style={{flex: 1}}
                size={60}
            />
        } else {
            return <ListView style={styles.list} dataSource={this.state.listRows} renderRow={this._renderRow.bind(this)} />
        }
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    row: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    }
});