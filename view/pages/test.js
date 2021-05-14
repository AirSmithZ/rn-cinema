import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform
} from 'react-native';
import MyTextInput from '../components/MyTextInput'
// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

// export default MyTextInput == Platform.OS == 'ios' ? withHandleHandWritingTextInput : TextInput
export default class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: false,
            carNumTxt:''
        };
    }
    render() {
        return (
            <View style={styles.container}>
            <Text>1</Text>
                <MyTextInput value={'中文'}/>
                <TextInput
                    style={styles.inputItem}
                    value={this.state.carNum}
                    underlineColorAndroid='transparent'
                    maxLength={9}
                    onChangeText={(value) => {
                            this.setState({
                                carNum: value
                            })
                        this.carNumTxt = value
                    }}
                    placeholder="请输入车辆号"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ccffcc',
    },
});
