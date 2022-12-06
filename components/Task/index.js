import React from 'react';
import dayjs from "dayjs";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";
import cx from 'classnames';
import _ from 'lodash';
import {CircularProgressbar} from 'react-circular-progressbar';

const CREATED = 0;
const DOWNLOADING = 1;
const UPLOADING = 2;
const DELETED = 3;

const stageClasses = Object.freeze({
  created: '',
  downloading: 'text-sky-500 border-sky-500',
  uploading: 'text-teal-700 border-teal-700',
  deleted: 'text-red-600 border-red-600',
});


const Task = ({name, datetime, url, stage, download, upload}) => {
  const onCopyToClipboard = () => {
    toast.info(`Url of task "${name}" is copied to clipboard`, {
      position: 'bottom-right',
      hideProgressBar: false,
      autoClose: 3000,
    });
  }

  const stageName = Object.keys(stageClasses)[stage];
  const stageClass = _.get(stageClasses, stageName);
  return (
    <div className={cx("border color rounded-lg m-1 p-4", {[stageClass]: true})}>
      <div className="pb-3 text-opacity-70 text-sm">
        <span>{dayjs(datetime).format('YYYY-MM-DD, HH:MM')}</span>
      </div>
      <div className="flex">
        <div className='overflow-hidden'>
          <h2 className="mb-4 text-sm xl:text-xl text-ellipsis">{name}</h2>
          <span className="m-0 text-sm xl:text-xl">{stageName}</span>
        </div>
      </div>
      <div className="flex justify-between align-center content-center">
        <div className="flex ml-2 mt-4">
          <div className="w-12 lx:w-16 mr-3 lx:mr-16 last-of-type:mr-0">
            <CircularProgressbar value={download} maxValue={1} text={`${(download * 100).toFixed(2)}%`}/>
          </div>
          <div className="w-12 lx:w-16 mr-3 xl:mr-16 last-of-type:mr-0">
            <CircularProgressbar className="green-progress" maxValue={1} value={upload} text={`${(upload * 100).toFixed(2)}%`}/>
          </div>
        </div>
        <CopyToClipboard text={url}>
          <button className="btn bg-blue-500 rounded-lg p-2 lg:px-4 lg:py-3 text-white text-sm xl:text-lg self-end" type="button" onClick={onCopyToClipboard}>Copy Url</button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
export default Task;
