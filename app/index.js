
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, Badge, Header } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;
import CocktailMenu from './CocktailMenu';
import LiquorCabinet from './LiquorCabinet';
import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';


export default function Page() {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottom}>
      <PageTab/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    height: 100
  }
});
