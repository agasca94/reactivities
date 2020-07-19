import React from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
    imagePreview: string;
    setImage: (file: Blob) => void;
}

export const PhotoWidgetCropper: React.FC<IProps> = ({ imagePreview, setImage }) => {
    const cropper = React.useRef<Cropper>(null);

    const cropImage = () => {
        if (cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined')
            return;
        
        cropper?.current?.getCroppedCanvas()
            .toBlob(
                (blob: Blob | null) => blob && setImage(blob), 
                'image/jpeg'
            );
    };

    return (
        <Cropper
            src={imagePreview}
            style={{ height: 200, width: '100%' }}
            aspectRatio={1 / 1}            
            preview='.img-preview'
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={cropImage}
            ref={cropper}
        />
    )
}
