import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Badge, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router' ;
import Cocktail from '../components/Cocktail';
import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';
import Form from './CocktailForm';

//States
const [cocktails, setCocktails] = React.useState([])
const [searched, setSearched] = React.useState([])
const [sorted, setSorted] = React.useState([]);
const [showForm, setShowForm] = useState(true);

//Show / Hide Ingredients
const showCocktailForm = () =>
{
  setShowForm(true);
}
const hideCocktailForm = () => {
  showForm(false);
}

// -- Database Code --

//mark inStock or OutofStock
const markStock = (inStock, id) => {
  const db = SQLite.openDatabase('barCart.db');

  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE cocktails SET inStock = ? WHERE id = ?',
      [inStock ? 1 : 0, id],
      (txObj, resultSet) => {
        console.log('Cocktail stock updated successfully');
        //reload
        navigation.replace('CocktailMenu');
      },
      (txObj, error) => {
        console.log('Error updating cocktail stock:', error);
      }
    );
  });

};

//delete cocktail
const deleteCocktail = (id) => {
  const db = SQLite.openDatabase('barCart.db');
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM cocktails WHERE id = ?',
      [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log('Cocktail removed successfully');
          //reload
          navigation.replace('CocktailMenu');
        } else {
          console.log('Cocktail removal failed');
        }
      },
      (txObj, error) => {
        console.log('Error removing cocktail:', error);
      }
    );
  });
};

// -- filter --

const filterData = (search) => {
  //filter by search
  //check if checkbox is checked   //in stock not checked
    const filteredData = ingredients.filter((item) => 
  {
    const itemName = item.name.toLowerCase();
    const itemType = item.type.toLowerCase();
    const itemDesc = item.description.toLowerCase();
    const searchTerm = search.toLowerCase();

    return itemName.includes(searchTerm) || itemType.includes(searchTerm) || itemDesc.includes(searchTerm);
  });
  
  setSorted(filteredData);
  setSearched(filteredData);
}

// -- sort --

const sortInStock = (checked) => {
  if(checked){
    const inStockData = sorted.filter((item) => item.inStock);
const outOfStockData = sorted.filter((item) => !item.inStock);
    const allData = [...inStockData, ...outOfStockData];
    setSorted(allData);
  }
  else{ 
    setSorted(searched);
  }
  
}

export default function CocktailMenu() {

  return (
    <SafeAreaView>
        {showForm ? 
        <Form hideForm={hideCocktailForm}/> : 
        <View>
          <FilterTab 
          filterData={filterData} 
          sortInStock={sortInStock} 
          showSettingsIcon={false}
          showForm={showCocktailForm}/>
        <ScrollView style={styles.scrollView}>
          {sorted.map((item, index) => (
            <Cocktail />
            
      ))}
        <View style={{height: 620, backgroundColor: '#201e1f'}}></View>
        </ScrollView>
          </View>}
        
      
        
    </SafeAreaView>
    
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
