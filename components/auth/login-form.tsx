'use client'
import* as z from 'zod';

import { useSearchParams } from "next/navigation"
import { use, useState, useTransition } from 'react';
import { CardWrapper } from "./card-wrapper"
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucceess } from '../form-success';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/schemas';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { login } from '@/actions/login';


export const LoginForm = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" 
        ? "Email already in use with different provider" : ""

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        // Aqui estoy usando server actions para consumir la data
        // Pero en nuestro caso seria una llamada a la API
        // asi, axios.post('/api/login', values)

        setError('')
        setSuccess('')

        //TODO: preguntar al profe
        startTransition(async () => {
           const loginError:any = await login(values)
              if ('error' in loginError) {
                setError(loginError.error)
              } else {
                setSuccess(loginError.success)
              }
             
        });
        
    }

    return (
        <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                 className='space-y-6'>
                    <div className='space-y-4'>
                        <FormField
                         control={form.control}
                          name='email'
                          render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                     {...field}
                                     disabled={isPending}
                                     placeholder='hola@comoestas.com'
                                     type='email'/>
                                    
                                </FormControl>
                                <FormMessage/>

                                
                            </FormItem>
                          )}
                        />
                        <FormField
                         control={form.control}
                          name='password'
                          render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                     {...field}
                                     disabled={isPending}
                                     placeholder='******'
                                     type='password'/>
                                    
                                </FormControl>
                                <FormMessage/>

                                
                            </FormItem>
                          )}
                        />

                    </div>
                    <FormError message={error || urlError}/>
                    <FormSucceess message={success}/>
                    
                    <Button disabled={isPending} type='submit' className='w-full'>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}