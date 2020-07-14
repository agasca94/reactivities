import React, { FormEvent } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity, IActivityFormValues } from '../../../app/models/IActivity'
import { v4 as uuid } from 'uuid';
import { Form as FinalForm, Field } from 'react-final-form'
import { TextInput } from '../../../app/common/form/TextInput';
import { DateInput } from '../../../app/common/form/DateInput';
import { TextAreaInput } from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/utils';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Descriptions need to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface IProps {
    closeEditForm: () => void;
    activity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
    loading: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
    closeEditForm, 
    activity: initialValues, 
    createActivity, 
    editActivity,
    submitting,
    loading
}) => {

    const initializeForm = () => {
        if (initialValues) {
            return {
                ...initialValues,
                time: initialValues.date
            };
        }
        return {
            id: '',
            title: '',
            category: '',
            description: '',
            city: '',
            venue: ''
        };
    };

    const [activity, setActivity] = React.useState<IActivityFormValues>(initializeForm);

    const handleFinalFormSubmit = (values: any) => {
        const { date, time, ...activity } = values;
        const dateTime = combineDateAndTime(date, time);
        activity.date = dateTime;
        
        if (activity.id){
            editActivity(activity);
        } else {
            const newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field  
                                    name='title'
                                    placeholder='Title' 
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder='Description' 
                                    rows={3}
                                    value={activity.description}
                                    component={TextAreaInput}
                                />
                                <Field
                                    name='category'
                                    placeholder='Category' 
                                    value={activity.category}
                                    component={SelectInput}
                                    options={category}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        name='date'
                                        time={false}
                                        placeholder='Date' 
                                        value={activity.date}
                                        component={DateInput}
                                    />
                                    <Field
                                        name='time'
                                        date={false}
                                        placeholder='Time' 
                                        value={activity.time}
                                        component={DateInput}
                                    />
                                </Form.Group>
                                <Field
                                    name='city'
                                    placeholder='City' 
                                    value={activity.city}
                                    component={TextInput}
                                />
                                <Field
                                    name='venue'
                                    placeholder='Venue' 
                                    value={activity.venue}
                                    component={TextInput}
                                />

                                <Button 
                                    loading={loading || submitting}
                                    floated='right' 
                                    disabled={invalid || pristine}
                                    positive 
                                    type='submit' 
                                    content='Submit'
                                />
                                <Button
                                    loading={loading || submitting}
                                    onClick={closeEditForm} 
                                    floated='right' 
                                    type='button' 
                                    content='Cancel'
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}
