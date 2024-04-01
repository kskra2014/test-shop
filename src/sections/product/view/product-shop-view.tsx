'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
//
import { useProductsQuery } from 'src/_api-hooks/products/useProductsQuery';
import ProductList from '../product-list';

// ----------------------------------------------------------------------

export default function ProductShopView() {
  const settings = useSettingsContext();

  const { data: productsResult, isLoading: productsLoading } = useProductsQuery({});

  const products = productsResult?.data || [];
  if (!Array.isArray(products)) {
    console.error('products is not an array');
    return null;
  }

  console.log(products)

  const notFound = !products?.length
  const productsEmpty = !products?.length

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Shop
      </Typography>

      {(notFound || productsEmpty) && !productsLoading && renderNotFound}

      <ProductList products={products} loading={productsLoading} />
    </Container>
  );
}