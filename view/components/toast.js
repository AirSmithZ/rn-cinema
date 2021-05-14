import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Easing,
  Dimensions,
  Text,
  Animated
} from 'react-native';
import PropTypes from 'prop-types';
const {width, height} = Dimensions.get("window");
const viewHeight = 35;
let moveAnim = new Animated.Value(height / 12),
opacityAnim = new Animated.Value(0)
class ToastView extends Component {
  // static propTypes = {
  //   message:PropTypes.string,
  //   time:props.time && props.time < 1500 ? Toast.SHORT : Toast.LONG
  // };
  // dismissHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      message: props.message !== undefined ? props.message : ''
    }
  }

  render() {
    return (
      <View style={[styles.container,{bottom: 300, opacity: 0.5}]}>
        <View style={[styles.textContainer]}><Text
          style={styles.defaultText}>{this.state.message}</Text></View>
      </View>
    )
  }
//   componentDidMount() {
//     this.timingDismiss()
//   }
  //   componentWillReceiveProps(nextProps) {
  //       this.setState({
  //           message: nextProps.message !== undefined ? nextProps.message : '',
  //           time: nextProps.time && nextProps.time < 1500 ? Toast.SHORT : Toast.LONG,
  //       })
  //       clearTimeout(this.dismissHandler)
  //       this.timingDismiss()
  //  }
  // componentDidMount() {
  //   Animated.timing(
  //     this.moveAnim,
  //     {
  //       toValue: height / 8,
  //       duration: 80,
  //       easing: Easing.ease
  //     },
  //   ).start(this.timingDismiss);
  //   Animated.timing(
  //     this.opacityAnim,
  //     {
  //       toValue: 1,
  //       duration: 100,
  //       easing: Easing.linear
  //     },
  //   ).start();
  // }
  // componentWillUnmount() {
  //   clearTimeout(this.dismissHandler)
  // }


  // timingDismiss = () => {
  //   this.dismissHandler = setTimeout(() => {
  //     this.onDismiss()
  //   }, 1000)
  // };

  // onDismiss = () => {
  //   if (this.props.onDismiss) {
  //     this.props.onDismiss()
  //   }
  // }
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    padding: 10,
    bottom:height/8,
    maxWidth: width / 2,
    alignSelf: "flex-end",
  },
  defaultText: {
    color: "#FFF",
    fontSize: 15,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  }
});
export default ToastView