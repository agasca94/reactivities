import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'
import { Link } from 'react-router-dom'

interface IProps {
    activity: IActivity;
    close: () => void;
}

export const ActivityDetails: React.FC<IProps> = ({
    activity, 
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
                        as={Link}
                        to={`/edit/${activity.id}`}
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
