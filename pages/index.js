import Head from 'next/head'
import Task from "../components/Task";
import {useCallback, useEffect, useState} from "react";
import _ from 'lodash';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Container from "../components/Container";
import {useSocket} from "../contexts/WebsocketContext";
import getConfig from "next/config";

const Home = () => {
  const connectEvent = 'connect';
  const tasksEvent = 'tasks';
  const downloadProgressEvent = 'download-progress';
  const uploadProgressEvent = 'upload-progress';
  const [tasks, setTasks] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const socket = useSocket();
  const startEmit = useCallback(() => {
    socket.emit(tasksEvent);
    socket.emit(downloadProgressEvent);
    socket.emit(uploadProgressEvent);
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(connectEvent, () => {
      console.log('socket connected');
    });
    socket.on(tasksEvent, (tasksPayload) => {
      setTasks(tasksPayload)
    });
    socket.on(downloadProgressEvent, (payload) => {
      if (_.isObject(payload)) {
        const { data } = payload;
        setDownloadProgress({[data.id]: data.progress});
      }
    })
    socket.on(uploadProgressEvent, (payload) => {
      if (payload) {
        const { data } = payload;
        setUploadProgress({[data.id]: data.progress});
      }
    })
    startEmit();

    return () => {
      socket.off(connectEvent);
      socket.off(tasksEvent);
      socket.off(downloadProgressEvent);
      socket.off(uploadProgressEvent)
    }
  }, [socket]);
  return (
    <>
    <Head>
      <title>Dow Dash</title>
      <meta name="description" content="Dow bot dashboard"/>
    </Head>
    <Header/>
    <main className="min-h-screen py-16 flex-1 flex flex-col justify-center align-center">
      <Container>
        <h1 className="mb-4 text-6xl text-center">
          Dow Dash
        </h1>
        <p className="text-center">
          Dashboard for getting information about task processes
        </p>
        <div className="flex align-center flex-col justify-center w-1/3 mx-auto">
          {
            tasks.map(task => (
              <Task
                key={task.id}
                name={task.name}
                url={task.url}
                datetime={task.datetime}
                stage={task.stage}
                download={_.get(downloadProgress, task.id, 0)}
                upload={_.get(uploadProgress, task.id, 0)}
              />
            ))
          }
        </div>
      </Container>

    </main>
    <Footer/>
    </>
  )
};

Home.getInitialProps = async() => {
  const {publicRuntimeConfig} = getConfig();
  const {apiUrl, socketUrl} = publicRuntimeConfig;
  return { apiUrl, socketUrl };
}
export default Home;
