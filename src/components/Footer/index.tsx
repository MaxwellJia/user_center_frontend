import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {MAX_GITHUB, MAX_LINKEDIN} from "@/constant";

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Linkedin',
          title: 'Max Linkedin',
          href: MAX_LINKEDIN,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <>Max Github <GithubOutlined /></>,
          href: MAX_GITHUB,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
