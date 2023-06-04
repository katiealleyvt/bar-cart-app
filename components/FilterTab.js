
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput,  TouchableOpacity, TouchableHighlight, Pressable, Touchable } from 'react-native';
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
         <Pressable style={styles.addButton}>
          <Image source={require('../assets/Add_icon.png')} style={{resizeMode: 'center', alignSelf: 'center', bottom: 5, width: 30, height: 30}}/>
         </Pressable>
        <CheckBox 
        title="In Stock Only" 
        checked={inStock}
        onPress={updateInStock}
        containerStyle={styles.checkbox}
        textStyle={styles.checkboxText}
        iconRight
        checkedIcon={<Image style={styles.checkboxIcon} source={require('../assets/Checkbox_checked.png')} />}
        uncheckedIcon={<Image style={styles.checkboxIcon} source={require('../assets/Checkbox_unchecked.png')} />}
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
      border: 'none',
    },
    checkbox: {
      backgroundColor: 'transparent',
      border: 'none',
      borderWidth: 0,
      marginHorizontal: 0,
      paddingHorizontal: 0
    },
    checkboxText: {
      fontFamily: 'Indivisible',
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    checkboxIcon: {
      resizeMode: 'contain',
      width: 22
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
      height: 30,
      border: 'none',
    },
    searchInput: {
    },
    addContainer: {
      flexDirection: 'row',
      border: 'none',
      top: 125,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 5,
      width: 200,
      height: 40,
      backgroundColor: '#FFFFFF'
    }
});
