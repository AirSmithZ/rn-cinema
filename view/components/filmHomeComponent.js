import React, { useState,useEffect } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import Swiper from 'react-native-swiper';
// import Constants from "expo-constants";
import ListModel from '../utils/request'
// import { directToPage } from './utils/extension';
import MediaList from './mediaList'
import Loading from './loadingComponent'

const listModel = new ListModel()
export default Film = (props)=>{
  const { navigation } = props;
  const getdata = ()=>{
      let movieData = []
      listModel.getFilmDatas().then((res)=>{
          console.log(res,'getdata')
           movieData = res.filter(item=>{
               return (item.type_id > 4 && item.type_id < 13)
           })
          setmovieList(()=>[...movieData])
          setTeleplayList(()=>[...res])
      })
  }

  const [teleplayList,setTeleplayList] = useState([])
  const [movieList,setmovieList] = useState([])
  const [loadingState,setLoadingState] = useState(false)

  const onRefresh=()=> {
    try{
      //先修改刷新状态为true
      setLoadingState(true);
      console.log("开始新的刷新方法");
      setTimeout(async () => {
        //你的刷新逻辑
        await getdata()
        //逻辑执行完之后，修改刷新状态为false
        setLoadingState(false)
      }, 500);
    }catch(e){
      setLoadingState(false)
      console.error(e)
    }
  }
  useEffect( ()=>{
    teleplayList.length==0?onRefresh():null
  },[teleplayList])
  _header = function () {
      return (
        <Text style={{fontWeight: 'bold', fontSize: 20}}>搜索</Text>
      );
    }
  return (
    <View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
                {
                    loadingState&&teleplayList.length===0? <Loading/> : null
                }
              <View height={150}>
                  <Swiper 
                      style={styles.wrapper} 
                      showsButtons={true}
                      autoplay={true}               
                      autoplayTimeout={3}
                      showsButtons={false}  
                  >
                      <View style={styles.slide1}>
                          <Image source={require('../assets/image/homeBanner.jpeg')} style={styles.listImg}/>
                      </View>
                      <View style={styles.slide3}>
                          <Text style={styles.text}>And 广告位招租</Text>
                      </View>
                  </Swiper>
              </View>
              <MediaList teleplayList={teleplayList} showID={13} listName={'热播影视'} curState={'home'} navigation={navigation}/>
              <MediaList teleplayList={movieList} showID={'wu'} listName={'热播电影'} curState={'home'} navigation={navigation}/>
              <MediaList teleplayList={teleplayList} showID={3} listName={'热播综艺'} curState={'home'} navigation={navigation}/>
              <MediaList teleplayList={teleplayList} showID={4} listName={'热播动漫'} curState={'home'} navigation={navigation}/>
          </ScrollView>
      </View>
  )
}
const styles = StyleSheet.create({
  listImg:{
      width:'100%',
      height:'100%'
  },
  wpWrap:{
      textAlign:'center',
      fontSize:12,
      marginTop:5
  },
  imgWrap:{
      width:'100%',
      height:200,
      backgroundColor:'lightgreen'
  },
  innerSingleWrap:{
      margin:5,
      width:'100%',
  },
  singleWrap:{
      margin:5,
      width:'30%',
      shadowOpacity: 0.8, 
      shadowRadius: 6, 
      borderRadius:100
      // elevation: 10 
  },
  bmMvWrap:{
     flexDirection:'row',
     flexWrap:'wrap',
      justifyContent:'center',
      padding:5
  },
  mvOuterWrap:{
      marginTop:5,
      marginBottom:5,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      height:30,
      paddingLeft:15,
      paddingRight:20
  },
  tabLists:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:50,
      backgroundColor:'white',
      paddingHorizontal:20
  },
  icon:{
      width:27,
      height:27
    },
  contentContainer: {
      paddingVertical: 20,
    },
    headerWrap:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:60,
      backgroundColor:'white',
      paddingHorizontal:20
    },
    buttonContainer:{
      padding: 10
    },
    textStyle:{
      textAlign: 'center'
    },
  wrapper: {
      // height:100
  },
  slide1: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width:'100%',
      height:'100%'
  },
  slide2: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
  },
  slide3: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black'
  },
  text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
  }
});