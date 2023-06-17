
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Badge, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router' ;
import Ingredient from '../components/Ingredient';
import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';
import Form from './IngredientForm';

export default function LiquorCabinet() {

  const router = useRouter();
  const navigation = useNavigation();


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
              description: row.description, // adjust this according to your database structure
              quantity: row.quantity, // adjust this according to your database structure
              price: row.price,
              unit: row.unit,
              inStock: row.inStock === 1 ? true : false
            };
            data.push(ingredient);
          }

          // Set the fetched ingredients in the component state
          setIngredients(data);
          setSorted(data);
          setSearched(data);
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
        //reload
        navigation.replace('LiquorCabinet');
      },
      (txObj, error) => {
        console.log('Error updating ingredient stock:', error);
      }
    );
  });

};

//delete ingredient
const deleteIngredient = (id) => {
  const db = SQLite.openDatabase('barCart.db');
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM ingredients WHERE id = ?',
      [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log('Ingredient removed successfully');
          //reload
          navigation.replace('LiquorCabinet');
        } else {
          console.log('Ingredient removal failed');
        }
      },
      (txObj, error) => {
        console.log('Error removing ingredient:', error);
      }
    );
  });
};

  //States
  const [ingredients, setIngredients] = React.useState([])
  const [searched, setSearched] = React.useState([])
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
//Sort for in stock
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


  return (
      <SafeAreaView>
        {showForm ? 
        <Form hideIngredientForm={hideIngredientForm}/> : 
        <View>
          <FilterTab 
          filterData={filterData} 
          sortInStock={sortInStock} 
          showSettingsIcon={false}
          showIngredientForm={showIngredientForm}
          ingredients={ingredients}/>
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
            deleteIngredient={deleteIngredient}
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
