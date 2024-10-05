import React from 'react';
import FooterItemsContainer from './FooterItemsContainer';
import FooterSocialMediaIcon from './FooterSocialMediaIcon';
import {ICONS} from '../Data/Content';

const Footer = () => 
{
    return (
        <footer className="bg-gray-900 text-white">
            <FooterItemsContainer/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2
             text-gray-400 text-sm pb-8">
                <span>© {new Date().getFullYear()} Mukees Inc. All rights reserved.</span>
                <span>Terms . Privacy Policy</span>
                <FooterSocialMediaIcon Icons = {ICONS}/>
            </div>

        </footer>
    );
}

export default Footer;