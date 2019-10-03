import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledImageBox = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    border: ${props => props.borderSize} solid ${props => props.borderColor};
    position: relative;
    /* z-index: ${props => props.z_index};; */
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    /* background-image: var(--hiroGradient); */
`;
StyledImageBox.defaultProps = {
    width: '240px',
    height: '240px',
    borderSize: '2px',
    borderColor: 'var(--hiroColor)',
    // z_index: '-1',
};
const Image = styled.img`
    object-fit: ${props => props.objectFit};
    width: 100%;
    height: 100%;
`;
Image.defaultProps = {
    objectFit: 'cover',
};
const ImageShadow = styled.div`
    /* position: absolute; */
    height: 100%;
    width: 100%;
    background-color: #4C5264;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const ImageInfoContainer = styled.div`
    width : 100%;
    position: absolute;
    bottom: 10px;
    left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const SmallParagraph = styled.p`
    color: #fff;
    font-family: ubuntu-regular;
    font-size : 24px;
    text-rendering: optimizelegibility;
    text-shadow: 0 0 3px rgba(0,0,0,.8); 
    :last-child {
        font-size : 14px;
    }
`;


// eslint-disable-next-line react/display-name
export const ImageBox = memo(props => {
    const { image, name, users, onClick, width, height, borderSize, id, className,
        borderColor, subCategoryName, objectFit, showImageShadow,
        imageShadowText, shadowCoverImage, } = props;
    return <StyledImageBox width={width} height={height} onClick={onClick} borderSize={borderSize} className={className} borderColor={borderColor}>
        <Image src={image ? image : '/assets/images/default-img.jpg'} id={id} objectFit = {objectFit}/>
        {showImageShadow && 
            (<ImageShadow className = 'shadowBox'> 
                <Image src={shadowCoverImage ? shadowCoverImage : '/assets/images/icons/camera-icon-white.svg'} className= 'shadow-image-container-image'/>
                <SmallParagraph>{imageShadowText}</SmallParagraph>
            </ImageShadow>)}
        <ImageInfoContainer>
            <SmallParagraph className = 'small-paragraph-first'>{name}</SmallParagraph>
            <SmallParagraph className = 'small-paragraph-second'>{subCategoryName}</SmallParagraph>
            <SmallParagraph className = 'small-paragraph-last'>{users !== undefined ? users : null}</SmallParagraph>
        </ImageInfoContainer>

    </StyledImageBox>
});

ImageBox.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    users: PropTypes.any,
    onClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    borderSize: PropTypes.string,
    id: PropTypes.any,
    className: PropTypes.string,
    imageShadowText: PropTypes.string,
    borderColor: PropTypes.string,
    subCategoryName: PropTypes.string,
    shadowCoverImage: PropTypes.string,
    objectFit: PropTypes.string,
    showImageShadow: PropTypes.bool,
};