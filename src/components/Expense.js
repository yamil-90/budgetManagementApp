import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import globalStyles from '../styles';
import { formatAmount, formatDate } from '../helpers';

const iconsDictionary = {
    savings: require('../../assets/icono_ahorro.png'),
    food: require('../../assets/icono_comida.png'),
    clothes: require('../../assets/icono_gastos.png'),
    rent: require('../../assets/icono_casa.png'),
    leisure: require('../../assets/icono_ocio.png'),
    health: require('../../assets/icono_salud.png'),
    misc: require('../../assets/icono_suscripciones.png'),

}

const Expense = ({ expense, setModal, setExpense }) => {
    const { name, category, id, amount, date } = expense
    
const handleActions=()=>{
    setExpense(expense)
    setModal(true)
}

    return (
        <Pressable
        onPress={handleActions}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={iconsDictionary[category]}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.category}>{category}</Text>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.date}>{formatDate(date)}</Text>
                        </View>
                    </View>
                    <Text style={styles.amount}>{formatAmount(amount)}</Text>

                </View>

            </View>
        </Pressable>
    )
}

export default Expense

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        marginBottom: 20
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1

    },
    image: {
        height: 50,
        width: 50,
        marginRight: 20
    },
    textContainer: {
        flex: 1
    },
    category: {
        color: '#94a3b8',
        fontSize: 18,
        textTransform: 'uppercase',
        marginBottom: 5,
        fontWeight: '700'
    },
    name: {
        fontSize: 22,
        color: '#64748b',
        marginBottom: 5
    },
    amount: {
        fontSize: 20,
        fontWeight: '700'
    },
    date: {
        fontWeight: '700',
        color: '#db2777'
    }
})
