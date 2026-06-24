import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Subscription from "@/pages/Subscription/Subscription.jsx";
import App from "@/App.jsx";
import {Navbar} from "@/pages/Navbar/Navbar.jsx";
import {Auth} from "@/pages/Auth/Auth.jsx";
import ProjectList from "@/pages/ProjectList/ProjectList.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Subscription">
                <Subscription/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
            <ComponentPreview path="/Auth">
                <Auth/>
            </ComponentPreview>
            <ComponentPreview path="/ProjectList">
                <ProjectList/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews