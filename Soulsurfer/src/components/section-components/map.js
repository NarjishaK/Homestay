import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Map extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="google-map mb-120">
			{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd" width="100%" height="100%" frameBorder={0} allowFullScreen aria-hidden="false" tabIndex={0} /> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d250265.46645652415!2d75.63405853946543!3d11.451178425628905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d11.669393!2d75.749231!4m5!1s0x3ba65b97db06fdd3%3A0x63c1acb25b4d7432!2sFirst%20%EF%AC%82oor%2C%20Beebizzle%20Building%2C%20near%20Aster%20Ortho%20Hospital%2C%20Kodal%20Nadakkavu%2C%20Pantheeramkavu%2C%20Kozhikode%2C%20Kerala%20673019!3m2!1d11.232725499999999!2d75.8498797!5e0!3m2!1sen!2sin!4v1713548697953!5m2!1sen!2sin" width="100%" height="100%"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
        }
}

export default Map