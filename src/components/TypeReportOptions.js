import React from 'react';
import { CheckBox} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {useFormContext, Controller} from "react-hook-form";

const TypeReportOptions = ({reportTypeId, optionValue, optionId}) => {

    const { control } = useFormContext();

    return (
        <View style={styles.container}>
            <Controller
                name={'type_' + reportTypeId+ '_option_' + optionId}
                control={control}
                render={ ({field: {onChange, value}}) => (
                    <CheckBox
                        checked={value}
                        onPress={() => {
                            onChange(!value);
                            console.log('Pressed', optionId);
                        }}
                        checkedColor='orange'
                        title={optionValue}
                    />
                )}
            />
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
    }
});

export default TypeReportOptions;
