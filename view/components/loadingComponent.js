import React, {Component,useEffect} from 'react';
import {View,StyleSheet,Animated,Image,Easing} from 'react-native';

class LoadingComponent extends Component{
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
    this.state = {
    };
  }
  componentDidMount(){
    this.spin()
  }
  spin = () => {
    this.spinValue.setValue(0)
    Animated.timing(this.spinValue,{
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 800,
      useNativeDriver: true,
      easing: Easing.linear
   }).start(() => this.spin())
  }
  render(){ 
    const { user, pwd, fadeAnim} = this.state;
        //映射 0-1的值 映射 成 0 - 360 度  
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],//输入值
        outputRange: ['0deg', '360deg'] //输出值
      })
    return(
      <View style={styles.container}>
        <Animated.Image style={[styles.circle,{transform:[{rotate: spin }]}]} source={require('../assets/image/loading.png')}/>
      </View>
    )
  }
  
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'#00a0e4',
    zIndex:99,
  },
  circle:{
      position:'absolute',
      width: 50,
      height: 50,
      top:200
  },
  iconWrap:{
    position:'absolute',
    top: 200,
    left: 180,
    zIndex:99
  },
  icon:{
    width:50,
    height:50,
  }
})
export default LoadingComponent