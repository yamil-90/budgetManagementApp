/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import BudgetController from './src/components/BudgetController';

const App= () => {
  const [isBudgetValid, setIsBudgetValid] = useState(false);
  const [budget, setBudget] = useState('')
    const handleNewBudget=(budget)=>{
        if(Number(budget)>0){
          console.log('valid');
          setIsBudgetValid(true)
        }else{
          Alert.alert('Error', 'budget must be a number greater than 0')
          
        }
    }

  return (
    
        <View style={styles.container}>
          <View style={styles.header}>
          <Header/>
         {isBudgetValid ? (
         <BudgetController
         budget={budget}
         setBudget={setBudget}
         />
         ) : (
          <NewBudget
          handleNewBudget={handleNewBudget}
          budget={budget}
          setBudget={setBudget}
         />
         )}
          </View>
        </View>
   
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5'
  },
  header: {
    backgroundColor: '#3b82f6',
},
});

export default App;
