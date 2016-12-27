import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    ListView,
    Navigator
} from 'react-native';
import FirstPageComponent from './FirstPageComponent';

class Foreacast extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: true};
        setInterval(() => {
            //this.setState({ showText: !this.state.showText });
        }, 1000);
    }

    _onPressButton() {
        console.log(this.props.name);
        this.setState({ showText: this.state.showText });
        console.log("You tapped the button!");
    }

    render() {
        let display = this.state.showText ? 'ggg' : ' ';
        let defaultName = '餐點';
        let defaultComponent = FirstPageComponent;
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
                                        <Text>返回</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) =>
                            {
                                return (<Text>Done</Text>);
                            },
                            Title: (route, navigator, index, navState) =>
                            {
                                return (<Text>{route.name}</Text>);
                            }
                        }}
                        style={{backgroundColor: 'gray', padding: 0}}
                    />
                }
                initialRoute={{name: defaultName, component: defaultComponent}}
                //initialRouteStack={routes}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return (
                        <View style={{flex: 1, paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
                            <Component {...route.params} navigator={navigator} />
                        </View>
                    )
                }}
                style={{padding: 1, flexDirection: 'row', flex: 1}}
            />
        );
    }
}

const styles = StyleSheet.create({

});

module.exports = Foreacast;