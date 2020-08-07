import React from 'react';
import DataContext from '../contexts/data-context';
import { Col, Button } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import styles from '../styles/template-item.css';
const axios = require('axios');

function TemplateItem(props) {
    let rootUrl = process.env.REACT_APP_ROOT_URL || 'http://localhost:3001';
    let src = rootUrl + '/' + props.template.thumbnail;
    let date = new Date();
    function createCV(cvId, template,cvs, setCvs, setCurrentCv)  {
        axios.get(rootUrl + template.file)
        .then(function (response) {
            // handle success
            let cv = {
                id: cvId,
                thumbnail: template.thumbnail,
                name: 'CV-' + cvId,
                description: template.description,
                content: response.data
            };
            setCvs(cvs.concat(cv));
            setCurrentCv(cv);
        })
        .catch(function (error) {
            // handle error
        })
        .then(function () {
            // always executed
        });
    };
    return (
        <DataContext.Consumer>
            {
                ({cvs, setCvs, setCurrentCv}) => {
                    return (
                        <Col lg={{span: 6}} md={{span: 8}} sm={{span: 4}} className={styles.template}>
                            <div className={styles.templatePreview}>
                                <img src={src} alt={`template-${props.template.id}`} className={styles.templateThumbnail}/>
                            </div>
                            <p className={styles.templateName}>{props.template.name}</p>
                            <p className={styles.templateDescription}>
                                {props.template.description}
                            </p>
                            <div className="align-center">
                                <Button type="primary" onClick={() => createCV(date.getTime(), props.template,cvs, setCvs, setCurrentCv)}><PlusSquareFilled /> Tạo CV từ mẫu này</Button>
                            </div>
                        </Col>
                    );
                }
            }
        </DataContext.Consumer>
    );
  }
  
  export default TemplateItem;