
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
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
      
      <SafeAreaView style={styles.container}>
        <FilterTab filterData={filterData} sortInStock={sortInStock} showSettingsIcon={false}/>
        <ScrollView>
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
