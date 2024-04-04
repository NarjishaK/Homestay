import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import HomestayList from './shop-components/Homestay-list';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const ShopGrid_V1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Homestays" />
        <HomestayList />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default ShopGrid_V1

