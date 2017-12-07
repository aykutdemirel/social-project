import React, {Component} from "react";
import {TouchableOpacity, Image, PanResponder, Animated} from "react-native";
import {connect} from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";

import {DrawerNavigator, NavigationActions} from "react-navigation";

const norwadian = require("../../../images/norwegiangirl15.jpg");

import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Body,
    View,
    Right
} from "native-base";

import {Grid, Row} from "react-native-easy-grid";

import {setIndex} from "../../actions/list";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";

class Home extends Component {

    static navigationOptions = {
        header: null
    };

    static propTypes = {
        name: React.PropTypes.string,
        setIndex: React.PropTypes.func,
        list: React.PropTypes.arrayOf(React.PropTypes.string),
        openDrawer: React.PropTypes.func
    };

    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }

    constructor(props) {
        super(props);

        this.state = {
            showDraggable: true,
            dropZoneValues: null,
            pan: new Animated.ValueXY()
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropZone(gesture)) {
                    this.setState({
                        showDraggable: false
                    });
                } else {
                    Animated.spring(
                        this.state.pan,
                        {toValue: {x: 0, y: 0}}
                    ).start();
                }
            }
        });
    }

    isDropZone(gesture) {
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    setDropZoneValues(event) {
        this.setState({
            dropZoneValues: event.nativeEvent.layout
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Left>

                        <Button
                            transparent
                            onPress={() => {
                                DrawerNav.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: "Home"})]
                                    })
                                );
                                DrawerNav.goBack();
                            }}
                        >
                            <Icon active name="power"/>
                        </Button>
                    </Left>

                    <Body>
                    <Title>Main Page</Title>
                    </Body>

                    <Right>
                        <Button
                            transparent
                            onPress={() => DrawerNav.navigate("DrawerOpen")}>
                            <Icon active name="menu"/>
                        </Button>
                    </Right>
                </Header>

                <View style={styles.mainContainer}>
                    <View
                        onLayout={this.setDropZoneValues.bind(this)}
                        style={styles.dropZone}>
                        <Text style={styles.topText}>Drop me here!</Text>
                    </View>

                    {this.renderDraggable()}
                </View>

            </View>

        );
    }

    renderDraggable() {
        if (this.state.showDraggable) {
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), styles.circle]}>
                        <Image source={norwadian} style={styles.shadow}>
                            <View style={styles.bg}>
                            </View>
                        </Image>
                    </Animated.View>
                </View>
            );
        }
    }

    // renderDraggable() {
    //     // renders green circle based on showDraggable value
    //     if (this.state.showDraggable) {
    //         return (
    //             <View style={styles.draggableContainer}>
    //
    //                 {/*<Animated.View*/}
    //                     {/*{...this.panResponder.panHandlers}*/}
    //                     {/*style={[this.state.pan.getLayout(), styles.circle]}>*/}
    //                     {/*<Text>Drag me!</Text>*/}
    //                 {/*</Animated.View>*/}
    //
    //                 <Animated.View
    //                     {...this.panResponder.panHandlers}
    //                     style={[this.state.pan.getLayout()]}>
    //                     <Image source={norwadian} style={styles.shadow}>
    //                         {/*<View style={styles.bg}>*/}
    //                         {/*</View>*/}
    //                     </Image>
    //                 </Animated.View>
    //
    //             </View>
    //         );
    //     }
    // }

}

function bindAction(dispatch) {
    return {
        setIndex: index => dispatch(setIndex(index)),
        openDrawer: () => dispatch(openDrawer())
    };
}

const mapStateToProps = state => ({
    name: state.user.name,
    list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
    {
        Home: {screen: HomeSwagger},
        BlankPage2: {screen: BlankPage2}
    },
    {
        contentComponent: props => <DrawBar {...props} />
    }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({navigation}) => {
    DrawerNav = navigation;
    return {
        header: null
    };
};

export default DrawNav;
