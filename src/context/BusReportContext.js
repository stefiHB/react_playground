import React from 'react';
import createDataContext from './createDataContext';


const busReportReducer = (state, action) => {

    switch (action.type) {
        case 'add_bus_report':
            console.log('ADDING REPORT');
            return [...state,
                {
                    license_plate: action.payload.license_plate,
                    report_type: action.payload.report_type,
                    hasImage: false
                }];
        case 'delete_bus_report':
            return state.filter((busReport) => busReport.license_plate !== action.payload);
        default:
            return state;
    }

};

const addBusReport = (dispatch) => {
    return (license_plate, report_type) => {
        dispatch({type:'add_bus_report', payload: {license_plate, report_type}});
    }
};

const deleteBusReport = (dispatch) => {
    return (license_plate) => {
        dispatch({type:'delete_bus_report', payload: license_plate});
    }
};




export const { Context, Provider } = createDataContext(
    busReportReducer,
    {addBusReport, deleteBusReport},
    [
        { license_plate: 'KPW124', report_type: 34, hasImage: false },
        { license_plate: 'NPM543', report_type: 34, hasImage: false }
        ]
    );

