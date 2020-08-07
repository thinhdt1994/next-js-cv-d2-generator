import React, {useState, useContext, useEffect, useRef} from 'react';
import DataContext from '../contexts/data-context';
import InnerHTML from 'dangerously-set-html-content';
import { Card, Form, Input, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const axios = require('axios');

function CVEditor(props) {
    const captureRef = useRef(null);
    
    function downloadFile(filename, href) {
        let linkElement = document.createElement("a");
        document.body.appendChild(linkElement);
        linkElement.href = href;
        linkElement.download = filename;
        linkElement.click();
        document.body.removeChild(linkElement);
    }

    function exportToPdf(captureRef) {
        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <title>Template 2</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                ${captureRef.current.innerHTML}
            </body>
            </html>
        `;
        let url = 'https://api.html2pdf.app/v1/test';
        let data = {
            html: html
        };
        axios.post(url, data, {
            responseType: 'arraybuffer'
        })
        .then(function (response) {
            // handle success
            let blob = new Blob([response.data],{type:"application/pdf"});
            let href = window.URL.createObjectURL(blob);
            let filename = 'cv.pdf';
            downloadFile(filename, href);
        })
        .catch(function (error) {
            // handle error
        })
        .then(function () {
            // always executed
        });
    }

    function saveCV(currentCv, captureRef, cvs, setCvs) {
        let element = captureRef.current;
        let editedCv = Object.assign({}, currentCv, {content: element.innerHTML});
        for(let index in cvs) {
            let cv = cvs[index];
            if (cv.id === currentCv.id) {
                setCvs(cvs.splice(index, 1).concat(editedCv));
                return;
            }
        }
    }

    function updateCvName(event, currentCv, setCurrentCv) {
        let cv = Object.assign({}, currentCv, {name: event.target.value});
        setCurrentCv(cv);
    }

    function updateCvDescription(event, currentCv, setCurrentCv) {
        let cv = Object.assign({}, currentCv, {description: event.target.value});
        setCurrentCv(cv);
    }

    return (
        <DataContext.Consumer>
            {
                ({currentCv, setCurrentCv, cvs, setCvs}) => {
                    if (currentCv === null) {
                        return null;
                    } else {
                        let title = (
                            <div>
                                <h3 className="align-center">Chỉnh sửa CV</h3>
                                <Form>
                                    <FormItem>
                                        <Input style={{ fontSize: 13 }}  placeholder="Tên CV" value={currentCv.name} onChange={(event) => {updateCvName(event, currentCv, setCurrentCv,  cvs, setCvs)}}/>
                                    </FormItem>
                                    <FormItem>
                                        <Input rows={4} style={{ fontSize: 13 }}  placeholder="Mô tả" value={currentCv.description} onChange={(event) => {updateCvDescription(event, currentCv, setCurrentCv,  cvs, setCvs)}}/>
                                    </FormItem>
                                </Form>
                            </div>
                        );
                        let html = `
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
                        ${currentCv.content}
                    `;
                        let content = (
                            <div ref={captureRef} className="mt4" style={{
                                width: '210mm',
                                minHeight: '297mm',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <InnerHTML html={html} />
                            </div>
                        );
                        let buttons = (
                            <div className="align-center">
                                <Button type="primary" onClick={() => {saveCV(currentCv, captureRef, cvs, setCvs)}}>Lưu CV</Button>
                                <Button type="success" onClick={() => {exportToPdf(captureRef)}}>Xuất sang pdf và tải về</Button>
                            </div>
                        ); 
                        return (
                            <Card title={title}>
                                {content}
                                {buttons}
                            </Card>
                        );
                    }
                    
                }
            }
        </DataContext.Consumer>
    );
  }
  
  export default CVEditor;