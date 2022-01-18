import { Box, Button, SnackbarContent, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { uniqueId } from 'lodash-es'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface IUploadFileProps {
  upload: (files: File[]) => void,
  files: File[],
  deleteFile: (file: File, index: number) => void,
}

const UploadFile: React.FunctionComponent<IUploadFileProps> = ({
  upload,
  files = [],
  deleteFile
}) => {

  const uuid = uniqueId();

  const uploadFile = (e: any) => {
    console.log(e.target.files);
    upload(e.target.files)
  }

  return (
    <Stack sx={{width: '100%'}} spacing={2}>
      <Box border={1} borderRadius={1} borderColor={"rgba(159,234,249,.54)"} component="label" sx={{
        width: '100%',
        height: '120px',
        position: 'relative',
        cursor: 'pointer',
        padding: '10px'
      }} htmlFor={`update-file-${uuid}`}>
        <input type="file" id={`update-file-${uuid}`} multiple style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          visibility: 'hidden'
        }} onChange={(e) => { uploadFile(e) }} />
        <Stack sx={{
          width: '100%',
          height: '100%',
        }} justifyContent={"center"} alignItems={"center"}>
          <DriveFolderUploadIcon sx={{
            fontSize: 48,
          }} />
          <Typography>Click to upload files</Typography>
        </Stack>
      </Box>
      {
        files.length ? (
          <Stack spacing={1}>
            {
              files.map((file, index) => (
                <SnackbarContent key={file.lastModified} message={file.name} action={<Button color="error" size="small" onClick={(e) => { e.stopPropagation(); deleteFile(file, index) }}>
                  Delete Item
                </Button>} sx={{
                  py: '1px',
                  backgroundColor: '#74b1be',
                  color: '#ffffff'
                }} />
              ))
            }
          </Stack>
        ) : (
          <>

          </>
        )
      }
    </Stack>
  );
};

export default UploadFile;
