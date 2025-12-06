Testing -

(1) If you want to quickly test adding a planet without UI, open the console and dispatch an action:
// In browser console (assumes Redux DevTools exposes store via __REDUX_DEVTOOLS_EXTENSION__ or you can add a small helper in your app temporarily)
dispatch({ type: 'planets/addPlanet', payload: 'NewPlanet' });
Then check localStorage.getItem('persist:planetravel') again to see the updated stored planets.

(2) build docker image with tag that ties to the user name in dockerhub
cd to the directory in which Dockerfile is there.
run the command
docker build -t explorer0000/planetravel1.0 .
(make sure docker desktop is running)

now run the command
docker run -p 8000:8000 explorer0000/planetravel1.0
which will run the abopve creted image as container - your website and apis are running inside container 

