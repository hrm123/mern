Testing -

(1) If you want to quickly test adding a planet without UI, open the console and dispatch an action:
// In browser console (assumes Redux DevTools exposes store via __REDUX_DEVTOOLS_EXTENSION__ or you can add a small helper in your app temporarily)
dispatch({ type: 'planets/addPlanet', payload: 'NewPlanet' });
Then check localStorage.getItem('persist:planetravel') again to see the updated stored planets.
