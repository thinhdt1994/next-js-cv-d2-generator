import React from 'react';
import DataContext from '../contexts/data-context';
import { Col, Button } from 'antd';
import styles from '../styles/cv-item.css';

function CVItem(props) {
    let rootUrl = process.env.REACT_APP_ROOT_URL || 'http://localhost:3001';
    let src = rootUrl + '/' + props.cv.thumbnail;

    function editCV(cvId, currentCv, setCurrentCv, cvs) {
        for(let cv of cvs) {
            if (cv.id === cvId) {
                setCurrentCv(cv);
                return;
            }
        }
    }

    function deleteCV(cvId, currentCv, setCurrentCv, cvs, setCvs) {
        for(let index in cvs) {
            let cv = cvs[index];
            if (cv.id === cvId) {
                setCvs(cvs.filter((value, key) => key != index));
                break;
            }
        }
        if (currentCv !== null) {
            if (cvId === currentCv.id) {
                setCurrentCv(null);
            }
        }
    }

    return (
        <DataContext.Consumer>
            {
                ({currentCv,setCurrentCv, cvs, setCvs}) => (
                    <Col lg={{span: 6}} md={{span: 8}} sm={{span: 4}} className={styles.cv}>
                        <div className={styles.cvPreview}>
                            <img src={src} alt={`cv-${props.cv.id}`} className={styles.cvThumbnail}/>
                            {
                                (currentCv !== null && currentCv.id === props.cv.id) && (
                                    <div className={styles.cvStatus}>
                                        <div className={styles.cvOverlay}></div>
                                    </div>
                                )
                            }
                        </div>
                        <p className={styles.cvName}>{props.cv.name}</p>
                        <p className={styles.cvDescription}>
                            {props.cv.description}
                        </p>
                        <div className="align-center">
                            <Button type="success" onClick={() => {editCV(props.cv.id, currentCv, setCurrentCv, cvs)}}>Sửa</Button>
                            <Button type="danger" onClick={() => {deleteCV(props.cv.id, currentCv, setCurrentCv, cvs, setCvs)}}>Xóa</Button>
                        </div>
                    </Col>
                )
            }
            
        </DataContext.Consumer>
    );
  }
  
  export default CVItem;