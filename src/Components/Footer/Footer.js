import React from 'react';

//icons
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className='text-center fixed-bottom p-1'>
      <small className='d-block'>
        &copy; Filipe Marques, 2021 -{' '}
        <span id='edamam-badge' data-color='transparent'></span>
        {/* shout out to edaman for the api! */}
      </small>
      <a
        href='https://www.linkedin.com/in/filipe-marques-518bb61ba/'
        target=' _blank'
      >
        <FaLinkedin />
      </a>
      <a href='https://github.com/filipeqm94' target=' _blank'>
        <FaGithub />
      </a>
      <a href='https://twitter.com/filipeiscoding' target=' _blank'>
        <FaTwitter />
      </a>
      <a href='mailto:marques.filipe@gmail.com'>
        <FiMail />
      </a>
    </footer>
  );
}
