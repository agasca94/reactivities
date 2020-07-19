import React, { Fragment } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { PhotoWidgetCropper } from './PhotoWidgetCropper';

interface IProps {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
}

const PhotoUploadWidget: React.FC<IProps> = ({ uploadPhoto, loading }) => {

    const [files, setFiles] = React.useState<any[]>([]);
    const [image, setImage] = React.useState<Blob | null>(null);

    React.useEffect(() => () => 
        files.forEach(file => URL.revokeObjectURL(file.preview))
    );

    return (
        <Fragment>
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoWidgetDropzone setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length > 0 &&
                        <PhotoWidgetCropper 
                            setImage={setImage} 
                            imagePreview={files[0].preview}
                        />
                    }
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 &&
                        <>
                        <div
                            className='img-preview'
                            style={{minHeight: '200px', overflow: 'hidden'}}
                        ></div>
                        <Button.Group widths={2}>
                            <Button
                                positive
                                loading={loading}
                                icon='check'
                                onClick={() => image && uploadPhoto(image)}
                            />
                            <Button
                                icon='close'
                                disabled={loading}
                                onClick={() => setFiles([])}
                            />
                        </Button.Group>
                        </>
                    }
                </Grid.Column>
            </Grid>
        </Fragment>
    )
};

export default PhotoUploadWidget;
