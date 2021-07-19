import {Form, Input, Button, Checkbox, Alert} from 'antd';
import React, {memo, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login, setError} from "../../actions";
import {useHistory} from "react-router";

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {isAuth, error} = useSelector(state => state)

    const errorLogin = useMemo(() => {
        if (error?.type === 'ValidationError') {
            const filteredErrors = error.errors
                .filter((errorItem) => errorItem.key === 'login')
                .map((errorItem) => errorItem.msg)
            return filteredErrors.length ? filteredErrors : null
        }
    }, [error])

    useEffect(() => {
        if (isAuth) {
            history.push('/')
        }
        return () => {
            if (error?.type === 'ValidationError') {
                dispatch(setError(null))
            }
        }
    }, [history, isAuth])

    const onFinish = async ({username, password, remember}) => {
        dispatch(login(username, password, remember))
    }

    const onFinishFailed = async () => {
        alert('Please enter correct data')
    }

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

        >
            {errorLogin && <Alert className={'validation_alert'}
                                  message="Validation Error"
                                  description={errorLogin.join('\n')}
                                  type="error"
            />}

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    {
                        max: 30,
                        message: 'Username should be less than 30 characters',
                    },
                    {
                        min: 3,
                        message: 'Username should be at least  3 characters long'
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        max: 30,
                        message: 'Your password must not exceed 30 characters',
                    },
                    {
                        min: 6,
                        message: 'Password should be at least 6 characters long'
                    },
                    {
                        pattern: /(?=.*[0-9])/,
                        message: "The password must contain at least one number"
                    },
                    {
                        pattern: /(?=.*[!@#$%^&*])/,
                        message: "Password must contain at least one special character"
                    },
                    {
                        pattern: /(?=.*[a-z])/,
                        message: "Password must contain at least one lowercase Latin letter"
                    },
                    {
                        pattern: /(?=.*[A-Z])/,
                        message: "Password must contain at least one uppercase Latin letter"
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default memo(Login);
