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
            // create an instance of Animated.ValueXY, whcih will take care of interpolating X and Y values
            pan: new Animated.ValueXY(),
            showDraggable: true,
            dropZoneValues: null
        };
        // PanResponder, which is responsible for doing the dragging, sets the handlers when the user moves and releases the element
        // Animated.spring method runs the animation
        // first parameter (i.e. this.state.pan) accepts the animation values
        // second parameter (i.e. {toValue:{x:0,y:0}}) is a configuration object that defines the toValue, which is the origin coordinates
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { //the handler will trigger when the element is moving
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropZone(gesture)) { //Step 1
                    this.setState({
                        showDraggable: false //Step 3
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

    renderDraggable() {
        // renders green circle based on showDraggable value
        if (this.state.showDraggable) {
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout()]}>
                        <Image source={norwadian} style={styles.shadow}>
                            <View style={styles.bg}>
                            </View>
                        </Image>
                    </Animated.View>
                </View>
            );
        }
    }

    render() {
        console.log(DrawNav, "786785786");
        return (
            <Container style={styles.container}>
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
                            onPress={() => DrawerNav.navigate("DrawerOpen")}
                        >
                            <Icon active name="menu"/>
                        </Button>
                    </Right>
                </Header>
                <Content>

                    <View style={styles.mainContainer}>
                        <View
                            onLayout={this.setDropZoneValues.bind(this)}
                            style={styles.dropZone}>
                            <Text style={styles.topText}>Drop me here!</Text>
                        </View>

                        {this.renderDraggable()}
                    </View>

                    {/*<Grid style={styles.mt}>*/}
                        {/*{this.props.list.map((item, i) => (*/}
                            {/*<Row key={i}>*/}
                                {/*<TouchableOpacity*/}
                                    {/*style={styles.row}*/}
                                    {/*onPress={() =>*/}
                                        {/*this.props.navigation.navigate("BlankPage", {*/}
                                            {/*name: {item}*/}
                                        {/*})}*/}
                                {/*>*/}
                                    {/*<Text style={styles.text}>{item}</Text>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</Row>*/}
                        {/*))}*/}
                    {/*</Grid>*/}
                </Content>
            </Container>
        );
    }
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
