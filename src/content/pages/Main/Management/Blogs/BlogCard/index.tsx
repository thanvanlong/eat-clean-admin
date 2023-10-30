import React from "react";
import "./index.scss"

interface BlogCardProps {
    color: string;
    title: string;
    image: string;
}

function BlogCard(props: BlogCardProps) {
    return (
        <div className={"blog-container w-full"}>
            <a href={"/blog/1"} className={'max-w-xl'}>
                <img className={'w-full'} src={"https://healthyeating.shop/wp-content/uploads/2023/05/thuc-don-eat-clean-cho-me-cho-con-bu-5-700x394.jpg"}/>
            </a>
            <h3>
                <a className={props.color}>
                    Thực Đơn Eat Clean Cho Mẹ Cho Con Bú Và Những Điều Mẹ Cần Biết
                </a>
            </h3>
            <div>
                <p className={props.color}>
                    Khi bạn là một người mẹ đang cho con bú, việc duy trì một chế độ ăn uống lành mạnh và cung cấp đủ dưỡng chất là rất quan trọng cho sức khỏe của bạn và cho cả sự phát triển của bé. Trong bài viết này, Healthy Eating sẽ tìm hiểu về chế độ
                </p>
            </div>
        </div>
    );
}

export default BlogCard;
