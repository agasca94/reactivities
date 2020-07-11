import React, { FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'
import { v4 as uuid } from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
    setEditMode, 
    activity: initialValues, 
    createActivity, 
    editActivity,
    submitting
}) => {

    const initializeForm = () => {
        if (initialValues) {
            return initialValues;
        }
        return {
            id: '',
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        };
    };

    const [activity, setActivity] = React.useState<IActivity>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity(activity => ({
            ...activity,
            [name]: value
        }));
    }

    const handleSubmit = () => {
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
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input 
                    onChange={handleInputChange}
                    name='title'
                    placeholder='Title' 
                    value={activity.title}
                />
                <Form.TextArea 
                    onChange={handleInputChange}
                    name='description'
                    rows={2} 
                    placeholder='Description' 
                    value={activity.description}
                />
                <Form.Input 
                    onChange={handleInputChange}
                    name='category'
                    placeholder='Category' 
                    value={activity.category}
                />
                <Form.Input 
                    onChange={handleInputChange}
                    name='date'
                    type='datetime-local' 
                    placeholder='Date' 
                    value={activity.date}
                />
                <Form.Input 
                    onChange={handleInputChange}
                    name='city'
                    placeholder='City' 
                    value={activity.city}
                />
                <Form.Input 
                    onChange={handleInputChange}
                    name='venue'
                    placeholder='Venue' 
                    value={activity.venue}
                />

                <Button 
                    loading={submitting}
                    floated='right' 
                    positive 
                    type='submit' 
                    content='Submit'
                />
                <Button 
                    onClick={() => setEditMode(false)} 
                    floated='right' 
                    type='button' 
                    content='Cancel'
                />
            </Form>
        </Segment>
    )
}
