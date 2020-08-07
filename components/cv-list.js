import React, { useEffect} from 'react';
import CVItem from './cv-item';
import DataContext from '../contexts/data-context';
import { Row, Card } from 'antd';
import styles from '../styles/cv-list.css'; 

function CVList(props) {
    let title = <h2 className={styles.title}>Chọn CV</h2>;
    return (
        <DataContext.Consumer>
            {
                ({cvs}) => {
                    return (
                        <Card title={title}>
                            <Row className={styles.cvList}>
                                {
                                    cvs.map((cv) => {
                                        return <CVItem key={cv.id} cv={cv} />
                                    })
                                }
                            </Row>
                     </Card>
                    );
                }
            }
        </DataContext.Consumer>
    );
  }
  
  export default CVList;