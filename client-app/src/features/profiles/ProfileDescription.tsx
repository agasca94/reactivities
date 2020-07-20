import React, { useContext } from 'react'
import { Tab, Header, Grid, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { ProfileForm } from './ProfileForm';
import { IProfileFormValues } from '../../app/models/IProfile';

const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, editProfile, submitting } = rootStore.profileStore;
    const [addEditMode, setAddEditMode] = React.useState(false);

    const handleUpdateProfile = (values: IProfileFormValues) => {
        editProfile(values)
            .then(() => setAddEditMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon='image' content={`About ${profile?.displayName}`}/>
                    {isCurrentUser &&
                        <Button
                            floated='right'
                            basic
                            content={addEditMode ? 'Cancel' : 'Edit profile'}
                            onClick={() => setAddEditMode(!addEditMode)}
                        />
                    }
                </Grid.Column>

                <Grid.Column width={16}>
                    {addEditMode ? (
                        <ProfileForm 
                            profile={profile!}
                            submitting={submitting}
                            updateProfile={handleUpdateProfile}
                        />
                    ) : (
                        <p>{profile?.bio}</p>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfileDescription);
