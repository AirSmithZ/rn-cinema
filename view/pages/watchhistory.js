import React,{useEffect,useState} from 'react'
import { View, Text ,StyleSheet ,TouchableWithoutFeedback,Image,SafeAreaView,ScrollView} from 'react-native'
import {storage} from '../storage/index'
export default function mediaList(props) {
    // console.log(props,'props-------222')
    const [historyList,setHistoryList] = useState([])
    const { navigation } = props;
    const goDetail = (item)=>{
        navigation.navigate('Detail',{
            movieItem:item
        })
    }
    useEffect(()=>{
        storage.load('historyWatch', (data) => {
            console.log(data,'historyWatch')
            setHistoryList([...data])
        })
        // storage.remove('historySearch')
    },[])
    return (
        <SafeAreaView style={styles.contentContainer}>
            <ScrollView horizontal={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.bmMvWrap} >
                {
                    historyList && historyList.map((item,index)=>{
                        return(
                            <View style={styles.singleWrap} key={index}>
                            <TouchableWithoutFeedback onPress={()=> goDetail(item)}>
                                <View style={styles.innerSingleWrap}>
                                    <View style={styles.imgWrap}>
                                        <Image 
                                            source={{uri:item.vod_pic}}
                                            style={styles.listImg}
                                        />
                                    </View>
                                    <View style={styles.rgWrap}>
                                        <Text style={styles.wpWrap}>{item.vod_name}</Text>
                                        <Text style={[styles.wpWrap,styles.underColor]} numberOfLines={2} ellipsizeMode={'tail'}>{item.vod_area}-{item.vod_actor}</Text>
                                        <Text style={[styles.wpWrap,styles.underColor]}>观看至{item.num}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rgWrap:{
        marginLeft:5,
        justifyContent:'space-around'
    },  
    contentContainer:{
        backgroundColor:'white',
        flex:1
    },
    hideTitle:{
        display:'none'
    },
    iconRight:{
        width:15,
        height:15
    },
    mvOuterWrap:{
        marginTop:5,
        marginBottom:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:30,
        paddingLeft:10,
        paddingRight:20
    },
    icon:{
        width:27,
        height:27,
        marginRight:10
      },
      bmMvWrap:{
        flexWrap:'wrap',
        justifyContent:'center',
        padding:5,
        position:'relative',
     },
     listImg:{
        width:'100%',
        height:'100%',
    },
    wpWrap:{
        // textAlign:'center',
        fontSize:13,
        width:'30%',
        overflow:'hidden',
    },
    underColor:{
        color:'#0000008A'
    },
    imgWrap:{
        width:120,
        height:120,
        backgroundColor:'lightgreen'
    },
    innerSingleWrap:{
        margin:5,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#f5f5f5'
    },
    singleWrap:{
        margin:5,
        width:'100%',
        shadowOpacity: 0.8, 
        shadowRadius: 6, 
        borderRadius:100
        // elevation: 10 
    },
})