import { Slot } from "expo-router";

import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, ImageBackground, Image, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, useNavigation } from 'expo-router';

import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';
import LiquorCabinet from './LiquorCabinet';
import CocktailMenu from './CocktailMenu';

export default function HomeLayout() {
  return (
    <>
      <View style={styles.container}>
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
    <View style={styles.topDesign}>
      <Image source={require('../assets/Leaves.png')} style={styles.leaves} />
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
    </ImageBackground>
    <SafeAreaView>
    <Slot />
    </SafeAreaView>
    
    <View style={styles.bottom}>
        <PageTab style={styles.pagetab}/>
      </View>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#201e1f'
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      height: 100
    },
    background: {
      flex: 1,
      resizeMode: 'cover'
    },
    topDesign: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    leaves: {
      width: '100%',
      height: 150
      
    },
    logo: {
      width: 60,
      height: 90,
      position: 'absolute',
      top: 50
    }
  });