import React from 'react';
import {Layout} from 'antd';
import styles from '../styles/header.css';
function Header(props) {
    return (
        <Layout.Header>
            <h1 className={styles.heading}>Công cụ tạo CV của D2</h1>
        </Layout.Header>
    );
  }
  
  export default Header;