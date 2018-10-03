import routes from "../Routes";
import state from "../../State";
import CaruselPage from "./CaruselPage";
import CaruselItem from "./CaruselItem";
import iso from "isomorphic-fetch";

const getRoute = () => "/";
const accessToken = '2w5FJtRWeN8AAAAAAAAAISFCBucZsipeXqqCbAr7zlU8Fdd5atHrLejw-g8e25_V';

const getImages =() =>{
    return state.getCurrentState().carusel.images.map(image => CaruselItem(image))
};
const onEnterRoute = () =>{
    let Dropbox = require('dropbox').Dropbox;

    new Dropbox({ accessToken }).filesListFolder({path: ''}).then ( response => {
        console.log(response);
        response.entries.forEach ( entry => {
            new Dropbox({ accessToken }).filesGetTemporaryLink({path: entry.path_display})
                .then(response =>{
                    console.log(response);
                    state.store.dispatch({
                        type: "IMAGES", images: {
                            file: response.link,
                            legend : response.metadata.name
                        }
                    });
                }, console.error);
        });

    }, console.error);
};

const addRoutes = () => {
    routes.push({
        path: getRoute(),
        component : () => CaruselPage(getImages())
    });
};

export default {
    onEnterRoute,
    addRoutes
}