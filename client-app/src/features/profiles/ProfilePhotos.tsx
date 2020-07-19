import React, { useContext } from 'react'
import { Tab, Header, Card, Image, Grid, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, loadingPhoto, setMainPhoto, deletePhoto } = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = React.useState(false);
    const [target, setTarget] = React.useState('')

    const handleUploadPhoto = (photo: Blob) => {
        uploadPhoto(photo)
            .then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser &&
                        <Button
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    }
                </Grid.Column>

                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget
                            uploadPhoto={handleUploadPhoto}
                            loading={loadingPhoto}
                        />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile?.photos.map(photo => 
                                <Card key={photo.id}>
                                    <Image src={photo.url}/>
                                    {isCurrentUser &&
                                        <Button.Group fluid widths={2}>
                                            <Button 
                                                onClick={() => {
                                                    setMainPhoto(photo);
                                                    setTarget(photo.id);
                                                }}
                                                disabled={photo.isMain}
                                                loading={loadingPhoto && target === photo.id}
                                                basic 
                                                positive 
                                                content='Main'
                                            />
                                            <Button 
                                                onClick={() => {
                                                    deletePhoto(photo);
                                                    setTarget(photo.id);
                                                }}
                                                loading={loadingPhoto && target === photo.id}
                                                disabled={photo.isMain}
                                                basic 
                                                negative 
                                                icon='trash'
                                            />
                                        </Button.Group>
                                    }
                                </Card>    
                            )}

                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos);
