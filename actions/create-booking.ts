import axios from 'axios';

export async function createBooking(formData: any, token: any) {
    const formDataWithEnums = {
        ...formData,
        property_type: getPropertyTypeFromString(formData.property_type),
        payment_method: getPaymentMethodFromString(formData.payment_method)
    };

    // Transformar datos
    const transformedData = {
        ...formDataWithEnums,
        check_in: new Date(formData.check_in),
        check_out: new Date(formData.check_out),
        num_people: parseInt(formData.num_people, 10), // Convertir a número
    };

    console.log("Creando booking con datos:", transformedData);

    try {
        const response = await axios.post(`https://staynest.icybeach-62331649.eastus.azurecontainerapps.io/booking`,
            transformedData, {
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token JWT en el encabezado de autorización
            }
        });

        if (response.status !== 201) {
            throw new Error('Error creating booking');
        }

        return { success: 'Booking created successfully!' };
    } catch (error: any) {
        return { error: error.message };
    }
}

export enum PaymentMethod {
    Credit_card = 'CREDIT_CARD',
    Transfer = 'BANK_TRANSFER',
    Paypal = 'PAYPAL'
}

export enum PropertyType {
    House = 'HOUSE',
    Apartment = 'APARTMENT',
    Chalet = 'CHALET',
}

// Función para convertir una cadena en un enumerado PaymentMethod
function getPaymentMethodFromString(paymentMethodString: string): PaymentMethod {
    switch (paymentMethodString) {
        case 'CREDIT_CARD':
            return PaymentMethod.Credit_card;
        case 'PAYPAL':
            return PaymentMethod.Paypal;
        case 'BANK_TRANSFER':
            return PaymentMethod.Transfer;
        default:
            throw new Error('Invalid payment method string');
    }
}

// Función para convertir una cadena en un enumerado PropertyType
function getPropertyTypeFromString(propertyTypeString: string): PropertyType {
    switch (propertyTypeString) {
        case 'APARTMENT':
            return PropertyType.Apartment;
        case 'HOUSE':
            return PropertyType.House;
        case 'VILLA':
            return PropertyType.Chalet;
        default:
            throw new Error('Invalid property type string');
    }
}