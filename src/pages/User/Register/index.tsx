import { Footer } from '@/components';
import { MAX_GITHUB, SYSTEM_LOGO } from '@/constant';
import { register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, Link } from '@umijs/max';
import { Divider, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword } = values;
    //校验
    if (userPassword !== checkPassword) {
      message.error('The two passwords you entered are inconsistent.');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = 'Register Successfully!';
        message.success(defaultLoginSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        history.push({
          pathname: '/user/login',
          search: urlParams.toString(),
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'Registration failed, please try again!';
      console.log(error);
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'Registration Page'}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: 'Register',
            },
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="Cam Fall"
          subTitle={
            <a href={MAX_GITHUB} target="_blank" rel="noreferrer">
              All the best for vulnerable people
            </a>
          }
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Register Account',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter user account'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter user account!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter password'}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter the Password',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'The length of password should be more than 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please reenter the password'}
                rules={[
                  {
                    required: true,
                    message: 'Check Password is required.',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'The length of password should be more than 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="securityCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter the security code'}
                rules={[
                  {
                    required: true,
                    message: 'Security code is required',
                  },
                  {
                    max: 5,
                    type: 'string',
                    message: 'The length of password should be less than 5',
                  },
                ]}
              />
            </>
          )}
          <Divider plain={true}>
            <Link to={'/user/login'}>Back to login page</Link>
          </Divider>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
