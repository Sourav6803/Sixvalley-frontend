import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
 
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { MdOutlineDashboard } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineStarBorder } from "react-icons/md";
import { FaUsers } from "react-icons/fa";



const { Header, Sider, Content } = Layout;


const VendorSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <MdOutlineDashboard />,
              label: 'Dashboard',
            },
            
          ]}
        />

        <div className='text-[#dcd6d6] mt-3 ml-2 font-bold  text-center'>Order Managment</div>

        <Menu
          theme="dark"
        //   mode="inline"
        //   defaultSelectedKeys={['1']}
          items={[
            {
              key: '2',
              icon: <IoCartOutline />,
              label: 'Orders',
            },
            {
              key: '3',
              icon: <MdOutlineEventNote />,
              label: 'Refund Request',
            },
            
          ]}
        />

        <div className='text-[#dcd6d6] mt-3 ml-2 font-bold  text-center'>Product Managment</div>

        <Menu
          theme="dark"
        
          items={[
            {
              key: '4',
              icon: <IoDiamondOutline />,
              label: 'Products',
            },
            {
              key: '5',
              icon: <MdOutlineStarBorder />,
              label: 'Product Reviews',
            },
            
          ]}
        />


        <div className='text-[#dcd6d6] mt-3 ml-2 font-bold  text-center'>Promotion Managment</div>

        <Menu
          theme="dark"
        
          items={[
            {
              key: '6',
              icon: <FaUsers />,
              label: 'Coupons',
            },
            
            
          ]}
        />

        <div className='text-[#dcd6d6] mt-3 ml-2 font-bold  text-center'>HELP & SUPPORT</div>

        <Menu
        theme="dark"

        items={[
            {
            key: '6',
            icon: <FaUsers />,
            label: 'Inbox',
            },
            
            
        ]}
        />

      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default VendorSidebar;