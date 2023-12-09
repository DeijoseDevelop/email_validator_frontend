import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { b64toBlob } from '@/utils/utils';
import { saveAs } from 'file-saver';
import axios, { AxiosResponse } from 'axios';
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import PublishIcon from '@mui/icons-material/Publish';
import useLoader from '../loader/Loader';

const FileUpload: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const { LoaderComponent, openLoader, closeLoader } = useLoader();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrop = async () => {

    const formData: FormData = new FormData();
    formData.append("excel", files[0].file!);

    try {
        openLoader();
        const response = await axios.post(
          "/api/file",
          formData,
        )
        const { data } = await response.data;
        const blob: Blob = b64toBlob(data)
        saveAs(blob, "emails.zip");
    } catch (error) {
        throw error;
    } finally {
      closeLoader();
    }

    handleClose();
  };

  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
  };

  return (
    <>
      <LoaderComponent />
      <IconButton sx={{ color: "#FFF", mb: 1 }} onClick={handleOpen}>
        <PublishIcon sx={{ width: 40, height: 40 }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Arrastra el archivo aquí</DialogTitle>
        <DialogContent sx={{ width: { md: 400 } }}>
          <Dropzone accept=".xlsx, .xls" onChange={updateFiles} value={files}>
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} preview />
            ))}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDrop} color="primary">
            Enviar
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUpload;