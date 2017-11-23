const React = require('react-native');

const {StyleSheet, Dimensions} = React;

const device_size = Dimensions.get('window');

const CIRCLE_RADIUS = 36;

export default {
    container: {
        backgroundColor: '#FBFAFA',
    },
    shadow: {
        flex: 1,
        width: null,
        height: null,
    },
    bg: {
        flex: 1,
        marginTop: device_size.height / 1.75,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        bottom: 0,
    },
    row: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 15,
        alignItems: 'center',
    },
    mt: {
        marginTop: 18,
    },
    mainContainer: {
        flex: 1
    },
    dropZone: {
        height: 70,
        backgroundColor: '#2c3e50'
    },
    topText: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        color: '#fff'
    },
    draggableContainer: {
        position: 'absolute',
        top: 70,
        left: 0,
        width: device_size.width
    }
};
