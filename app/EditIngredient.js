
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput,  Image, TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { ListItemBase } from 'react-native-elements/dist/list/ListItemBase';


export default function EditIngredient(props) {

  
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const ingredientId = route.params?.ingredientId;
  console.log(ingredientId)

  const handleImageSelect = async () => {
    // Ask for permission to access the device's media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      // Permission denied, handle accordingly
      return;
    }
  
    // Launch the image picker and allow the user to select an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.cancelled) {
      // An image was selected
      setImageUri(result.uri);
    }
  };
  
  
  const handleSubmit = () => {
    const ingredient = {
      name: name,
      description: description,
      category: category,
      quantity: quantity,
      unit: unit,
      price: price,
      inStock: true,
    };
  
    addIngredient(ingredient);
  };


  const [categories, setCategories] = useState([
    {label: "Liquor", value:"liquor", unit:"ml"},
    {label: "Syrup", value:"syrup", unit:"fl oz"},
    {label: "Soda/Juice", value:"soda/juice", unit:"fl oz"},
    {label: "Fruit", value:"fruit", unit: "fruit"},
    {label: "Other", value:"other", unit:"custom"}
  ]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');





  const changeCategory = (item) => {
    setCategory(item.value);
    if(item.value == "other"){
      setUnit("");
    }
    else{
      setUnit(item.unit);
    }
    
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
            <Dropdown 
            value={category}
            data={categories}
            onChange={item => {changeCategory(item)}}
            labelField="label"
            valueField="value"
            style={styles.dropdown}
            placeholder="Select"
            selectedTextStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownText}
            />
          </View>
          <View>
            <Text style={styles.label}>QUANTITY</Text>
            <TextInput 
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.label}>UNIT</Text>
            {category == 'other' ? <TextInput 
            style={styles.input}
            value={unit}
            onChangeText={setUnit}
            /> : <Text>{unit}</Text>}
            
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
          <Text style={styles.label}>Price</Text>
            <TextInput 
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            />
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
