'use client';

import { useCallback, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha } from '@mui/material/styles';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
//
import { useProductsQuery } from 'src/_api-hooks/products/useProductsQuery';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';
import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsSummary from '../product-details-summary';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ProductShopDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('description');

  const { data: productsResult, isLoading: productLoading } = useProductsQuery({ id: Number(id) });

  const product = productsResult?.data || null;

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  if (!product && !productLoading) return null

  if (Array.isArray(product)) {
    console.error('product is an array');
    return null;
  }

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderProduct = product && (
    <>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          {
            name: 'Shop',
            href: paths.product.root,
          },
          { name: product?.title },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            product={product}
            onGotoStep={() => { }}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description',
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}

      </Card>
    </>
  );

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      {productLoading && renderSkeleton}

      {product && renderProduct}
    </Container>
  );
}
