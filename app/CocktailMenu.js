
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, ImageBackground, Image, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';

import Cocktail from '../components/Cocktail';
import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';
import Form from './CocktailForm';


export default function CocktailMenu() {

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
