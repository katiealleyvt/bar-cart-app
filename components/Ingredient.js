
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import { Card, ListItem, Icon, Badge, Text } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;

export default function Ingredient(props) {

  let titleSize = 30;
  if(props.name.length > 20){
    titleSize = 12;
  }
  let inStock = props.stock ? "In Stock" : "Out of Stock";
  const perUnitCost = (props.price / (props.volume *.033814)).toFixed(2);
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
          <Text style={{fontWeight: 'bold', fontSize: titleSize}}>{props.name}</Text>
          <Text style={styles.cardText}>Type: {props.type === 'Liquor' ? props.liquorType : props.type}</Text>
          {props.type === 'Liquor' && <Text style={styles.cardText}>Volume: {props.volume} mL</Text>}
          <Text style={styles.cardText}>Price: ${props.price}</Text>
          {props.type === 'Liquor' && <Text style={styles.cardText}>Per unit cost: ${perUnitCost}</Text>}
        </View>
      </View>
       
    </Card>
      
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: '100%',
    borderRadius: 15
  },
  card: {
    height: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 0
  },
  cardText: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5
  }

});
