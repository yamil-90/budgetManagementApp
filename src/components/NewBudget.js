import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'


import globalStyles from '../styles'

const NewBudget = ({ handleNewBudget, budget, setBudget }) => {



    return (
        <View style={globalStyles.container}>
            <Text style={styles.label}>Define budget</Text>
            <TextInput
                keyboardType='numeric'
                placeholder='add budget'
                style={styles.input}
                value={budget.toString()}
                onChangeText={setBudget}
                multiline={true}
            />
            <Pressable
                onPress={() => {
                    handleNewBudget(budget)
                }}
                style={styles.btn}
            >
                <Text style={styles.btnText}>Add Budget</Text>
            </Pressable>
        </View>
    )
}

export default NewBudget

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        textAlign: 'center'
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3b82f6',
        marginBottom: 10
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#1048a4',
        padding: 10,
        borderRadius: 10
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
