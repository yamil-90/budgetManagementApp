import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Expense from './Expense'

const ListExpenses = ({ expenses, setModal, setExpense }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listing</Text>
            {expenses.length === 0 ?
                <Text style={styles.noExpenses}>No expenses yet</Text> :
                expenses.map(expense => {
                    return (
                        <Expense
                            key={expense.id}
                            expense={expense}
                            setModal={setModal}
                            setExpense={setExpense}
                        />)
                })}
        </View>
    )
}

export default ListExpenses

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 100
    },
    title: {
        color: '#64748b',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700'

    },
    noExpenses: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    }
})
