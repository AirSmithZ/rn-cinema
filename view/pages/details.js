import React,{useState,useEffect,useContext} from 'react'
// import GlobalContext from '../store/index'
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View,
  } from 'react-native';
import {storage} from '../storage/index'
import { distinctData } from '../utils/getMaxdata'
export default Detail = (props)=>{
    // console.log(GlobalContext,'GlobalContext')
    // let { dispatch } = useContext(GlobalContext)
    console.log('props',props.route.params)
    const [titleName,setTitleName] = useState('')

    
    const movieDetail = JSON.parse(JSON.stringify(props.route.params))
    console.log('movieDetail',movieDetail)
    const [mediafirList,setfirMediaList] = useState([])
    const [mediasceList,setsceMediaList] = useState([])
    const [isSingleList,setIsSingleList] = useState(true)
    const [firSource,setFirSource] = useState(true)
    const mapList = (data)=>{
        if(data.lastIndexOf('$$$')){
            //存在多条源
            let mediaListTemp = data.split("$$$");
            let fstSource =  handleMapList(mediaListTemp,0)
            let sceSource =  handleMapList(mediaListTemp,mediaListTemp.length-1)
            setfirMediaList(()=>[...fstSource])
            setsceMediaList(()=>[...sceSource])
            setIsSingleList(false)
        }else{
            let mediaListTemp = data.split("#");
            let mediaData =  handleMapList(mediaListTemp,0)
            setfirMediaList(()=>[...mediaData])
            setIsSingleList(true)
        }
        setTitleName(props.route.params.movieItem.vod_name)
        console.log('isSingleList',isSingleList)
    }
    const handleMapList = (arr,index)=>{
        try{
            let tempArr = [...arr[index].split('#')]
            let mapArr = []
            tempArr && tempArr.map(item=>{
                const index = item.lastIndexOf("$")
                let media = item.substring(index+1,item.length);
                let num = item.substring(0,index)
                mapArr.push({num,media})
            })
            return mapArr
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        mapList(movieDetail.movieItem.vod_play_url)
    },[])
    const goWatch = (item)=>{
        console.log(props)
        storage.load('historyWatch', (data) => {
            console.log(data,'historyWatch')
            let saveHistory = {...props.route.params.movieItem,num:item.num}
            let list = [...data]
            list.push(saveHistory)
            list = distinctData(list,'vod_name')
            storage.save('historyWatch', [...list])
            console.log(saveHistory,'saveHistory')
            props.navigation.navigate('WatchPage',{
                watchItem:item,
                titleName:titleName+'-'+item.num
            })
        })
    }
    const changScouce = (type)=>{
        setFirSource(type)
    }
    return (

        <SafeAreaView style={{ flex: 1,alignItems:'center' }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

            <View style={styles.headWrap}>
                <View style={styles.imgWrap}>
                    <Image style={styles.img} source={{uri:movieDetail.movieItem.vod_pic}}/>
                </View>
                <View style={styles.rgWrap}>
                    <View style={styles.wpWrap}>
                        <Text style={styles.wp}>导演：</Text>
                        <Text style={styles.content}>{movieDetail.movieItem.vod_director}</Text>
                    </View>
                    <View style={styles.wpWrap}>
                        <Text style={styles.wp}>主演：</Text>
                        <Text numberOfLines={20} style={styles.content}>{movieDetail.movieItem.vod_actor}</Text>
                    </View>
                    <View style={styles.wpWrap}>
                        <Text style={styles.wp}>类型：</Text>
                        <Text style={styles.content}>{movieDetail.movieItem.vod_class}</Text>
                    </View>
                    <View style={styles.wpWrap}>
                        <Text style={styles.wp}>地区：</Text>
                        <Text style={styles.content}>{movieDetail.movieItem.vod_area}</Text>
                    </View>
                    <View style={styles.wpWrap}>
                        <Text style={styles.wp}>进度：</Text>
                        <Text style={styles.content}>{movieDetail.movieItem.vod_remarks}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.contentWrap}>
                <Text style={styles.wp}>简介:</Text>
                <Text style={styles.movieContent}>{movieDetail.movieItem.vod_content}</Text>
            </View>
            <View style={styles.contentWrap}>
                <Text style={styles.wp}>剧集列表:</Text>
                <View style={styles.sourceWrap}>
                    <Text onPress={()=>changScouce(true)} style={[firSource?styles.activeSource:null,styles.normalSource]}>资源1</Text>
                    {
                        !isSingleList?(<Text onPress={()=>changScouce(false)} style={!firSource?styles.activeSource:null}>资源2</Text>):null
                    }
                </View>
                <View style={styles.mediaWrap}>
                    {
                        firSource ?
                        (mediafirList.map((item,index)=>{
                            return (
                                <TouchableWithoutFeedback onPress={()=> goWatch(item)} key={index}>
                                    <Text style={styles.singleMediaWrap}>
                                        {item.num}
                                    </Text>
                                </TouchableWithoutFeedback>
                            )
                        })) :
                        (
                            mediasceList.map((item,index)=>{
                                return (
                                    <TouchableWithoutFeedback onPress={()=> goWatch(item)} key={index}>
                                        <Text style={styles.singleMediaWrap}>
                                            {item.num}
                                        </Text>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        )
                    }
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    normalSource:{
        margin:10
    },
    activeSource:{
        color:'firebrick',
    },
    sourceWrap:{
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },
    singleMediaWrap:{
        width:'20%',
        height:30,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#009688',
        borderRadius:5,
        textAlign:'center',
        lineHeight:30,
        margin:5,
        fontSize:13,
        color:'rgba(0, 0, 0, 0.54)'
    },
    mediaWrap:{
        width:'100%',
        flexWrap:'wrap',
        margin:5,
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row'
    },
    contentContainer: {
        paddingVertical: 20
    },
    contentWrap:{
        width:'95%',
        padding:20,
        // minHeight:300,
        backgroundColor:'white',
        shadowOpacity: 0.15, 
        shadowRadius: 10, 
        borderRadius:5,
        flex:1,
        // marginBottom:5,
        marginTop:20
    },
    movieContent:{
        fontSize:17,
        color:'#909090',
        overflow:'hidden',
        flex:1,
        flexWrap: "wrap",
        overflow:'hidden'

    },
    img:{
        width:'100%',
        height:'100%'
    },
    headWrap:{
        height:250,
        padding:10,
        flexDirection:'row',
        overflow:'hidden',
        // flexBasis: 'auto'
    },
    imgWrap:{
        width:'40%',
        height:'100%'
    },
    rgWrap:{
        flexDirection:'column',
        marginLeft:5,
        overflow:'hidden',
        // width:'50%'
        flex:1
    },
    wpWrap:{
        flexDirection:'row',
        margin:5,
        alignItems:'flex-start',
        // wordBreak:'break-all'

    },
    wp:{
        fontSize:18,
        fontWeight:'500'
    },
    content:{
        fontSize:17,
        color:'#909090',
        maxHeight:100,
        overflow:'hidden',
        // width:'60%',
        flex:1,
        flexWrap: "wrap",
    }
})