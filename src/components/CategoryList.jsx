import CategoryButton from "./CategoryButton";
import { CATEGORIES } from "../Data/CATEGORIES";

// TODO CHANGE LIST TO RECEIVE CATEGORIES FROM MAIN PAGE IN PROPS
const CategoryList = () => 
{
    const handleCategoryClick = (name) =>
    {
        console.log(`Category Clicked ${name}`);
    };
    return (
        <div className="flex flex-col justify-center max-w-full bg-transparent px-4 sm:px-6 lg:px-8">

            <h1 className="text-2xl font-bold text-center my-2 text-teal-400">Explore our Arsenal</h1>

            <div>
                <ul className="flex flex-row mb-3 gap-4 bg-gray-700 overflow-y-auto scrollbar-hide max-w-full">
                    {CATEGORIES.map((category) => (
                        <CategoryButton key={category.name} category={category.name} onClick={handleCategoryClick} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryList;