import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <SafeAreaView >
            <Text style={styles.text}>Budget manager</Text>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    
    text: {
        textAlign: 'center',
        fontSize: 30,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 10
    }
})
