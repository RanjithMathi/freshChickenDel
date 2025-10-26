import React from 'react';
import { CartProviderWithToast } from './src/context/CartProviderWithToast';
import { AddressProvider } from './src/context/AddressContext';
import { OrderProvider } from './src/context/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <CartProviderWithToast>
      <AddressProvider>
        <OrderProvider>
          <AppNavigator />
        </OrderProvider>
      </AddressProvider>
    </CartProviderWithToast>
  );
};

export default App;