import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({ FileInput, authService, cardRepository }) {
	useEffect(() => {
		console.log('실행');
	}, []);

	return (
		<div className={styles.app}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Login authService={authService} />
					</Route>
					<Route path="/maker">
						<Maker
							FileInput={FileInput}
							authService={authService}
							cardRepository={cardRepository}
						/>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
