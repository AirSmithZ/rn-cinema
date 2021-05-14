import React, {Component,useEffect} from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';

class TitleComponent extends Component{
  state = {
    curVideoState:''
  }
  componentDidMount(){
    this.toggleIcon()
    // console.log(this.state.curVideoState)
  }
  render(){
    return(
      <View>
         {
          this.state.curVideoState == 'videoPlay'?<Image style={styles.icon} source={require('../assets/image/bofang.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoLoading'?<Image style={styles.icon} source={require('../assets/image/shuaxin.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoStop'?<Image style={styles.icon} source={require('../assets/image/tingzhi.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoSmallBox'?<Image style={styles.icon} source={require('../assets/image/zoomOut.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoAllBox'?<Image style={styles.icon} source={require('../assets/image/fullscreen2-fill.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoBack'?<Image style={styles.icon} source={require('../assets/image/arrowLeft-fill.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoBrightness'?<Image style={styles.icon} source={require('../assets/image/light.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoSound'?<Image style={styles.icon} source={require('../assets/image/shengyin.png')}/>:null
         }
         {
          this.state.curVideoState == 'videoNoSound'?<Image style={styles.icon} source={require('../assets/image/jinyin.png')}/>:null
         }
      </View>
    )
  }
  toggleIcon = ()=>{
    console.log(this.props.iconState,'this.props')
    this.setState({
      curVideoState:this.props.iconState
    })
  }
  
}
const styles = StyleSheet.create({
  icon:{
    width:20,
    height:20,
  }
})
export default TitleComponent