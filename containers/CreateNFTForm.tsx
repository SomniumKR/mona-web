import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { COLORS } from 'constants/colors';
import { Heading01 } from 'components/Heading/Heading01';
import { Heading04 } from 'components/Heading/Heading04';
import { css } from '@emotion/react';
import Button from 'components/Button/Button';
import RHFInput from 'components/Form/RHFINput';
import RHFTextarea from 'components/Form/RHFTextarea';
import ImageDropzone from 'containers/ImageDropzone';
import { ImageFile, NFTInfoToSave } from 'types';
import { useAppSelector } from 'hooks/store';
import { selectWallet } from 'store/slices/web3';
import { notify } from '../utils/notifications';

const Container = styled.div`
  /* width: 65vw; */
  width: 936px;
  /* height: calc(65vw * 0.68); */
  height: 639px;
  padding: 64px 91px;
  background-color: white;
  box-sizing: border-box;
  font-family: 'SF-Pro-Text-Regular';
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px -8px 16px rgba(255, 255, 255, 0.18), 0px 16px 24px rgba(55, 71, 79, 0.16);
  border-radius: 30px;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const GrayHeading04 = styled(Heading04)`
  color: ${COLORS.grey02}
`;

const StyledInput = styled(RHFInput)`
  width: 446px;
  height: 58px;
  padding: 19px;
  box-sizing: border-box;
  border: 1px solid ${COLORS.grey01};
  margin: 16px 0 24px 0;
  font-size: 16px;
  line-height: 29px;

  &:focus {
    outline-color: ${COLORS.red01};
  }
`;

const StyledTextarea = styled(RHFTextarea)`
  width: 446px;
  height: 124px;
  padding: 19px;
  box-sizing: border-box;
  border: 1px solid ${COLORS.grey01};
  margin: 16px 0 24px 0;
  font-size: 16px;
  line-height: 29px;
  resize: none;

  &:focus {
    outline-color: ${COLORS.red01};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

interface Props {
  handleCancel: () => void;
}

export default function CreateNFTForm({ handleCancel }: Props) {
  const [uploadedImage, setUploadedImage] = useState<ImageFile[]>([]);

  const wallet = useAppSelector(selectWallet);

  const handleImageUpload = (images: ImageFile[]) => {
    setUploadedImage(images);
  };

  const {
    register, handleSubmit, formState,
  } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = (data) => {
    if (wallet?.publicKey) {
      const pubKey = wallet.publicKey.toBase58();

      const NFTToSave: NFTInfoToSave = {
        file: uploadedImage[0].imageData,
        name: data.name,
        creator: pubKey,
        description: data.description,
      };

      localStorage.setItem('Mona-nft-info-saved', JSON.stringify(NFTToSave));
      notify('New NFT Saved !', { backgroundColor: COLORS.green01 });
      handleCancel();
    } else {
      notify('You need connect wallet');
    }
  };

  return (
    <Container>
      <Heading01 css={css`margin-bottom: 24px`}>
        Creating New NFT
      </Heading01>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainContainer>
          <Column css={css`margin-right: 44px`}>
            <GrayHeading04>
              Image
            </GrayHeading04>
            <ImageDropzone handleImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
            <GrayHeading04 css={css`font-family: "SF-Pro-Text-Light"`}>
              File types: JPG, PNG, SVG
            </GrayHeading04>
            <GrayHeading04 css={css`font-family: "SF-Pro-Text-Light"`}>
              Max Size: 10MB
            </GrayHeading04>
          </Column>
          <Column>
            <GrayHeading04>
              Name
            </GrayHeading04>
            <StyledInput type="text" register={register} required name="name" />
            <GrayHeading04>
              Description
            </GrayHeading04>
            <StyledTextarea register={register} required name="description" />
            <ButtonContainer>
              <Button redColor type="submit" disabled={isSubmitting}>
                Create
              </Button>
              {handleCancel
            && (
            <Button
              redColor
              type="button"
              onClick={handleCancel}
              css={css`background: white; color: ${COLORS.red01}; border: 1px solid ${COLORS.red01}; margin-left: 32px`}
            >
              Cancel
            </Button>
            )}
            </ButtonContainer>
          </Column>
        </MainContainer>
      </form>
    </Container>
  );
}
