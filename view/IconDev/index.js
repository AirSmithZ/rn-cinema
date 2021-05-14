import React from 'react'
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image
  } from 'react-native';
function IconWithBadge({ icon, badgeCount, size }) {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Image source={icon} style={{
          width: size,
          height: size
        }} />
        {badgeCount > 0 && (
          <View
            style={{
              // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
  function HomeIconWithBadge(props) {
    return <IconWithBadge {...props} badgeCount={3} />;
  }
  export default HomeIconWithBadge