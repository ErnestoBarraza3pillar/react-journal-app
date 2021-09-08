import React from 'react';
import { Provider } from "react-redux";
import { store } from './context/store/Store';

import { AppRouter } from './routers/AppRouter';

export const App = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
        
    )
}
