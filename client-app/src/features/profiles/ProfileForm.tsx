import React from 'react'
import { IProfile, IProfileFormValues } from '../../app/models/IProfile'
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import { TextAreaInput } from '../../app/common/form/TextAreaInput';
import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
    displayName: isRequired('Display Name')
});

interface IProps {
    profile: IProfile;
    updateProfile: (profile: IProfile) => void;
    submitting: boolean;
}

export const ProfileForm: React.FC<IProps> = ({ 
    profile, 
    updateProfile,
    submitting
}) => {
    return (
        <FinalForm
            validate={validate}
            initialValues={profile}
            onSubmit={updateProfile}
            render={({ handleSubmit, invalid, pristine }) => 
                <Form onSubmit={handleSubmit} loading={submitting}>
                    <Field
                        name='displayName'
                        placeholder='Display name'
                        value={profile.displayName}
                        component={TextInput}
                    />

                    <Field
                        name='bio'
                        placeholder='Bio'
                        value={profile.bio}
                        rows={3}
                        component={TextAreaInput}
                    />

                    <Button
                        loading={submitting}
                        disabled={invalid || pristine}
                        floated='left'
                        positive
                        type='submit'
                        content='Update'
                    />
                </Form>
            }
        />
            
    )
}
