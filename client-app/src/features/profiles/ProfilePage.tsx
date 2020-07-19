import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import { ProfileContent } from './ProfileContent'
import { RootStoreContext } from '../../app/stores/rootStore'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { LoadingComponent } from '../../app/layout/LoadingComponent'

const ProfilePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile,loadProfile, loadingProfile } = rootStore.profileStore;

    const { username } = useParams();

    React.useEffect(() => {
        loadProfile(username);
    }, [username, loadProfile]);

    if (loadingProfile) return <LoadingComponent content='Loading profile...'/>;

    if (!profile) return <h2>Profile not found</h2>;
    
    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile}/>
                <ProfileContent/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage);
