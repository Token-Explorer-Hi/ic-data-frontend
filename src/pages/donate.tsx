import Qrcode from '@/components/qrcode';
import Typography from '@/components/Typography';
import MainCard from '@/components/ui-component/cards/MainCard';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';

const addresses = [
  {
    name: 'ICP',
    icon: 'https://api.icexplorer.io/images/ryjl3-tyaaa-aaaaa-aaaba-cai',
    address: 'c1a66a78ea3889fece98b3744648c32f4db1e7a3b9a7014e5f1208e6ed6e0545',
  },
  {
    name: 'ckBTC',
    icon: 'https://api.icexplorer.io/images/mxzaz-hqaaa-aaaar-qaada-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
  {
    name: 'ckUSDC',
    icon: 'https://api.icexplorer.io/images/cngnf-vqaaa-aaaar-qag4q-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
  {
    name: 'ICS',
    icon: 'https://api.icexplorer.io/images/ca6gz-lqaaa-aaaaq-aacwa-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
  {
    name: 'CHAT',
    icon: 'https://api.icexplorer.io/images/2ouva-viaaa-aaaaq-aaamq-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
  {
    name: 'GHOST',
    icon: 'https://api.icexplorer.io/images/4c4fd-caaaa-aaaaq-aaa3a-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
  {
    name: 'BOB',
    icon: 'https://api.icexplorer.io/images/7pail-xaaaa-aaaas-aabmq-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
  {
    name: 'BURN',
    icon: 'https://api.icexplorer.io/images/egjwt-lqaaa-aaaak-qi2aa-cai',
    address: 'tdc2n-4aplz-2z7fw-6cyfx-dfp7o-al7kn-uzoqh-pumic-ps466-dvwwx-mae',
  },
];
export default function Donate() {
  const [select, setSelect] = useState(0);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flex={1}
      sx={{
        padding: 'var(--space-48)',
      }}
    >
      <MainCard
        sx={{
          maxWidth: '588px',
          padding: {
            xs: 'var(--space-24)',
            sm: 'var(--space-38)',
          },
          margin: '0 auto',
          borderRadius: 'var(--space-32)',
        }}
      >
        <Grid
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap={{
            xs: 'var(--space-24)',
            sm: 'var(--space-32)',
          }}
          width="100%"
        >
          <Grid
            display="flex"
            flexWrap="wrap"
            gap="var(--space-10)"
            justifyContent="center"
          >
            {addresses.map((item, index) => (
              <Button
                variant="contained"
                key={`${item.address}_${index}`}
                aria-selected={select === index}
                disableRipple
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  background: 'white',
                  color: 'black',
                  border: 'var(--space-2) solid white',
                  "&:hover, &[aria-selected='true']": {
                    background: 'white',
                    borderColor: 'black',
                  },
                }}
                onClick={() => setSelect(index)}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: 'var(--space-16)',
                    height: 'var(--space-16)',
                    borderRadius: '1000px',
                  }}
                />
                {item.name}
              </Button>
            ))}
          </Grid>
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="var(--space-14)"
          >
            <Typography fontSize="var(--space-14)">
              Buy me a coffee ☕️
            </Typography>
            <Qrcode
              value={addresses[select].address}
              style={{
                width: 'var(--space-146)',
                height: 'var(--space-146)',
              }}
            />
            <Typography
              copyable
              fontSize="var(--space-14)"
              maxWidth="var(--space-320)"
              textAlign="center"
              copyText={addresses[select].address}
            >
              {addresses[select].address}
            </Typography>
            <Typography
              sx={{
                marginTop: { xs: 'var(--space-16)', sm: 'var(--space-24)' },
                fontSize: 'var(--space-14)',
              }}
            >
              Pump ${addresses[select].name} mooning – donations welcome! ❤️
            </Typography>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
}
