'use client'
import * as z from 'zod';
import { use, useState, useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema, PropertySchema } from '@/schemas/index';
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
import { createProperty } from '@/actions/create-property';


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

export const PropertyForm = () => {
    const token = useCurrentToken();
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    
    const form = useForm<z.infer<typeof PropertySchema>>({
        resolver: zodResolver(PropertySchema),
        defaultValues: {
            type: '',
            country: '',
            city: '',
            address: '',
            latitude: 0.0,
            altitude: 0.0,
            rooms: 2,
            bathrooms: 2,
            area: 0,
            cost_per_night: 100,
            max_people: 10,
            slug: '',
        }
    })

    const onSubmit = (values: z.infer<typeof PropertySchema>) => {
        console.log('Form submitted with values:', values);
        setError('')
        setSuccess('')

        
        const completeValues = {
            ...values,
            user_id: user?.id,
        }
        
       
        startTransition(() => {
            createProperty(completeValues, token)
                .then((data: any) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
    }
    
    return (
        <CardWrapper
            headerLabel="Create a property"
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
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                    <select
                                            {...field}
                                            disabled={isPending}
                                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                        >
                                            <option value="House">House</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Chalet">Chalet</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='country'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled={isPending} placeholder='Country' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='city'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled={isPending} placeholder='City' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" disabled={isPending} placeholder='Address' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='latitude'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Latitude' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        
                       <FormField
                            control={form.control}
                            name='altitude'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Altitude</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Altitude' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='rooms'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rooms</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Rooms' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='bathrooms'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bathrooms</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Bathrooms' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='area'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Area' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='cost_per_night'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost Per Night</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Cost Per Night' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='max_people'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Max People</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} placeholder='Max People' className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <Button disabled={isPending} type='submit' className='w-full' >
                        Create Property
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}