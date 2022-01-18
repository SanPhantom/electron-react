import * as React from 'react';
import { Alert, Box, Button, Divider, SnackbarContent, Stack, styled, TextField, Typography } from '@mui/material'
import UploadFile from '../../components/UploadFile';

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

  const handleUploadFile = (files: File[]) => {
    console.log(files[0].name);
    setUpFiles([...upFiles, ...files])
  }

  const handleDeleteFile = (file: File, index: number) => {
    setUpFiles(upFiles.filter((f, i) => i !== index));
  }

  return (
    <Stack alignItems={"center"} spacing={2}>
      <Typography>Excel to Json</Typography>
      <Divider sx={{width: '100%', borderColor: 'rgba(159,234,249,.12)'}} />
      <Stack sx={{width: '100%'}} spacing={2} alignItems={"center"}>
        <StyledTextField variant={'outlined'} label={"Project Name"} />
        <UploadFile upload={(files) => handleUploadFile(files)} files={upFiles} deleteFile={(file, index) => handleDeleteFile(file, index)} />
        <Button variant={"contained"}>to json</Button>
      </Stack>
    </Stack>
  );
};

export default AboutPage;
