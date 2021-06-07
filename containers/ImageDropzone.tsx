import { useState, memo } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { COLORS } from 'constants/colors';
import { css } from '@emotion/react';

function ImageDropzone() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));
    },
    disabled: false,
    maxSize: 1e+7, // 10MB
  });

  const thumb = () => (
    <img
      src={files[0].preview}
      alt={files[0].name}
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
      <input {...getInputProps()} />
      {files.length ? thumb()
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
