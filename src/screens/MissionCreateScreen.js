import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, FlatList, TouchableOpacity} from "react-native";
import { Button as Btn, ThemeProvider } from 'react-native-elements';
import { Context as BusReportContext } from '../context/BusReportContext';
import { Feather } from '@expo/vector-icons';


const theme = {
    Button: {
        raised: true,
    },
};


const MissionCreateScreen = ({navigation}) => {

    const {state, addBusReport, deleteBusReport} = useContext(BusReportContext);


    return (
        <>

            <ThemeProvider theme={theme}>
                <Btn
                    buttonStyle={styles.btn} containerStyle={styles.container}
                    titleStyle={styles.txt} raised={false} type="outline"
                    title="New Report" onPress={() => navigation.navigate('CreateMissionForm')}
                />
            </ThemeProvider>

            <FlatList
                data={state}
                keyExtractor={(busReport) => busReport.license_plate}
                renderItem={({ item }) => {
                    return <View style={styles.row}>
                        <Text style={styles.title}>
                            {item.license_plate} - {item.report_type}
                        </Text>
                        <TouchableOpacity onPress={() => deleteBusReport(item.license_plate)}>
                            <Feather style={styles.icon} name="trash" />
                        </TouchableOpacity>
                    </View>
                }}
            />
        </>
    );
};

MissionCreateScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateMissionForm')}>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 14,
        borderTopWidth: 1,
        borderColor: 'gray'


    },
    title: {
      fontSize: 18
    },
    icon: {
        fontSize: 24
    },

    btn: {
        marginVertical: 7,
        marginHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        width: 240,

    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',

        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 4,

    }

    ,
    txt: {
        fontSize: 20
    }
});

export default MissionCreateScreen ;


