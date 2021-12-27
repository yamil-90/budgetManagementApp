import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from './styles'

const BudgetController = () => {
    return (
        <View style={globalStyles.container}>
            <View style={styles.centerImage}>
                <Image 
                    source={require('../../assets/grafico.jpg')}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

export default BudgetController

const styles = StyleSheet.create({
    centerImage:{
        alignItems:'center'
    },
    image:{
        width:150,
        height:150
    }
})
