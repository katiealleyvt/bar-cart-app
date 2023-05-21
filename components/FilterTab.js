
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, SearchBar, CheckBox, BottomSheet } from 'react-native-elements';
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
      placeholder="Search Here..." 
      onChangeText={updateSearch} 
      value={search}
      lightTheme
      containerStyle={styles.searchBar}
      showCancel
      round
      />
      <Button title="..." onPress={() => (setSettingShow(true))} disabled={!showSettingsIcon}/>
      </View>
      
      <View style={{alignItems: 'flex-end'}}>
        <CheckBox 
        title="In Stock" 
        checked={inStock}
        onPress={updateInStock}
        containerStyle={styles.checkbox}
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
      width: 300
    },
    checkbox: {
      backgroundColor: 'transparent',
      border: 'none',
      borderWidth: 0
    },
    searchContainer: {
      flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
