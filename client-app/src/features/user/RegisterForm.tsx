import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Button, Label, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/IUser';
import { combineValidators, isRequired } from 'revalidate';
import { FORM_ERROR } from 'final-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('email'),
    username: isRequired('username'),
    displayName: isRequired('displayName'),
    password: isRequired('password')
});

export const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;

    const history = useHistory();

    const handleSubmit = (values: IUserFormValues) => 
        register(values)
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
                        content='Register Reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        name="username"
                        component={TextInput}
                        placeholder="Username"
                    />
                    <Field
                        name="displayName"
                        component={TextInput}
                        placeholder="Display Name"
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
                            text={JSON.stringify(submitError.data.errors)}
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
