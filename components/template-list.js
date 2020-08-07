import React from 'react';
import TemplateItem from './template-item';
import DataContext from '../contexts/data-context';
import { Card, Row } from 'antd';
import styles from '../styles/template-list.css'; 
function TemplateList(props) {
    return (
        <DataContext.Consumer>
            {
                ({templates}) => {
                    let title = <h2 className={styles.title}>Chọn mẫu CV</h2>;
                    return (
                        <Card title={title}>
                           <Row className={styles.templateList}>
                                {
                                    templates.map((template) => (
                                        <TemplateItem key={template.id} template={template} />
                                    ))
                                }
                            </Row>
                        </Card>
                    )
                }
            }
            
        </DataContext.Consumer>
    );
  }
  
  export default TemplateList;