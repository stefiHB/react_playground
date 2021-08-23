import React from 'react';
import { Text, Input} from "react-native-elements";
import {FlatList, StyleSheet, View} from "react-native";
import {useFormContext, Controller} from "react-hook-form";
import TypeReportOptions from "./TypeReportOptions";

const ReportCategoryForm = ({reportId, reportType, reportOptions}) => {

    const { control } = useFormContext();
    console.log(reportOptions);


    return (
        <View style={styles.container}>

            <Text>{reportType}</Text>


            <FlatList
                data={reportOptions}
                keyExtractor={(reportOption) => reportId + '_' + reportOption.id.toString()}
                renderItem={ ({item}) => {
                    return <TypeReportOptions
                                reportTypeId={reportId}
                                optionValue={item.value}
                                optionId={item.id}
                    />

                }}
            />

            <Controller
                name={reportId + '_comments'}
                control={control}
                render={ ({field: {onChange, value}}) => (
                    <Input
                        label="Comments"
                        value={value}
                        onChangeText={onChange}
                    />
                    )}
            />

        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        margin: 9,
        marginHorizontal: 19,
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderColor: 'gray',
        borderTopWidth: 1
    }
});

export default ReportCategoryForm;
