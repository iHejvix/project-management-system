
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import {MagnifyingGlassIcon, MixerHorizontalIcon} from '@radix-ui/react-icons';
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {RadioGroup} from "@radix-ui/react-radio-group";
import {RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import ProjectCard from "@/pages/Project/ProjectCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProject, searchProjects, selectProjects} from "@/redux/projectSlice.js";
import {tags} from "@/config/tags.js";


const ProjectList = () => {
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch()
    const projectList = useSelector(selectProjects)
    const searchList = useSelector(state => state.project.searchProjects)
    const [category, setCategory] = useState();
    const [tag, setTag] = useState();
    
    useEffect(() => {
        dispatch(searchProjects(keyword))
    },[keyword, dispatch])

    useEffect(() => {
        if (category === "all") {
            dispatch(fetchProject({}));
        } else {
            dispatch(fetchProject({category}));
        }
    },[dispatch, category])

    useEffect(() => {
        if (tag === "all") {
            dispatch(fetchProject({}));
        } else {
            dispatch(fetchProject({ tag }));
        }
    },[dispatch, tag])

    const handleFilterCategoryChange = (category) => {
        setCategory(category)
    }

    const handleFilterTagChange = (tag) => {
        setTag(tag)
    }

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
    }

    if (!projectList) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
                <section className="filterSection">
                    <Card className="p-5 sticky top-10 w-[20rem]">
                        <div className="flex justify-between">
                            <p className="text-xl -tracking-wider">filters</p>
                            <Button variant="ghost" size="icon">
                                <MixerHorizontalIcon/>
                            </Button>
                        </div>
                        <CardContent className="mt-5">
                            <ScrollArea className="space-y-7 h-[70wh]">

                                <div>
                                    <h1 className="pb-3 text-gray-400 border-b">Category</h1>

                                    <div className="pt-5">
                                        <RadioGroup defaultValue="all" className="space-y-3 pt-5"
                                                    onValueChange={(category) => handleFilterCategoryChange(category)}>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="all" id="r1"></RadioGroupItem>
                                                <Label htmlFor="r1">All</Label>
                                            </div>
                                            <div className="flex items-center gap-2 pt-1">
                                                <RadioGroupItem value="fullstack" id="r2"></RadioGroupItem>
                                                <Label htmlFor="r2">fullstack</Label>
                                            </div>
                                            <div className="flex items-center gap-2 pt-1">
                                                <RadioGroupItem value="backend" id="3"></RadioGroupItem>
                                                <Label htmlFor="r3">backend</Label>
                                            </div>
                                            <div className="flex items-center gap-2 pt-1">
                                                <RadioGroupItem value="frontend" id="r4"></RadioGroupItem>
                                                <Label htmlFor="r4">frontend</Label>
                                            </div>

                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="pt-9">
                                    <h1 className="pb-3 text-gray-400 border-b">Tag</h1>

                                    <div className="pt-5">
                                        <RadioGroup defaultValue="all"
                                                    className="space-y-3 pt-5"
                                                    onValueChange={(tag) => handleFilterTagChange(tag)}>

                                            {tags.map((item) => (
                                                 <div key={item} className="flex items-center gap-2">
                                                    <RadioGroupItem value={item} id={`r1 - ${item}`}></RadioGroupItem> {/* 'might use $ and var ' */}
                                                    <Label htmlFor={`r1 - ${item}`}>{item}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>

                <section className="projectListSection w-full lg:w-[48rem]">
                    <div className="flex gap-5 items-center pb-5 justify-between">
                        <div className="relative p-0 w-full">
                            <Input className="40% px-9"
                                   placeholder="search project"
                                   onChange={handleSearchChange} />
                                   <MagnifyingGlassIcon className="absolute top-3 left-4"/>
                        </div>
                    </div>

                    <div className="space-y-5 min-h-[74wh]">
                        {
                           keyword ? searchList.map((item,index) => (
                                <ProjectCard key={"keywordIndex/" + index} projectDependencies={item}/>
                            )) :
                               projectList.map((item,index) => (
                                   <ProjectCard key={"listIndex/" + index} projectDependencies={item}/>
                               ))
                        }
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectList;
