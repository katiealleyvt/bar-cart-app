
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Touchable } from 'react-native';
import { Card, ListItem, Icon, Badge, Header } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router' ;



export default function PageTab(props) {

    const router = useRouter();

  return (
    <View style={styles.pagetab}>
        <TouchableOpacity style={styles.button} onPress={() => {
          router.push("/LiquorCabinet");
        }}>
            <Text>LiquorCabinet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          router.push("/CocktailMenu");
        }}>
            <Text>CocktailMenu</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    pagetab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    button: {
        marginHorizontal: 10,
    }
    
});
