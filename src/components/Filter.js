import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../styles';

const Filter = ({filter, setFilter, setFilteredExpenses, expenses}) => {
    useEffect(() => {
        if(filter===''){
setFilteredExpenses([])
        }else{
            const filteredExpensesTemp = expenses.filter((value)=>{
                return value.category ===filter;
            })
            setFilteredExpenses(filteredExpensesTemp)
        }
    }, [filter])
    return (
        <View style={styles.container}>
            <Picker
                            // style={styles.input}
                            selectedValue={filter}
                            onValueChange={(value) => {
                                setFilter(value)
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
            <Text>Filter expenses</Text>
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
        transform:[{translateY:0}],
        marginTop:80
    },
    label:{
        fontSize:22,
        fontWeight:'900',
        color:'#64748b'
    }
})
