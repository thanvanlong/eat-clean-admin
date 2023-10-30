import { Helmet } from 'react-helmet-async';
import React from "react";
import BlogCard from "./BlogCard";
import PageTitleWrapper from "../../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
function ApplicationBlog() {
    return (
        <>
            <Helmet>Manage - Blogs</Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <div className={"grid grid-cols-3 gap-3 bg-white w-full p-8 mt-5"}>
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
                <BlogCard color={""} title={""} image={""} />
            </div>
        </>
    )
}

export default ApplicationBlog