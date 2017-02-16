import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    ActivityIndicator,
    Button
} from 'react-native';
import { connect } from 'react-redux';

class CartPageComponent extends Component {

    constructor(props) {
        const { carts } = props;
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(carts);
        this.state = {listRows: this.ds.cloneWithRows(carts)};
    }

    _renderRow(product) {
        return <TouchableHighlight style={styles.row}><Text>{product.title}X{product.amount}</Text></TouchableHighlight>
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
            <View style={{flex: 1}}>
                <ListView style={styles.list} dataSource={this.state.listRows} renderRow={this._renderRow.bind(this)} enableEmptySections={true} />
                <Button
                onPress={this._order.bind(this)}
                title="結帳"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
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
        borderBottomColor: '#ededed',
    }
});

export default connect(store => store)(CartPageComponent);