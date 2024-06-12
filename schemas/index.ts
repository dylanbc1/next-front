import * as z from 'zod';


export const SettingsSchema = z.object({
    name: z.optional(z.string())
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string({
        message: 'Please enter a password'
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(6,{
        message: 'Password must be at least 6 characters long'
    }),
    name: z.string().min(2,{
        message: 'Name is required'
    })
})

export const BookingSchema = z.object({
    check_in: z.string().min(1, 'Check-in date is required'),
    check_out: z.string().min(1,'Check-out date is required'),
    property_type: z.enum(['APARTMENT', 'HOUSE', 'CHALET', '']),
    property_id: z.string().min(1,'Property ID is required'),
    user_id: z.string().min(1,'User ID is required'),
    num_people: z.number().min(1, 'Number of people must be at least 1'),
    payment_method: z.enum(['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER']),
    is_paid: z.boolean().optional(),
    is_confirmed: z.boolean().optional(),
});

export const PropertySchema = z.object({
    type: z.string().min(1, 'Type is required'),
    country: z.string().min(1,'Country is required'),
    city: z.string().min(1,'City is required'),
    address: z.string().min(1,'Address is required'),
    latitude: z.number().min(1,'Latitude is required'),
    altitude: z.number().min(1,'Altitude is required'),
    rooms: z.number().min(1,'Rooms is required'),
    bathrooms: z.number().min(1,'Bathrooms is required'),
    area: z.number().min(1,'Area is required'),
    cost_per_night: z.number().min(1,'Cost per night is required'),
    max_people: z.number().min(1,'Cost per night is required'),
    slug: z.string().optional(),
});