import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';


const bleManager = new BleManager();


export default function BluetoothScreen() {
  /* Estado para armazenar o status de busca e o nome dos dispositivos encontrados */
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const grantes = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ])

      return (
        grantes['android'.permission.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        grantes['android'.permission.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
      )
    }
    return true
  }  
}




export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
