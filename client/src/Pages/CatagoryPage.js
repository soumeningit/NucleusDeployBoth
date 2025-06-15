import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCategoryPageData } from '../service/Operation/categoryPageData'
import { apiConnector } from '../service/apiConnector';
import { categories } from '../service/apis';
import CourseSlider from '../Components/CourseCard/CourseSlider';

function CatagoryPage() {
    const [categoriesData, setCategoriesData] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    let { categoryName } = useParams();
    console.log("Category Name : ", categoryName);

    useEffect(() => {
        async function fetchCategoryId() {
            try {
                const categoriesResponse = await apiConnector("GET", categories.CATEGORIES_API)
                console.log("Result in category page : ", categoriesResponse);
                console.log("result.data.data : ", categoriesResponse?.data?.data);

                const categoryData = categoriesResponse?.data?.data;
                if (categoryData) {
                    const category = categoryData.find((data) =>
                        data.name.split(" ").join("-").toLowerCase() === categoryName
                    );
                    if (category) {
                        console.log("ID : ", category._id);
                        setCategoryId(category._id);
                    } else {
                        console.log("No matching category found");
                    }
                }
            } catch (error) {
                console.log("Links cannot be fetched from backend");
                console.log(error);
            }
        }

        fetchCategoryId();
    }, [categoryName]);

    useEffect(() => {
        async function getCategories() {
            if (!categoryId) {
                console.log("Invalid category ID");
                return;
            }
            try {
                const response = await getCategoryPageData(categoryId);
                console.log("Response in getCategories : ", response);
                setCategoriesData(response);
            } catch (error) {
                console.log("No matching course present.");
                console.log(error);
            }
        }
        getCategories();
    }, [categoryId]);

    console.log("categoriesData : ", categoriesData);

    return (

        <div className='mx-auto w-full h-screen bg-richblack-50'>
            {/* <div className=" mx-auto absolute border-2 border-[red] mb-8">
            <h1 className=" text-2xl font-bold mb-2">
                {categoriesData?.data?.name} Courses
            </h1>
            <p className="text-lg mb-1">Courses to get you started</p>
            <p className="text-lg">Explore courses from experienced, real-world experts.</p>
            </div> */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="ml-8 mb-8">
                    <h1 className=" text-2xl font-bold mb-2">
                        {categoriesData?.data?.selectedCategory?.name} Courses
                    </h1>
                    <p className="text-lg mb-1">Courses to get you started</p>
                    <p className="text-lg">Explore courses from experienced, real-world experts.</p>
                </div>
                <div className='mx-auto'>
                    <CourseSlider Courses={categoriesData?.data?.selectedCategory?.course} />
                </div>
            </div>

            {/* TODO : FUTURE SCOPE : BEST SELLING PRODUCT HIGHEST RATING PRODUT */}

        </div>
    )

}

export default CatagoryPage