import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../styles';

const ExpenseForm = ({
    handleExpense,
    setModal,
    setExpense,
    expense,
    deleteExpense
}) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('');
    const [id, setId] = useState('');
    const [date, setDate] = useState('')

    useEffect(() => {
        if (expense?.name) {
            setName(expense.name);
            setCategory(expense.category);
            setAmount(expense.amount)
            setId(expense.id);
            setDate(expense.date)
        } else {
            console.log('algo');
        }
    }, [expense])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.btnContainer}>
                <Pressable style={[styles.btn, styles.btnCancel]}
                    onPress={() => {
                        setExpense({})
                        setId('')
                        setModal(false)
                    }}>

                    <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
                {expense?.name && <Pressable style={[styles.btn, styles.btnDelete]}
                    onPress={() => {
                        deleteExpense(id)
                    }}>
                    <Text style={styles.btnText}>Delete</Text>
                </Pressable>}
            </View>
            <View style={globalStyles.container}>
                <Text style={styles.title}>{expense?.name ? 'Edit Expense' : 'New Expense'}</Text>
                <View style={styles.field}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Name of the expense. eg. Food'
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Amount spent'
                        keyboardType='numeric'
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Expense category</Text>
                    <View style={styles.pickerView}>
                        <Picker
                            style={styles.input}
                            selectedValue={category}
                            onValueChange={(value) => {
                                setCategory(value)
                            }}
                        >
                            <Picker.Item label="-- Select --" value="" />
                            <Picker.Item label="Savings" value="savings" />
                            <Picker.Item label="Food" value="food" />
                            <Picker.Item label="Clothes" value="clothes" />
                            <Picker.Item label="Rent" value="rent" />
                            <Picker.Item label="Leisure" value="leisure" />
                            <Picker.Item label="Misc" value="misc" />
                        </Picker>
                    </View>
                </View>
                <Pressable
                    style={styles.submitBtn}
                    onPress={() => handleExpense({ name, amount, category, id, date })}>
                    <Text style={styles.submitBtnText}>{expense?.name ? 'Edit Expense' : 'Add Expense'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e40af',
        flex: 1
    },
    form: {

    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        marginVertical: 30,
        color: '#64748b'
    },
    field: {
        marginVertical: 10
    },
    label: {
        color: '#64748b',
        textTransform: 'uppercase',
        fontSize: 16
    },
    pickerView: {

        borderRadius: 10,
        overflow: 'hidden',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
    },
    submitBtn: {
        backgroundColor: '#3b82f6',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        textTransform: 'uppercase',
        fontSize: 15
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        flex: 1,
        padding: 10,
        marginTop: 30,
        borderRadius: 10,
        marginHorizontal: 10
    },
    btnCancel: {
        backgroundColor: '#db2777',
    },
    btnDelete: {
        backgroundColor: 'red'
    },
    btnText: {
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
    }
})
