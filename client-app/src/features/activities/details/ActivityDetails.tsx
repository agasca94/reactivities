import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'

interface IProps {
    activity: IActivity;
    openEditForm: (id: string) => void;
    close: () => void;
}

export const ActivityDetails: React.FC<IProps> = ({
    activity, 
    openEditForm, 
    close 
}) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button 
                        onClick={() => openEditForm(activity.id)} 
                        basic 
                        color='blue' 
                        content='Edit'
                    />
                    <Button 
                        onClick={close} 
                        basic 
                        color='grey' 
                        content='Cancel'
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
