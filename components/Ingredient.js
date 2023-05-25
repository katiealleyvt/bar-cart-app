
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import { Card, ListItem, Icon, Badge, Text } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;

export default function Ingredient(props) {

  let inStock = props.stock ? "In Stock" : "Out of Stock";

  return (
    <Card containerStyle={styles.card}>
      
        <View style={{alignItems: 'flex-end'}}>
        </View>

      <View style={styles.row}>
        <View>
        <Image source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} style={styles.image}/>
        </View>

        <View style={{marginLeft: 15}}>
          <Text h3>{props.name}</Text>
          <Text>&bull;Type: {props.type}</Text>
          <Text>&bull;Volume: {props.volume}</Text>
          <Text>&bull;Price: ${props.price}</Text>
        </View>
      </View>
       
    </Card>
      
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  card: {
    height: 175
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5
  }

});
