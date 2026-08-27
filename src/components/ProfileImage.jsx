const images = require.context('../../public/images/compressed', true);

function ProfileImage({ image, aspectRatio }) {
    return(
        <img src={images(`./${image}.jpg`)} style={{width: '100%', aspectRatio: aspectRatio ?? null}}/>
    )
}

export default ProfileImage;
