import {ADD_COUNTRIES, ADD_VEHICLE_TYPES} from "../actions";

const initialState = {
    countries: [],
    vehicleTypes:[],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries,
            };

        case ADD_VEHICLE_TYPES:
            return {
                ...state,
                vehicleTypes: action.payload.vehicleTypes,
            };
        default:
            return {
                ...state,
            };
    }
}
