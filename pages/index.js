import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import getConfig from "next/config";
import Head from "next/head";
import Container from "../components/Container";
import File from "../components/File";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Tabs, TabList, Tab, TabBody, TabPanel } from "../components/Tab";
import Task from "../components/Task";
import { useSocket } from "../contexts/WebsocketContext";
import FileIcon from "../public/icons/file-icon.svg";
import TasksIcon from "../public/icons/tasks-icon.svg";

const Home = () => {
  const connectEvent = "connect";
  const tasksEvent = "tasks";
  const filesEvent = "files";
  const downloadProgressEvent = "download-progress";
  const uploadProgressEvent = "upload-progress";
  const deleteTaskEvent = "delete-task";
  const tasksTab = "tasks";
  const filesTab = "files";
  const [activeTab, setActiveTab] = useState(tasksTab);
  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const socket = useSocket();
  const startEmit = useCallback(() => {
    socket.emit(tasksEvent);
    socket.emit(filesEvent);
    socket.emit(downloadProgressEvent);
    socket.emit(uploadProgressEvent);
  }, [socket]);

  const onTaskDelete = (task) => socket.emit(deleteTaskEvent, { id: task.id });

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(connectEvent, () => {
      console.log("socket connected");
    });
    socket.on(tasksEvent, (tasksPayload) => {
      setTasks(tasksPayload);
    });
    socket.on(filesEvent, (filesPayload) => {
      setFiles(filesPayload);
    });
    socket.on(downloadProgressEvent, (payload) => {
      if (_.isObject(payload)) {
        const { data } = payload;
        setDownloadProgress({ [data.id]: data.progress });
      }
    });
    socket.on(uploadProgressEvent, (payload) => {
      if (payload) {
        const { data } = payload;
        setUploadProgress({ [data.id]: data.progress });
      }
    });
    startEmit();

    return () => {
      socket.off(connectEvent);
      socket.off(tasksEvent);
      socket.off(downloadProgressEvent);
      socket.off(uploadProgressEvent);
    };
  }, [socket]);
  return (
    <>
      <Head>
        <title>Dow Dash</title>
        <meta name="description" content="Dow bot dashboard" />
      </Head>
      <Header />
      <main className="min-h-screen py-16 flex-1 flex flex-col justify-center align-center">
        <Container>
          <h1 className="mb-4 text-3xl xl:text-6xl text-center">Dow Dash</h1>
          <p className="text-center">
            Dashboard for getting information about task processes
          </p>
          <Tabs>
            <TabList>
              <Tab
                active={activeTab === tasksTab}
                id={tasksTab}
                onClick={() => setActiveTab(tasksTab)}
              >
                <TasksIcon className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 align-middle" />
                <span>Tasks</span>
              </Tab>
              <Tab
                active={activeTab === filesTab}
                id={filesTab}
                onClick={() => setActiveTab(filesTab)}
              >
                <FileIcon className="mr-2 w-4 h-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 align-middle" />
                Files
              </Tab>
            </TabList>
            <TabBody>
              <TabPanel show={activeTab === tasksTab} id={tasksTab}>
                <div className="flex align-center flex-col justify-center w-10/12 lg:w-1/3 mx-auto">
                  {tasks.map((task) => (
                    <Task
                      key={task.id}
                      name={task.name}
                      url={task.url}
                      datetime={task.datetime}
                      stage={task.stage}
                      download={_.get(downloadProgress, task.id, 0)}
                      upload={_.get(uploadProgress, task.id, 0)}
                      onDelete={() => onTaskDelete(task)}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel show={activeTab === filesTab} id={filesTab}>
                <div className="flex align-center flex-row flex-wrap justify-start w-10/12 lg:w-2/3 mx-auto">
                  {files.map((file) => (
                    <File
                      key={file.path}
                      name={file.name}
                      mimeType={file.mimeType}
                      size={file.size}
                    />
                  ))}
                </div>
              </TabPanel>
            </TabBody>
          </Tabs>
        </Container>
      </main>
      <Footer />
    </>
  );
};

Home.getInitialProps = async () => {
  const { publicRuntimeConfig } = getConfig();
  const { apiUrl, socketUrl } = publicRuntimeConfig;
  return { apiUrl, socketUrl };
};
export default Home;
