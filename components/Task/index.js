import React, {useEffect} from 'react';
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";
import cx from 'classnames';
import {CircularProgressbar} from 'react-circular-progressbar';

const roundDecimal = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
const CREATED = 0;
const DOWNLOADING = 1;
const UPLOADING = 2;
const DELETED = 3;
const STAGE_NAMES = ['created', 'downloading', 'uploading', 'deleted'];

const Task = ({name, datetime, url, stage, download, upload}) => {
  const onCopyToClipboard = () => {
    toast.info(`Url of task "${name}" is copied to clipboard`, {
      position: 'bottom-right',
      hideProgressBar: false,
      autoClose: 3000,
    });
  }

  const stageName = STAGE_NAMES[stage];
  return (
    <div className={cx(styles.task, {[styles[`task_${stageName}`]]: true})}>
      <div className={styles.task__date}>
        <span>{dayjs(datetime).format('YYYY-MM-DD, HH:MM')}</span>
      </div>
      <div className={styles.task__content}>
        <div className={styles.task__info}>
          <h2 className={styles.task__title}>{name}</h2>
          <span className={styles.task__status}>{stageName}</span>
        </div>
      </div>
      <div className={styles.task__actions}>
        <div className={styles.task__progresses}>
          <div className={styles.task__progress}>
            <CircularProgressbar value={download} maxValue={1} text={`${(download * 100).toFixed(2)}%`}/>
          </div>
          <div className={styles.task__progress}>
            <CircularProgressbar className={styles.green} maxValue={1} value={upload} text={`${(upload * 100).toFixed(2)}%`}/>
          </div>
        </div>
        <CopyToClipboard text={url}>
          <button className={styles.task__copy} type="button" onClick={onCopyToClipboard}>Copy Url</button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
export default Task;
