
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, ImageBackground, Image, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, Badge, Header, SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, useNavigation } from 'expo-router';

import PageTab from '../components/PageTab';
import FilterTab from '../components/FilterTab';
import LiquorCabinet from './LiquorCabinet';
import CocktailMenu from './CocktailMenu';
import IngredientForm from "./IngredientForm";


export default function Page() {

  return (
    <View>
      <LiquorCabinet />
    </View>
    
  );
}

