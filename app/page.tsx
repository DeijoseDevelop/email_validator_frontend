import HomeForm from '@/components/home/form';
import { Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack sx={{ marginTop: 10 }}>
        <Typography textAlign="center" variant="h2" color="#FFF">Email Validator</Typography>
        <HomeForm />
      </Stack>
    </Stack>
  )
}
