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
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { set } from 'react-native-reanimated';
import ListModel from '../utils/request'
import MediaList from './mediaList'
import Loading from './loadingComponent'
const listModel = new ListModel()
export default Film = (props)=>{
  const { navigation } = props;

  // console.log(props,'props---0',props.curState.state)
  const [curPage,setCurPage] = useState(1)
  const [changeState,setChangeState] = useState(false)
  const distinct = (arr,key)=>{
    const set = new Set()
    return arr.reduce((p,c)=>set.has(c[key])?p:(set.add(c[key]),[...p,c]),[])
  }
  const handleData =(data)=>{
    if(data){
      return data == '全部'? '':data
    }else{
      return ''
    }
  }
  const getdata = ()=>{
      let curYear = handleData(curTabYearAct)
      let curArea = handleData(curTabAreaAct)
      curArea = encodeURI(curArea)
      console.log(curArea,curYear)
      listModel.getFilmCategory(props.curState.state,curPage,9,curYear,curArea).then((res)=>{
          console.log('changeState',changeState,props.curState.state)
          if(changeState===props.curState.state){
            let arr = [...teleplayList]
            res&&res.map(item=>{
              arr.push(item)
            })
            setTeleplayList(()=>[...arr])
          }else{
            setTeleplayList(()=>[...res])
            setChangeState(props.curState.state)
          }
      }).catch(e=>console.log(e))
  }

  const catYearTabsState = [
      {id:1,year:'全部'},
      {id:10,year:'2021'},
      {id:2,year:'2020'},
      {id:3,year:'2019'},
      {id:4,year:'2018'},
      {id:5,year:'2017'},
      {id:6,year:'2016'},
      {id:7,year:'2015'},
      {id:8,year:'2014'},
      {id:9,year:'2013'}
  ]
  const catAreaTabsState = [
    {id:1,area:'全部'},
    {id:2,area:'大陆'},
    {id:3,area:'香港'},
    {id:4,area:'台湾'},
    {id:5,area:'美国'},
    {id:6,area:'法国'},
    {id:7,area:'英国'},
    {id:8,area:'日本'},
    {id:9,area:'韩国'},
    {id:10,area:'德国'},
    {id:11,area:'泰国'},
    {id:12,area:'印度'},
    {id:13,area:'意大利'},
    {id:14,area:'西班牙'},
    {id:15,area:'加拿大'},
    {id:16,area:'其他'},
]
  const [teleplayList,setTeleplayList] = useState([])
  const [loadingState,setLoadingState] = useState(false)
  const [catYearTabs,setCatYearTabs] = useState(catYearTabsState)
  const [catAreaTabs,setCatAreaTabs] = useState(catAreaTabsState)
  const [curTabYearAct,setCurTabAreaAct] = useState('全部')
  const [curTabAreaAct,setCurTabYearAct] = useState('全部')
  const onRefresh=()=> {
    try{
      //先修改刷新状态为true
      setLoadingState(true);
      console.log("开始新的刷新方法1");
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
    useEffect(()=>{
        setTeleplayList(()=>[])
        setCurPage(1)
        onRefresh()
    },[props.curState.state])
    useEffect(()=>{
        setTeleplayList(()=>[])
        setCurPage(1)
        onRefresh()
    },[curTabYearAct,curTabAreaAct])

    const getYearList = (item)=>{
      // item.year == '全部' ? setCurTabAreaAct('') : setCurTabAreaAct(item.year)
      setTimeout(() => {
        setTeleplayList(()=>[])
        setCurTabAreaAct(()=>item.year)
        setChangeState(false)
      }, 100);
      // console.log(item)
    }
    const getAreaList =(item)=>{
      // item.area == '全部' ? setCurTabYearAct('') : setCurTabYearAct(item.area)
      setTimeout(() => {
        setTeleplayList(()=>[])
        setCurTabYearAct(()=>item.area)
        setChangeState(false)
      }, 100);
      // console.log(item,'item')
    }
    const contentViewScroll=(e)=>{
      // console.log(e,'eheightened')
      var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
      var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
      var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
      if (offsetY + oriageScrollHeight >= contentSizeHeight){
        //在这里面加入你需要指行得方法和加载数据
        let plusPage = curPage
        plusPage++
        console.log(plusPage,'plusPage')
        setCurPage(plusPage)
        onRefresh()
      }else if(offsetY + oriageScrollHeight <= 1){
        //这个是没有数据了然后给了false  得时候还在往上拉
        console.log('没有数据了')
      }else if(offsetY == 0){
       //这个地方是下拉刷新，意思是到顶了还在指行，可以在这个地方进行处理需要刷新得数据
       console.log('下拉刷新')
      }
    }
  return (
    <View>
          <View style={styles.scrollWrap}>
            <ScrollView horizontal={true}>
              <View style={styles.tabListStateWrap}>
                  <Text style={styles.tabListState}>年代：</Text>
                  {
                      catYearTabs.map(item=>{
                          return (
                              <Text key={item.id} style={[styles.innerTabs,curTabYearAct==item.year&&styles.innerTabsAct]} onPress={()=>getYearList(item)}>{item.year}</Text>
                          )
                      })
                  }
              </View>
            </ScrollView>
            <ScrollView horizontal={true}>
              <View style={styles.tabListStateWrap}>
                  <Text style={styles.tabListState}>地区：</Text>
                  {
                    catAreaTabs.map(item=>{
                          return (
                              <Text key={item.id} style={[styles.innerTabs,curTabAreaAct==item.area&&styles.innerTabsAct]} onPress={()=>getAreaList(item)}>{item.area}</Text>
                          )
                      })
                  }
              </View>
            </ScrollView>
          </View>
          {
            loadingState? <Loading/> : null
          }
          <ScrollView contentContainerStyle={styles.contentContainer}
            horizontal={false}
            onMomentumScrollEnd ={(e)=> contentViewScroll(e)}
          >
            
            <MediaList teleplayList={teleplayList} showID={'notHome'} curState={props.curState.state} navigation={navigation}/>
          </ScrollView>
      </View>
  )
}
const styles = StyleSheet.create({
  scrollWrap:{
    height:80
  },
  innerTabsAct:{
    backgroundColor:'rgba(0, 0, 0, 0.04)',
    borderColor:'rgba(0, 0, 0, 0.23)',
    borderWidth:1,
    borderRadius:10
  },
  innerTabs:{
    paddingHorizontal:10,
    fontSize:13,
    alignItems:'center'
  },
  tabListStateWrap:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:30,
      paddingLeft:20,
      marginTop:5,
      marginBottom:10
  },
  tabListState:{
    color: 'rgba(0, 0, 0, 0.87)',
    flexShrink: 0,
    fontWeight: 'bold',
    
  },
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
      backgroundColor: '#9DD6EB',
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
      backgroundColor: '#92BBD9'
  },
  text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
  }
});