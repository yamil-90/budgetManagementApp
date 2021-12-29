import React, {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import globalStyles from '../styles';
import { formatAmount } from '../helpers';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const BudgetController = ({ budget, expenses }) => {

    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);
    const [percentageSpent, setPercentageSpent] = useState(0)
    useEffect(() => {
        const amountSpent = expenses.reduce((total, expense)=>Number(expense.amount) + total, 0)
        setSpent(amountSpent);

        const amountAvailable = budget - amountSpent;
        const resultPercentage = amountAvailable*100/budget
        setAvailable(amountAvailable)
        setTimeout(()=>{
            setPercentageSpent(resultPercentage)
        }, 1000)
    }, [expenses])
    return (
        <View style={globalStyles.container}>
            <View style={styles.centerImage}>
            <AnimatedCircularProgress
            size={220}
            width={15}
            fill={percentageSpent}
            lineCap='round'
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#fff"
            rotation={0} >
                {
                ()=>(
                    <>
                    <Text style={styles.centerProgress}>{Math.round(percentageSpent)}%</Text>
                    <Text>available</Text>
                    </>
                )
            }
            </AnimatedCircularProgress>
            
            </View>
            <View style={styles.textContainer}>

                <Text style={styles.value}>
                    <Text style={styles.label}>Budget: {''}</Text>
                    {formatAmount(budget)}
                </Text>


                <Text style={styles.value}>
                    <Text style={styles.label}>Available: {''}</Text>
                    {formatAmount(available)}
                </Text>


                <Text style={styles.value}>
                    <Text style={styles.label}>Spent: {''}</Text>
                    {formatAmount(spent)}
                </Text>
            </View>
        </View>
    )
}

export default BudgetController

const styles = StyleSheet.create({
    centerImage: {
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150
    },
    textContainer: {
        marginTop:50

    },
    label:{
        fontWeight:'700',
        color:'#3b82f6'
    },
    value:{
        fontSize: 24,
        textAlign:'center',
        marginBottom:10
    },
    centerProgress:{
        fontSize:60
    }
})
