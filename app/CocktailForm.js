
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput,  Image, TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { ListItemBase } from 'react-native-elements/dist/list/ListItemBase';


export default function CocktailForm() {

  const navigation = useNavigation();

  const addCocktail = (cocktail, ingredients) => {
    const db = SQLite.openDatabase('barCart.db');
  
    db.transaction((tx) => {
      // Check if the cocktail table exists
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='cocktails'",
        [],
        (txObj, resultSet) => {
          if (resultSet.rows.length === 0) {
            // The cocktails table doesn't exist, create it
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS cocktails\
              (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, notes TEXT, img TEXT, price REAL, inStock INTEGER,\
                ingredient_id INTEGER, FOREIGN KEY (ingredient_id) REFERENCES ingredients (id))',
              [],
              (txObj, resultSet) => {
                // Table created successfully, now insert the cocktail
                insertCocktail(tx, cocktail, ingredients);
                navigation.replace('CocktailMenu');
              },
              (txObj, error) => {
                console.log('Error creating cocktail table:', error);
              }
            );
          } else {
            // The cocktails table already exists, directly insert the cocktail
            insertCocktail(tx, cocktail, ingredients);
          }
        },
        (txObj, error) => {
          console.log('Error checking cocktails table:', error);
        }
      );
    });
  };
  
  const insertCocktail = (tx, cocktail, ingredients) => {
    tx.executeSql(
      'INSERT INTO cocktails (name, description, notes, img, price, inStock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        cocktail.name,
        cocktail.description,
        cocktail.notes,
        '', // no image
        cocktail.price,
        cocktail.inStock
      ],
      (txObj, resultSet) => {
        const cocktailId = resultSet.insertId;
        console.log('Cocktail added to the database');

        insertIngredients(tx, cocktailId, ingredients)
      },
      (txObj, error) => {
        // Handle the error case if needed
        console.log('Error adding cocktail to the database:', error);
      }
    );
  };

  const insertIngredients = (tx, cocktailId, ingredients) => {
    // Create the cocktail_ingredients table if it doesn't exist
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cocktail_ingredients (id INTEGER PRIMARY KEY, cocktail_id INTEGER NOT NULL, ingredient_id INTEGER NOT NULL, FOREIGN KEY (cocktail_id) REFERENCES cocktails (id), FOREIGN KEY (ingredient_id) REFERENCES ingredients (id))',
      [],
      () => {
        console.log('cocktail_ingredients table created or already exists');
  
        // After ensuring the table exists, insert the ingredients for the cocktail
        ingredients.forEach((ingredient) => {
          tx.executeSql(
            'INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id) VALUES (?, ?)',
            [cocktailId, ingredient.id],
            (txObj, resultSet) => {
              console.log('Ingredient added for the cocktail');
            },
            (txObj, error) => {
              console.log('Error adding ingredient for the cocktail:', error);
            }
          );
        });
      },
      (txObj, error) => {
        console.log('Error creating cocktail_ingredients table:', error);
      }
    );
  };
  
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
              image: row.img,
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
        },
        (txObj, error) => {
          console.log('Error fetching ingredients:', error);
        }
      );
    });
  }, []);
  
  const handleSubmit = () => {
    const cocktail = {
      name: name,
      description: description,
      noes: notes,
      price: price,
      inStock: inStock,
    };
  
    addCocktail(cocktail);
  };

  // -- states --

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState(null);
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>ADD TO MENU</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NAME</Text>
          <TextInput 
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.label}>NOTES</Text>
          <TextInput 
            style={styles.input}
            value={description}
            onChangeText={setNotes}
          />
          </View>
          <View>
          <Text style={styles.label}>Ingredients</Text>
          <Dropdown 
            value={ingredient}
            data={ingredients}
            labelField="label"
            valueField="value"
            style={styles.dropdown}
            placeholder="Select"
            selectedTextStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownText}
            />
            <Button 
            title="+" 
            containerStyle={styles.btnContainer} 
            buttonStyle={styles.addBtn} 
            titleStyle={styles.addBtnText} 
            onPress={addIngredient}/>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
          
          <Text style={styles.label}>Price</Text>
          <Text style={styles.label}>In Stock</Text>
          </View>
            <Button 
            title="ADD" 
            containerStyle={styles.btnContainer} 
            buttonStyle={styles.addBtn} 
            titleStyle={styles.addBtnText} 
            onPress={handleSubmit}/>
          </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#d8e8ed',
    height: 40,
    marginTop: 12
  },
  dropdownText: {
    margin: 10,
    fontSize: 15
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12
  },
  addBtn: {
    width: 200,
    height: 60,
    backgroundColor: '#187795',
    borderRadius: 15
  },
  addBtnText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold'
  },
  title: { 
    color: 'rgb(24, 119, 149)',
    fontSize: 35,
    fontWeight: 'bold',
  },
  label: {
    color: 'rgba(24, 119, 149, 0.7)',
    fontSize: 20,
    paddingHorizontal: 10
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#d8e8ed',
  },
  inputContainer: {
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    bottom: -300,
    left: 0,
    right: 0,
  },
  background: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 4 : 0,
    paddingVertical: 20,
  },
    
});
