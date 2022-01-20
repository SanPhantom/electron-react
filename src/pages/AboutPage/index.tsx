import * as React from 'react';
import { Alert, Box, Button, Divider, SnackbarContent, Stack, styled, TextField, Typography } from '@mui/material'
import UploadFile from '../../components/UploadFile';
import { excelTools } from '../../tools';

interface IAboutPageProps {
}

const StyledTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputLabel-root': {
    color: 'rgb(159,234,249)'
  },
  '& .MuiOutlinedInput-root:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(159,234,249,.54)',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(159,234,249,.54)',
    '&:hover': {
      borderColor: 'rgba(159,234,249,.54)',
    }
  }
})

const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {

  const [upFiles, setUpFiles] = React.useState<File[]>([])
  const [projectName, setProjectName] = React.useState<string>('')
  const [downloadFiles, setDownloadFiles] = React.useState<any[]>([])

  const handleUploadFile = (files: File[]) => {
    console.log(files[0].name);
    setUpFiles([...files])
  }

  const handleDeleteFile = (file: File, index: number) => {
    setUpFiles(upFiles.filter((f, i) => i !== index));
  }

  const toJson = () => {
    if (upFiles.length === 0) {
      return;
    }
    excelTools.excel2Json(upFiles[0], projectName).then((res: any[]) => {
      console.log(res);
      if (res.length) {
        setUpFiles([]);
        setDownloadFiles(res.map(src => {
          let a: any = {};
          a.src = src;
          a.fileName = src.split('/').pop();
          return a;
        }))
      }
    });

  }

  const downloadFile = (src: string, fileName: string, index: number) => {
    window.electron.downloadFile(src, fileName, (data: any) => {
      if (data.type === 'update') {
        console.log('downloading');
      } else if (data.type === 'done') {
        console.log('done')
      }
    });
  }

  return (
    <Stack alignItems={"center"} spacing={2}>
      <Typography>Excel to Json</Typography>
      <Divider sx={{ width: '100%', borderColor: 'rgba(159,234,249,.12)' }} />
      <Stack sx={{ width: '100%' }} spacing={2} alignItems={"center"}>
        <StyledTextField variant={'outlined'} label={"Project Name"} value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <UploadFile upload={(files) => handleUploadFile(files)} files={upFiles} deleteFile={(file, index) => handleDeleteFile(file, index)} />
        <Button variant={"contained"} onClick={() => toJson()}>to json</Button>


        <Stack spacing={1} sx={{ width: '100%' }} alignItems={"flex-end"}>
          {
            downloadFiles.length >= 2 ? (
              <Button variant={"text"} onClick={() => toJson()} sx={{textAlign: 'left'}}>download to zip</Button>
            ) : (<></>)
          }
          {
            downloadFiles.map((files, index) => (
              <SnackbarContent key={files.src} message={files.fileName} action={<Button color="info" size="small" onClick={(e) => { downloadFile(files.src, files.fileName, index) }}>
                Download
              </Button>} sx={{
                width: '100%',
                py: '1px',
                backgroundColor: 'transparent',
                color: '#ffffff'
              }} />
              // <Typography>{files.fileName} --- {files.src}</Typography>
            ))
          }
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AboutPage;
