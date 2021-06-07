import { memo } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { COLORS } from 'constants/colors';
import { css } from '@emotion/react';
import { ImageFile } from 'types';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface Props {
  handleImageUpload?: (images: ImageFile[]) => void;
  uploadedImage?: ImageFile[];
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  name?: string;
  className?: string;
}

function ImageDropzone({
  handleImageUpload, uploadedImage, className,
}: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBinaryString = reader.result;

        handleImageUpload(acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
          imageData: imageBinaryString,
        })));
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    disabled: false,
    maxSize: 1e+7, // 10MB
  });

  const thumb = () => (
    <img
      src={uploadedImage[0].preview}
      alt={uploadedImage[0].name}
      width="100%"
      height="100%"
      css={css`
          object-fit: cover;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;`}
    />
  );

  return (
    <div
      {...getRootProps({ className: 'Image Dropzone' })}
      css={css`
        width: 264px;
        height: 264px;
        background-color: ${COLORS.grey01};

        display: flex;
        align-items: center;
        justify-content: center;
        margin: 16px 0;
        `}
    >
      <input className={className} type="file" {...getInputProps()} />
      {uploadedImage?.length ? thumb()
        : (
          <Image
            src="/images/icons/plus-circle.svg"
            alt="pluc circle icon"
            width="40"
            height="40"
          />
        )}
    </div>
  );
}

export default memo(ImageDropzone);
