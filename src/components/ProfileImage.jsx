const images = require.context('../../public/images', true);

function ProfileImage({ image }) {
    return(
        <img src={images(`./${image}.jpg`)} style={{width: '100%'}}/>
    )
}

export default ProfileImage;
