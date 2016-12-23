import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    ListView,
    Navigator
} from 'react-native';

class Foreacast extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {showText: true, listRows: ds.cloneWithRows([{}])};
        setInterval(() => {
            this.setState({ showText: !this.state.showText });
        }, 1000);
    }

    _renderRow(product) {
        return <Text style={styles.row}>{product.title}</Text>;
    }

    componentDidMount() {
        fetch('http://104.199.155.0/products')
        .then((response) => response.json())
        .then((responseJSON) => {
            var index = 0;
            responseJSON.products.forEach(function(product) {
                product.index = index;
                index++;
            }, this);
            console.log(responseJSON);
            this.setState({listRows: this.state.listRows.cloneWithRows(responseJSON.products)});
        });
    }

    _onPressButton() {
        console.log(this.props.name);


        this.setState({ showText: this.state.showText });
        console.log("You tapped the button!");
    }
    render() {
        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];
        let display = this.state.showText ? 'ggg' : ' ';
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) =>
                            {
                                if (route.index === 0) {
                                return null;
                                } else {
                                return (
                                    <TouchableHighlight onPress={() => navigator.pop()}>
                                    <Text>Back</Text>
                                    </TouchableHighlight>
                                );
                                }
                            },
                            RightButton: (route, navigator, index, navState) =>
                            { return (<Text>Done</Text>); },
                            Title: (route, navigator, index, navState) =>
                            { return (<Text>Awesome Nav Bar</Text>); },
                        }}
                        style={{backgroundColor: 'gray'}}
                    />
                }
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) =>
                    <ListView style={styles.list} dataSource={this.state.listRows} renderRow={this._renderRow} />
                    // <TouchableHighlight onPress={() => {
                    //     if (route.index === 0) {
                    //         navigator.push(routes[1]);
                    //     } else {
                    //         navigator.pop();
                    //     }
                    // }}>
                    //     <Text>Hello {route.title}!</Text>
                    // </TouchableHighlight>
                }
                style={{padding: 100, flex: 1}}
            />
            // <View style={styles.parent}>
            // <ListView style={styles.list} dataSource={this.state.listRows} renderRow={this._renderRow} />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
    },
    list: {
        flex: 1
    },
    row: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    }
});

module.exports = Foreacast;