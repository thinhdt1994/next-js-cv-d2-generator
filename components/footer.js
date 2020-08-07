import React from 'react';
import {Layout} from 'antd';
import styles from '../styles/footer.css';
function Footer(props) {
    return (
        <Layout.Footer>
            <p className={styles.copyright}>© Copyright of thinhdt@rikkeisoft.com</p>
        </Layout.Footer>
    );
  }
  
  export default Footer;