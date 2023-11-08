import React from "react";
import "./index.scss"
import {Link} from "react-router-dom";

interface BlogCardProps {
    color: string;
    title: string;
    image: string;
}

function BlogCard(props: any) {
    console.log(props)
    return (
        <div className={"blog-container w-full"}>
            <Link to={`/management/blog/${props?.data?.id}`} className={'max-w-xl'}>
                <img className={'w-full h-[200px]'} src={props?.data?.imgThumbnail}/>
            </Link>
            <h3>
                <a className={props.color}>
                    {props?.data?.title}
                </a>
            </h3>
            <div>
                <p className={props.color}>
                    {props?.data?.description}
                </p>
            </div>
        </div>
    );
}

export default BlogCard;
