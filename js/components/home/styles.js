
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

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
      marginTop: deviceHeight / 1.75,
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
};
