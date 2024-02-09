'use client'

import { signIn } from 'next-auth/react' 
import React, { useState, useCallback } from 'react'
import { AiFillGithub } from 'react-icons/ai' 
import { FcGoogle } from 'react-icons/fc' 
import { FieldValues, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form' 
import useRegisterModel from '@/app/hooks/useRegisterModel'
import Model from './Model'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModel from '@/app/hooks/useLoginModel'
import { useRouter } from 'next/navigation'


const LoginModel = () => {
const router = useRouter();

const registerModel = useRegisterModel();
const loginModel = useLoginModel()

const [isLoading, setIsLoading] = useState(false);

const {
    register, 
    handleSubmit,
    formState: {
        errors
    }
} = useForm<FieldValues>({
    defaultValues: {
        email: '',
        password: ''
    }
})

const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
        ...data,
        redirect: false,
    })
    .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();

            loginModel.onClose();
        }

        if (callback?.error) {
            toast.error(callback.error)
        }
    })
}

const bodyContent = (
    <div className='flex flex-col gap-4'>
        <Heading 
        title='Welcome back'
        subtitle='Login to your account!'
        />
        <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input 
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
    </div>
)

const toggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
}, [loginModel, registerModel])


const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
        <hr />

        <Button 
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
        />

        <Button 
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn("github")}
        />

        <div className='mt-4 font-light text-center text-neutral-500'>
            <div className='flex flex-row items-center gap-2 justify-center'>
                <div>
                    First time using Airbnb?
                </div>
                <div
                onClick={toggle}
                className='cursor-pointer text-neutral-800 hover:underline'>
                    Create an account
                </div>
            </div>
        </div>
    </div>
)



  return (
    <Model 
    disabled={isLoading}
    isOpen={loginModel.isOpen}
    title='Login'
    actionLabel='Continue'
    onClose={loginModel.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModel;