import React from 'react'
import { View, Text ,StyleSheet ,TouchableWithoutFeedback,Image} from 'react-native'
import { directToPage } from '../utils/extension';

export default function mediaList(props) {
    // console.log(props,'props-------222')
    const { navigation } = props;
    const goDetail = (item)=>{
        navigation.navigate('Detail',{
            movieItem:item
        })
        // directToPage(navigation, 'Detail', {
        //     courseId: item
        // })
    }
    return (
        <View>
            <View style={[styles.mvOuterWrap,props.curState!='home'&&styles.hideTitle]} onPress={()=>console.log(1111)}>
                <View style={styles.mvTab,styles.mvOuterWrap}>
                    <Image
                        source={require('../assets/image/movieList.png')}
                        style={styles.icon}
                    />
                    <Text>{props.listName}</Text>
                </View>
                <Image
                    source={require('../assets/image/right.png')}
                    style={styles.iconRight}
                />
            </View>
            <View style={styles.bmMvWrap} >
            {
                props.teleplayList.map((item,index)=>{
                    return(
                        item.type_id == props.showID || props.showID == 'wu' || props.showID == 'notHome'?  
                        (<View style={styles.singleWrap} key={index}>
                        <TouchableWithoutFeedback onPress={()=> goDetail(item)}>
                            <View style={styles.innerSingleWrap}>
                                <View style={styles.imgWrap}>
                                    <Image 
                                        source={{uri:item.vod_pic}}
                                        style={styles.listImg}
                                    />
                                </View>
                                <Text style={styles.wpWrap}>{item.vod_name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View>) : null 
                    )
                })
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        padding:5,
        position:'relative'
     },
     listImg:{
        width:'100%',
        height:'100%',
        
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
})