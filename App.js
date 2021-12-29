/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import BudgetController from './src/components/BudgetController';
import ExpenseForm from './src/components/ExpenseForm';
import { generateRandomId } from './src/helpers';
import ListExpenses from './src/components/ListExpenses';
import Filter from './src/components/Filter';


const App = () => {
  const [isBudgetValid, setIsBudgetValid] = useState(false);
  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState([])
  const [modal, setModal] = useState(false);
  const [expense, setExpense] = useState({})

  const handleNewBudget = (budget) => {
    if (Number(budget) > 0) {
      console.log('valid');
      setIsBudgetValid(true);
    } else {
      Alert.alert('Error', 'budget must be a number greater than 0')

    }
  }
  const handleExpense = (expense) => {
    if ([expense.name, expense.amount, expense.category].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }
    if(expense.id){
      const expensesUpdated = expenses.map(expenseState => {
        return expense.id === expenseState.id ? expense : expenseState
        
      });
      setExpenses(expensesUpdated);
      // console.log(expensesUpdated);
    }else{
      expense.id = generateRandomId()
    expense.date = Date.now()
    setExpenses([...expenses, expense])
    }
    setModal(!modal)
  }
  const deleteExpense = (id)=>{
    Alert.alert(
      'Are you sure you want to delete this expense',
      'Deleted expenses cannot be recovered',
      [
        {text: 'No', style:'cancel'},
        {text: 'Delete', onPress: ()=>{
          const updatedExpenses = expenses.filter((expenseState)=>{
            expenseState.id !== id
          })
          setExpenses(updatedExpenses)
          setModal(!modal)
          setExpense({})
        }}
      ]
    )
  }
  return (

    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isBudgetValid ? (
            <BudgetController
              budget={budget}
              setBudget={setBudget}
              expenses={expenses}
            />
          ) : (
            <NewBudget
              handleNewBudget={handleNewBudget}
              budget={budget}
              setBudget={setBudget}
            />
          )}
        </View>
        <Filter/>
        {isBudgetValid && (
          <ListExpenses
            expenses={expenses}
            setModal={setModal}
            setExpense={setExpense}

          />
        )}
      {modal && (
        <Modal
        animationType='slide'
        visible={modal}>
          <ExpenseForm
            modal={modal}
            setModal={setModal}
            handleExpense={handleExpense}
            expense={expense}
            setExpense={setExpense}
            deleteExpense={deleteExpense}
            />
        </Modal>
      )}
      </ScrollView>
      {isBudgetValid &&
        <Pressable
          onPress={() => setModal(!modal)}
          style={styles.btn}>
          <Image
            source={require('./assets/nuevo-gasto.png')}
            style={styles.image}
          />
        </Pressable>
      }
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#3b82f6',
    minHeight: 400
  },
  image: {
    height: 60,
    width: 60,

  },
  btn: {

    position: 'absolute',
    right: 10,
    bottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default App;
