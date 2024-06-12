'use client'
import * as z from 'zod';
import { use, useState, useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema } from '@/schemas/index';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { createBooking } from '@/actions/create-booking';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentToken } from '@/hooks/use-current-token';


interface Property {
    id: string;
    name: string;
    cost_per_night: number;
    city: string;
    country: string;
    image: string;
    type: string;
    address: string;
    latitude: number;
    longitud: number;
    rooms: number;
    bathrooms: number;
    area: number;
    max_people: number;
    slug: string;
}

interface PropertyInfoProps {
    property?: Property | null
}

export const BookingForm = ({property} : PropertyInfoProps) => {
    const token = useCurrentToken();
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof BookingSchema>>({
        resolver: zodResolver(BookingSchema),
        defaultValues: {
            check_in: '',
            check_out: '',
            property_type: property?.type as "APARTMENT" | "HOUSE" | "CHALET" | '' ,
            property_id: property?.id as string | undefined,
            user_id: user?.id,
            num_people: 2,
            payment_method: 'CREDIT_CARD',
            is_paid: true,
            is_confirmed: true
        }
    })

    const onSubmit = (values: z.infer<typeof BookingSchema>) => {
        console.log('Form submitted with values:', values);
        setError('')
        setSuccess('')

        const completeValues = {
            ...values,
            property_id: property?.id,
            user_id: user?.id,
            property_type: property?.type as "APARTMENT" | "HOUSE" | "CHALET" | '' ,
            is_paid: true,
            is_confirmed: true

        }
        
       
        startTransition(() => {
            
            createBooking(completeValues, token)
                .then((data: any) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
    }
    
    return (
        <CardWrapper
            headerLabel="Create a booking"
            backButtonLabel=""
            backButtonHref=""
            showSocial
        >
            <Form {...form} >
            <form onSubmit={(event) => {
                event.preventDefault(); // Prevenir el comportamiento de envío predeterminado
                const formElement = event.target as HTMLFormElement; // Comprobación de tipo
                const formData = new FormData(formElement);
                const values: any = {};
                formData.forEach((value, key) => {
                    values[key] = value;
                });
                onSubmit(values);
            }} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name='check_in'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check in</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="date" disabled={isPending} placeholder='Check in' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='check_out'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check out</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="date" disabled={isPending} placeholder='Check out' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        
                        <FormField
                            control={form.control}
                            name='num_people'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of people</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number"  disabled={isPending} placeholder='Number of people' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='payment_method'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment method</FormLabel>
                                    <FormControl>
                                    <select
                                            {...field}
                                            disabled={isPending}
                                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        >
                                            <option value="CREDIT_CARD">CREDIT_CARD</option>
                                            <option value="PAYPAL">PAYPAL</option>
                                            <option value="BANK_TRANSFER">BANK TRANSFER</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <Button disabled={isPending} type='submit' className='w-full' >
                        Create a booking
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}