import { Button, Card, Label, TextInput } from 'flowbite-react'
import React from 'react'

type LoginFormProps = {
    onLogin: () => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
    return (
        <div>
            <Card className='max-w-sm'>
                <form className="flex max-w-md flex-col gap-4">
                    <p className='mx-auto font-bold font-sans text-xl'>Đăng nhập</p>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="Email của bạn" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput id="password1" type="password" placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' required />
                    </div>
                    
                    <Button className='bg-blue-700 mt-6' type='submit' onClick={onLogin}>Đăng nhập</Button>
                </form>
            </Card>
        </div>
    )
}

export default LoginForm
