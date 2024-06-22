import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Topbar from 'layouts/main-layout/topbar';
import Footer from './Footer';

const MainLayout = ({ children }: PropsWithChildren) => {
  // Provide default values for the required props
  const isClosing = false;
  const mobileOpen = false;
  const setMobileOpen = () => {};

  return (
    <Stack width={1} minHeight={'100vh'}>
      <Stack
        component="main"
        direction="column"
        p={{ xs: 2, sm: 3, lg: 5 }}
        spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}
        width={1}
        flexGrow={1}
      >
        <Topbar isClosing={isClosing} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        {children}
        <Footer />
      </Stack>
    </Stack>
  );
};

export default MainLayout;
