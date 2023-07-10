
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, TextInput, Button, TouchableOpacity, Image, Pressable} from 'react-native';
import { Card, ListItem, Icon, Badge, Text, BottomSheet } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter} from 'expo-router' ;
import { useNavigation, useRoute } from '@react-navigation/native';


export default function CardView(props) {

  const navigation = useNavigation();
  const route = useRoute();
  const ingredientId = route.params?.ingredientId;

  const [ingredient, setIngredient] = React.useState({
    description: "",
    img: "",
    name: "",
    type: "",
    price: 0,
    quantity: 0,
    inStock: true
  });

  useEffect(() => {
    if (ingredientId) {
      fetchIngredient(ingredientId);
    }
  }, [ingredientId]);

  const fetchIngredient = (id) => {
    const db = SQLite.openDatabase('barCart.db');

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients WHERE id = ?',
        [id],
        (_, { rows }) => {
          const ingredient = rows.item(0);
          console.log(ingredient);
          setIngredient(ingredient);
        },
        (_, error) => {
          
          
        }
      );
      
    });
    
  };

  const routeBack = () => {
    navigation.navigate('LiquorCabinet');
  }

  //InStock/OutofStock show
  let inStock = ingredient.stock ? "In Stock" : "Out of Stock";
  const perUnitCost = (ingredient.price / (ingredient.quantity *.033814)).toFixed(2);

  return (
    <Card containerStyle={[styles.card, {backgroundColor: `rgb(255,255,255)`}]}>
      {ingredient.img == "" ? <Image source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} style={styles.image}/> : <Image source={{ uri: ingredient.img }} style={styles.image} />}
      <View style={styles.row}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
        

        <View style={{marginLeft: 15, display: 'flex', flexDirection: 'column'}}>
          
          <Text style={{fontWeight: 'bold', fontSize: 30}}>{ingredient.name}</Text>
          <Text style={styles.cardText}>Description: {ingredient.description}</Text>
          <Text style={styles.cardText}>Type: {ingredient.type}</Text>
          <Text style={styles.cardText}>Quantity: {ingredient.quantity} {ingredient.unit}</Text>
          <Text style={styles.cardText}>Price: ${ingredient.price}</Text>
          {ingredient.type === 'liquor' && <Text style={styles.cardText}>Per unit cost: ${perUnitCost}</Text>}
          <Text style={styles.cardText}>{ingredient.inStock ? "In Stock" : "Out of Stock"}</Text>
        </View>
        </View>
      </View>
      <Button onPress={routeBack} title="Go Back" />

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
  height: 600,
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
