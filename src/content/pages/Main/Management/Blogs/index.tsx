import { Helmet } from 'react-helmet-async';
import React, {useEffect} from "react";
import BlogCard from "./BlogCard";
import PageTitleWrapper from "../../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {RootState} from "../../../../../redux/store";
import {getBlogs} from "../../../../../redux/features/productSlice";
import {Empty} from "antd";
function ApplicationBlog() {
    const dispatch = useAppDispatch()
    const blogs = useAppSelector((root: RootState) => root.product.blogs);

    useEffect(() => {
        dispatch(getBlogs({page: 0, limit: 100}))
    }, []);

    return (
        <>
            <Helmet>Manage - Blogs</Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            {
                blogs && blogs.length != 0 ? <div className={"grid grid-cols-3 gap-3 bg-white w-full p-8 mt-5"}>
                    {
                        blogs.map(it => <BlogCard color={""} data={it} key={it.id} />)
                    }
                </div> : <div><Empty /></div>
            }

        </>
    )
}

export default ApplicationBlog