import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

const HomeScreen = (props) => {

  const options = {
    port: 6000,
    host: '192.168.2.17',
    localAddress: '127.0.0.1',
    reuseAddress: true,
  };

  // Create socket
  const client = TcpSocket.createConnection(options, () => {
    // Write on the socket
    client.write('Hello server!');

    // // Close socket
    // client.destroy();
  });

  client.on('data', function(data) {
    console.log('message was received', data);
  });

  client.on('error', function(error) {
    console.log(error);
  });

  client.on('close', function(){
    console.log('Connection closed!');
  });

  handleCharge = () => {
    client.write('baolong!');
  }

  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
      <Button title='Go to Details' onPress={handleCharge} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

export default HomeScreen;