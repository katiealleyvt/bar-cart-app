
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Badge, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;
import Ingredient from '../components/Ingredient';
import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';
import Form from './IngredientForm';

export default function LiquorCabinet() {
//Get Ingredients from Db
  useEffect(() => {
    // Fetch ingredients from the database
    const db = SQLite.openDatabase('barCart.db');

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients',
        [],
        (txObj, resultSet) => {
          const data = [];

          for (let i = 0; i < resultSet.rows.length; i++) {
            const row = resultSet.rows.item(i);
            // Transform the row data into the required format for your component
            const ingredient = {
              id: row.id,
              name: row.name,
              type: row.type,
              liquorType: row.type, // adjust this according to your database structure
              volume: row.quantity, // adjust this according to your database structure
              price: row.price,
              inStock: row.inStock === 1 ? true : false
            };
            data.push(ingredient);
          }

          // Set the fetched ingredients in the component state
          setIngredients(data);
          setSorted(data);
        },
        (txObj, error) => {
          console.log('Error fetching ingredients:', error);
        }
      );
    });
  }, []);

//Update Ingredients from Db

//mark inStock or OutofStock
const markStock = (inStock, id) => {
  const db = SQLite.openDatabase('barCart.db');

  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE ingredients SET inStock = ? WHERE id = ?',
      [inStock ? 1 : 0, id],
      (txObj, resultSet) => {
        console.log('Ingredient stock updated successfully');
      },
      (txObj, error) => {
        console.log('Error updating ingredient stock:', error);
      }
    );
  });
};

  //States
  const [ingredients, setIngredients] = React.useState([])
  const [sorted, setSorted] = React.useState([]);
  const [showForm, setShowForm] = useState(false);

  //Show / Hide Ingredients
  const showIngredientForm = () =>
  {
    setShowForm(true);
  }
  const hideIngredientForm = () => {
    showForm(false);
  }
  //Filter data for search
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
//Sort for in stock
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
      <SafeAreaView>
        {showForm ? 
        <Form hideIngredientForm={hideIngredientForm}/> : 
        <View>
          <FilterTab 
          filterData={filterData} 
          sortInStock={sortInStock} 
          showSettingsIcon={false}
          showIngredientForm={showIngredientForm}/>
        <ScrollView style={styles.scrollView}>
          {sorted.map((item, index) => (
            <Ingredient 
            key={index}
            id={item.id}
            name={item.name} 
            type={item.type} 
            liquorType={item.liquorType}
            volume={item.volume} 
            price={item.price}
            stock={item.inStock}
            markStock={markStock}
            />
            
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
  scrollView: {
    top: 100
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
