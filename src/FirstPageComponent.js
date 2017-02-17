import React, { Component, PropTypes  } from 'react';
import { createStore } from 'redux';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native';
import { MKButton, getTheme } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Icon, Left, Body, Right, ListItem, Thumbnail, Button } from 'native-base';

class FirstPageComponent extends Component {

    constructor(props) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {loading: true, listRows: ds};
    }

    _pressButton(product) {
        console.log(this.props);
        Actions.SecondPage({product: product});
    }

    _toCartPage() {
        Actions.CartPage();
    }

    _renderRow(product) {
        return <ListItem avatar icon onPress={this._pressButton.bind(this, product)}>
            <Left>
                <Thumbnail source={{uri: product.image}} />
            </Left>
            <Body style={{flex: 1}}>
                <Text>{product.title}</Text>
            </Body>
            <Right>
                <Icon name="md-arrow-dropright" />
                            {/*<Button title="View">
                                <Text>View</Text>
                            </Button>*/}
                {/*<TouchableHighlight style={styles.row} onPress={this._pressButton.bind(this, product)}>
                    <Text>選擇</Text>
                </TouchableHighlight>*/}
            </Right>
        </ListItem>
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
            return <View style={{flex: 1}}>
                <ListView style={styles.list} dataSource={this.state.listRows} renderRow={this._renderRow.bind(this)} />
            </View>
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