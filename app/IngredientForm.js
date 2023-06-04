
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput,  Image, TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;



export default function IngredientForm() {

  const [categories, setCategories] = useState([
    {label: "Liquor", value:"liquor"},
    {label: "Syrups", value:"syrup"},
    {label: "Soda/Juices", value:"soda/juice"},
    {label: "Fruit", value:"fruit"},
    {label: "Other", value:"other"}
  ]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');

  const [dropdownOpen, setOpen] = useState(false);


  const handleSubmit = () => {

  }

  const CreateIngredient = () => {

  }

  const changeCategory = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>ADD TO INVENTORY</Text>
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
            <Text style={styles.label}>CATEGORY</Text>
          </View>
          <View>
            <Text style={styles.label}>QUANTITY</Text>
            <TextInput 
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            />
          </View>
          <View>
            <Text style={styles.label}>UNIT</Text>
            <TextInput 
            style={styles.input}
            value={unit}
            onChangeText={setUnit}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
          <Text style={styles.label}>Price</Text>
            <TextInput 
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            />
          </View>
            <Button title="ADD" containerStyle={styles.btnContainer} buttonStyle={styles.addBtn} titleStyle={styles.addBtnText} onPress={handleSubmit}/>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: '35',
    fontWeight: 'bold'
  },
  title: {
    color: 'rgb(24, 119, 149)',
    fontSize: '35',
    fontWeight: 'bold',

  },
  label: {
    color: 'rgba(24, 119, 149, 0.7)',
    fontSize: '20',
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
    bottom: 400,
    left: 0,
    right: 0,
  },
  background: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
