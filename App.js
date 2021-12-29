/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import BudgetController from './src/components/BudgetController';
import ExpenseForm from './src/components/ExpenseForm';
import { generateRandomId } from './src/helpers';
import ListExpenses from './src/components/ListExpenses';
import Filter from './src/components/Filter';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [isBudgetValid, setIsBudgetValid] = useState(false);
  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState([])
  const [modal, setModal] = useState(false);
  const [expense, setExpense] = useState({});
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    const getExpensesStorage = async () => {
      try {
        const expensesStorage = await AsyncStorage.getItem('expenses_planner') ?? []
        
        
          setExpenses(expensesStorage? JSON.parse(expensesStorage): []);
        
      } catch (err) {
        console.log(err);
      }
    }
    getExpensesStorage()
  }, [])

  useEffect(() => {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('expenses_planner', JSON.stringify(expenses))
        } catch (err) {
          console.log(err);
        }
      }
      saveBudgetStorage();
    
  }, [expenses])

  useEffect(() => {
    const getBudgetStorage = async () => {
      try {
        const budgetStorage = await AsyncStorage.getItem('budget_planner') ?? false
        
        if (Number(budgetStorage) > 0) {
          setBudget(budgetStorage);
          setIsBudgetValid(true)
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBudgetStorage()
  }, [])

  useEffect(() => {
    if (isBudgetValid) {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('budget_planner', budget)
          console.log('savebudget');
        } catch (err) {
          console.log(err);
        }
      }
      saveBudgetStorage();
    }
  }, [isBudgetValid])

  // console.log('expenses son',expenses);
  const handleNewBudget = (budget) => {
    if (Number(budget) > 0){
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
    if (expense.id) {
      const expensesUpdated = expenses.map(expenseState => {
        return expense.id === expenseState.id ? expense : expenseState

      });
      setExpenses(expensesUpdated);
      // console.log(expensesUpdated);
    } else {
      expense.id = generateRandomId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }
    setModal(!modal)
  }
  const deleteExpense = (id) => {
    Alert.alert(
      'Are you sure you want to delete this expense',
      'Deleted expenses cannot be recovered',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Delete', onPress: () => {
            const updatedExpenses = expenses.filter((expenseState) => {
              expenseState.id !== id
            })
            setExpenses(updatedExpenses)
            setModal(!modal)
            setExpense({})
          }
        }
      ]
    )
  }

  const resetStorage = ()=>{
    Alert.alert(
      'Do you wish to reset the app?',
      'this will delete all the data',
      [
        {
          text: 'no', style: 'cancel'
        },
        {
          text:'Yes, delete', onPress: async()=>{
            try {
              await AsyncStorage.clear();
              // reset all the states
              setIsBudgetValid(false)
              setBudget(0)
              setExpenses([])
            } catch (err) {
              console.log(err);
            }
          }
        }
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
              resetStorage={resetStorage}
            />
          ) : (
            <NewBudget
              handleNewBudget={handleNewBudget}
              budget={budget}
              setBudget={setBudget}
            />
          )}
        </View>
        {isBudgetValid && (<>
          <Filter
            filter={filter}
            setFilter={setFilter}
            expenses={expenses}
            setFilteredExpenses={setFilteredExpenses}
          />
          <ListExpenses
            expenses={expenses}
            setModal={setModal}
            setExpense={setExpense}
            filter={filter}
            filteredExpenses={filteredExpenses}

          /></>
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
