
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Badge, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;
import Ingredient from '../components/Ingredient';
import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';

export default function LiquorCabinet() {

  const jsonData = require('../data/ingredients.json');

  const [ingredients, setIngredients] = React.useState(jsonData)
  const [sorted, setSorted] = React.useState(jsonData);

  const filterData = (search) => {
    //filter by search
    //check if checkbox is checked   //in stock not checked
      const filteredData = jsonData.filter((item) => 
    {
      const itemName = item.name.toLowerCase();
      const itemType = item.liquorType.toLowerCase();
      const searchTerm = search.toLowerCase();

      return itemName.includes(searchTerm) || itemType.includes(searchTerm);
    });
    
    setSorted(filteredData);
  }

  const sortInStock = (checked) => {
    if(checked){
      const inStockData = ingredients.filter((item) => item.inStock);
  const outOfStockData = ingredients.filter((item) => !item.inStock);
      const allData = [...inStockData, ...outOfStockData];
      setSorted(allData);
    }
    else{
      setSorted(ingredients);
    }
    
  }
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
    <View style={styles.topDesign}>
      <Image source={require('../assets/Leaves.png')} style={styles.leaves} />
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
    
    </ImageBackground>
      <SafeAreaView>
        
        <FilterTab filterData={filterData} sortInStock={sortInStock} showSettingsIcon={false}/>
        <ScrollView style={styles.scrollView}>
          {sorted.map((item, index) => (
            <Ingredient 
            key={index} 
            name={item.name} 
            type={item.liquorType != "" ? item.liquorType: item.type} 
            volume={item.volume} 
            price={item.price}
            stock={item.inStock}
            />
      ))}
        </ScrollView>
      <View style={styles.bottom}>
        <PageTab style={styles.pagetab}/>
      </View>
        
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#201e1f'
  },
  scrollView: {
    top: 100
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
