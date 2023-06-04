
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;



export default function PageTab(props) {

    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/LiquorCabinet")}>
          <Image style={styles.menuImage} source={require('../assets/Shaker.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/CocktailMenu")}>
          <Image style={styles.menuImage} source={require('../assets/CocktailIcon.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 4 : 0,
    paddingVertical: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  menuImage: {
    resizeMode: 'center',
    width: 100,
    height: 100,
  },
    
});
