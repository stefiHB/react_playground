import React, {useContext, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text, TextInput, Button, FlatList, Picker} from "react-native";
import { Context as BusReportContext} from './../context/BusReportContext'
import ReportCategoryForm from '../components/ReportCategoryForm';
import {useForm, FormProvider, Controller} from "react-hook-form";


const REPORT_TYPES = [
    {
        id: 1,
        type: 'Broken Light',
        options: [
            {id: 1, value: 'This is a long text that represents an option'},
            {id: 2, value: 'That is a long text that represents an option'},
            {id: 3, value: 'Those are long texts that represents many options'},
            {id: 5, value: 'These are not many options '},
        ]
    },
    {
        id: 2,
        type: 'Illegal move',
        options: [
            {id: 1, value: 'This is a long text that represents an option'},
            {id: 2, value: 'That is a long text that represents an option'},
            {id: 3, value: 'Those are long texts that represents many options'},
            {id: 5, value: 'These are not many options '},
        ]
    },
    {
        id: 3,
        type: 'Bad behaviour',
        options: [
            {id: 1, value: 'This is a long text that represents an option'},
            {id: 2, value: 'That is a long text that represents an option'},
            {id: 3, value: 'Those are long texts that represents many options'},
            {id: 5, value: 'These are not many options '},
        ]
    },
    {
        id: 5,
        type: 'Expired MOT',
        options: [
            {id: 1, value: 'This is a long text that represents an option'},
            {id: 2, value: 'That is a long text that represents an option'},
            {id: 3, value: 'Those are long texts that represents many options'},
            {id: 5, value: 'These are not many options '},
        ]
    },
    {
        id: 7,
        type: 'Something',
        options: [
            {id: 1, value: 'This is a long text that represents an option'},
            {id: 2, value: 'That is a long text that represents an option'},
            {id: 3, value: 'Those are long texts that represents many options'},
            {id: 5, value: 'These are not many options '},
        ]
    },
    {
        id: 8,
        type: 'Other',
        options: [
            {id: 1, value: 'This is a long text that represents an option'},
            {id: 2, value: 'That is a long text that represents an option'},
            {id: 3, value: 'Those are long texts that represents many options'},
            {id: 5, value: 'These are not many options '},
        ]
    },
];

const LICENSE_PLATES = [
    {id: 2,  value: 'KPW782'},
    {id: 13, value: 'NPM342'},
    {id: 23, value: 'MNM093'},
    {id: 20, value: 'LOM231'},
    {id: 45, value: 'NAP119'},
    {id: 8,  value: 'NAL006'},
];

const MissionFormScreen = ({}) => {

    const formMethods = useForm({mode: 'onBlur'});
    const {control, handleSubmit} = formMethods;

    const onSubmit = data => console.log('form ', data);

    const { addBusReport } = useContext(BusReportContext);

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <FormProvider {...formMethods}>


                <Text style={styles.label}>Enter License Plate  </Text>
                <Controller
                    name="license_plate"
                    control={control}
                    render={ ({field: {onChange, value}}) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            <Picker.Item
                                label=" - - - - - - "
                                value={null}
                                key={null}
                            />
                            {LICENSE_PLATES.map((lp) => {
                                return ( <Picker.Item
                                    label={lp.value}
                                    value={lp.id}
                                    key={lp.id}
                                />)
                            })}
                        </Picker>
                    )}
                />

                <FlatList
                    data={REPORT_TYPES}
                    keyExtractor={(reportType) => (reportType.id).toString()}
                    renderItem={ ({item}) => {
                        return <ReportCategoryForm
                            reportId={item.id}
                            reportType={item.type}
                            reportOptions={item.options}
                        />
                    }}
                />


                </FormProvider>


                <Button
                    title="Submit Report"
                    onPress={handleSubmit(onSubmit)}
                />

        </View>
    </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    container: {
        marginBottom: 235
    }
});

export default MissionFormScreen  ;


