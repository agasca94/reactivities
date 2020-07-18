import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Button, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/IUser';
import { combineValidators, isRequired } from 'revalidate';
import { FORM_ERROR } from 'final-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

export const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    const history = useHistory();

    const handleSubmit = (values: IUserFormValues) => 
        login(values)
            .then(error => {
                if (error) {
                    return {
                        [FORM_ERROR]: error.response
                    };
                }
                history.push('/activities');
            });

    return (
        <FinalForm
            onSubmit={handleSubmit}
            validate={validate}
            render={({ 
                handleSubmit, 
                dirtySinceLastSubmit, 
                submitting, 
                submitError, 
                invalid, 
                pristine  
            }) => 
                <Form onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Login Reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        name="email"
                        component={TextInput}
                        placeholder="Email"
                    />
                    <Field
                        name="password"
                        component={TextInput}
                        placeholder="Password"
                        type="password"
                    />
                    {submitError && !dirtySinceLastSubmit && 
                        <ErrorMessage 
                            error={submitError} 
                            text='Invalid username or password' 
                        />
                    }
                    <Button 
                        fluid
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color='teal'
                        content='Login'
                    />
                </Form>
            }
        />
    );
}
