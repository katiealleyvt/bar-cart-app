
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput,  TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, SearchBar, CheckBox, BottomSheet, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;



export default function FilterTab({ filterData, sortInStock, showSettingsIcon }) {

  const [search, setSearch] = React.useState("");
  const [inStock, setInStock] = React.useState(false);
  const [settingShow, setSettingShow] = React.useState(false);
  const settings = [
    {title: 'Sort A-Z'},
    {title: 'Sort High-Low'},
    {title: 'Sort Low-High'},
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setSettingShow(false),
    },
  ]

  updateSearch = (search) => {
    setSearch({ search });
    filterData(search);
  };
  updateInStock = () => {
    if(inStock){
      setInStock(false);
      sortInStock(false);
    }
    else{
      setInStock(true);
      sortInStock(true);
    }
  };

  return (
    <View>
      <View style={styles.searchContainer}>
      <SearchBar  
      onChangeText={updateSearch} 
      value={search}
      lightTheme
      containerStyle={styles.searchBar}
      inputContainerStyle={styles.searchInputContainer}
      inputStyle={styles.searchInput}
      showCancel
      round
      />
     
      </View>
      
      <View style={styles.addContainer}>
        <Button
         title="Add" 
         buttonStyle={styles.addButton}
         />
        <CheckBox 
        title="In Stock Only" 
        checked={inStock}
        onPress={updateInStock}
        containerStyle={styles.checkbox}
        textStyle={styles.checkboxText}
        iconRight
        />
      </View>

      <BottomSheet isVisible={settingShow}>
  {settings.map((l, i) => (
    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
      <ListItem.Content>
        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ))}
</BottomSheet>
      
    </View>
  );
}

const styles = StyleSheet.create({
    searchBar: {
      width: '100%',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 100,
      border: 'none'
    },
    checkbox: {
      backgroundColor: 'transparent',
      border: 'none',
      borderWidth: 0
    },
    checkboxText: {
      fontFamily: 'Indivisible',
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    searchContainer: {
      flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        border: 'none',
    },
    searchInputContainer: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: 20,
      border: 'none'
    },
    searchInput: {
    },
    addContainer: {
      flexDirection: 'row',
      border: 'none'
    },
    addButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 10,
      marginHorizontal: 10,
      width: '90%',
      
    }
});
