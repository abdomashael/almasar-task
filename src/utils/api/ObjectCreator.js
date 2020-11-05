const TransportationCompanyDetailsDTO = (ID,
                                         Name,
                                         Address,
                                         Country,
                                         City,
                                         TelephoneNumber,
                                         ContactPerson_Name,
                                         ContactPerson_TelephoneNumber,
                                         ContactPerson_Email,
                                         TransportationCompanyBuses,
                                         FK_OperatorID,
                                         FK_UmrahCompanyID,
                                         FK_TravelAgencyID,
                                         Masked_ID) => {
    return {
        "ID": ID,
        "Name": Name,
        "Address": Address,
        "Country": Country,
        "City": City,
        "TelephoneNumber": TelephoneNumber,
        "ContactPerson_Name": ContactPerson_Name,
        "ContactPerson_TelephoneNumber": ContactPerson_TelephoneNumber,
        "ContactPerson_Email": ContactPerson_Email,
        "TransportationCompanyBuses": TransportationCompanyBuses,
        // "FK_OperatorID": FK_OperatorID,
        // "FK_UmrahCompanyID": FK_UmrahCompanyID,
        // "FK_TravelAgencyID": FK_TravelAgencyID,
        // "Masked_ID": Masked_ID
    }
}


const TransportationCompanyBusesDTO = (ID,
                                       BusTypeID,
                                       Brand,
                                       Number_Of_Seats,
                                       Number_Of_Seats_Per_Raw,
                                       Total_Number_Of_Buses,
                                       Bus_Layout,
                                       Notes,
                                       YearModel,
                                       Description) => {
    return {
        "ID": ID,
        "BusTypeID": BusTypeID,
        "Brand": Brand,
        "Number_Of_Seats": Number_Of_Seats,
        "Number_Of_Seats_Per_Raw": Number_Of_Seats_Per_Raw,
        "Total_Number_Of_Buses": Total_Number_Of_Buses,
        "Bus_Layout": Bus_Layout,
        "Notes": Notes,
        "YearModel": YearModel,
        "Description": Description
    }
}

export {TransportationCompanyDetailsDTO,TransportationCompanyBusesDTO}
