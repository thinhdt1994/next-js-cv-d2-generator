import React,{useState, useEffect} from 'react';
import Head from 'next/head'
import DataContext from '../contexts/data-context';
import { Layout } from 'antd';
import styles from '../styles/home.css';
import Header from '../components/header'; 
import Footer from '../components/footer';
import TemplateList from '../components/template-list';
import CVList from '../components/cv-list';
import CVEditor from '../components/cv-editor';
import { fetchData } from '../lib/fetch-data';

export default function Home(props) {
  // const templates = props.templates;
  // console.log(templates);
  const templates = [
      {
      "id": 1,
      "name": "Mẫu 1",
      "description": "Mẫu chuyên nghiệp - trả phí",
      "thumbnail": "/templates/thumbnails/template1.png",
      "file": "/templates/files/template1.html"
      },
      {
      "id": 2,
      "name": "Mẫu 2",
      "description": "Mẫu cơ bản - miễn phí",
      "thumbnail": "/templates/thumbnails/template2.png",
      "file": "/templates/files/template2.html"
      }
  ];
  const [currentCv, setCurrentCv] = useState(null);
  const [cvs, setCvs] = useState([]);
  const data = {
    templates,
    currentCv,
    setCurrentCv,
    cvs,
    setCvs
  };

  return (
    <DataContext.Provider value={data}>
      <Layout className={styles.redColor}>
      <Head>
        <title>Công cụ tạo CV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <TemplateList />
      <CVList />
      <CVEditor />
      <Footer />
    </Layout>
    </DataContext.Provider>
  )
}


export async function getStaticProps() {
  // Get templates from server
  let templateUrl = process.env.NEXT_TEMPLATES_URL;
  let defaultData = [];
  let templates = fetchData(templateUrl, defaultData);
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      templates: templates
    }
  }
}