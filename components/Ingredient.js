
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, TextInput, Button, TouchableOpacity, Image, Pressable} from 'react-native';
import { Card, ListItem, Icon, Badge, Text, BottomSheet } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;

export default function Ingredient(props) {

  const { markStock } = props;
  //Ingredient Options
  const [optionsShow, setOptionsShow] = React.useState(false);
  const stockOption = props.stock ? 'Mark Out of Stock' : 'Mark In Stock';
  const options = [
    {title: 'Edit Item'},
    {
      title: 'Delete Item',
      titleStyle: { color: 'red', fontWeight: 'bold' },
  },
    {
      title: stockOption,
      onPress: () => markStock(!props.stock, props.id),
    },
    
    {
      title: 'Cancel',
      onPress: () => setOptionsShow(false),
    },
  ]
  showOptions = () => {
    setOptionsShow(true);
  };

  //Title Sizing
  let titleSize = 30;
  if(props.name.length > 20){
    titleSize = 12;
  }

  //InStock/OutofStock show
  let inStock = props.stock ? "In Stock" : "Out of Stock";
  //show Per Unit Cost
  const perUnitCost = (props.price / (props.volume *.033814)).toFixed(2);
  return (
    <Card containerStyle={styles.card}>
      
       

      <View style={styles.row}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} style={styles.image}/>

        <View style={{marginLeft: 15, display: 'flex', flexDirection: 'column'}}>
          
          <Text style={{fontWeight: 'bold', fontSize: titleSize}}>{props.name}</Text>
          <Text style={styles.cardText}>Type: {props.type === 'Liquor' ? props.liquorType : props.type}</Text>
          {props.type === 'Liquor' && <Text style={styles.cardText}>Volume: {props.volume} mL</Text>}
          <Text style={styles.cardText}>Price: ${props.price}</Text>
          {props.type === 'Liquor' && <Text style={styles.cardText}>Per unit cost: ${perUnitCost}</Text>}
        </View>
        </View>
      
        <View style={{alignItems: 'flex-end'}}>
          <Pressable style={styles.optionsButton} onPress={showOptions}>
            <Image source={require('../assets/options_icon.png')} style={{width: 6, height: 21, margin: 10}}/>
          </Pressable>
        </View>
      </View>


      <BottomSheet isVisible={optionsShow}>
  {options.map((l, i) => (
    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
      <ListItem.Content>
        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ))}
</BottomSheet>
    </Card>
      
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 130,
    borderRadius: 15
  },
  card: {
    height: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 0,
    flexDirection: "column"
  },
  cardText: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    justifyContent: 'space-between'
  }

});
