import { Box, Icon } from "@mui/material";
import { UploadRounded } from "@mui/icons-material";
import { useState } from "react";
import Typography from "@mui/material/Typography";


function ImageUploader() {
  const [files, setFiles] = useState<string[]>([])
  return (
    <Box
      sx={{
        borderStyle: 'dashed',
        borderRadius: 1,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        height: 200,
      }}>
      {
        (files.length < 1) ?
          <Icon>
            <UploadRounded/>
          </Icon>
          :
          <Typography variant='h5'>
            {files.length} images
          </Typography>
      }
      <input
        type='file'
        name='images'
        multiple
        onInput={(e) => {
          setFiles(Object.values(e.target.files))
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 0
        }}
      />
    </Box>
  );
}
export default ImageUploader;