const images = require.context('../../public/images/compressed', true);

function ProfileImage({ image }) {
    return(
        <img src={images(`./${image}.jpg`)} style={{width: '100%'}}/>
    )
}

export default ProfileImage;
